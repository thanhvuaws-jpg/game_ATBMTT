// game.js — state machine chính, điều phối toàn bộ flow game

// ─── STATE ───────────────────────────────────────────────────────────────────
const State = {
  trustScore: 60,
  currentChapter: 0,
  playerName: 'Long',
  currentCaseLabel: '---',

  mpMode:      false,   // true khi đang ở chế độ nhiều người
  mpCaseOrder: [],      // thứ tự case từ Firebase (host randomize)

  ch1DialogueIndex: 0,
  ch1QuizIndex: 0,

  ch2Score: 0,
  ch2DragId: null,

  ch3CaseIndex: 0,
  ch3Score: 0,
  ch3Streak: 0,
  ch3Timer: 8,
  ch3TimerInterval: null,
  ch3AwaitingNext: false,

  ch4Round: 0,
  ch4Score: 0,
  ch4RoundAnswered: 0,

  ch5TimeLeft: 90,
  ch5TimerInterval: null,
  ch5Score: 0,
  ch5Pool: [],
  ch5PoolIndex: 0,
  ch5AwaitingNext: false,
  ch5CaseTimer: 10,
  ch5CaseInterval: null,
  ch5BossDefeated: false,
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

function setTrust(delta) {
  State.trustScore = clamp(State.trustScore + delta, 0, 100);
  updateTrustBar();
}

function updateTrustBar() {
  const bar = document.getElementById('trust-bar');
  const val = document.getElementById('trust-value');
  const pct = State.trustScore;
  bar.style.width = pct + '%';
  val.textContent = pct;
  if (pct >= 70)      bar.style.background = 'linear-gradient(90deg,#3FA796,#3FA796)';
  else if (pct >= 40) bar.style.background = 'linear-gradient(90deg,#E8A33D,#E8A33D)';
  else                bar.style.background = 'linear-gradient(90deg,#D64550,#D64550)';
}

function setCaseLabel(label) {
  State.currentCaseLabel = label;
  document.getElementById('header-case').textContent = label;
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  const isCh = ['screen-ch1', 'screen-ch2', 'screen-ch3', 'screen-ch4', 'screen-ch5'].includes(id);
  const btnExit = document.getElementById('btn-exit-mission');
  if (btnExit) {
    if (isCh && !State.mpMode) {
      btnExit.classList.remove('hidden');
    } else {
      btnExit.classList.add('hidden');
    }
  }
}

function showToast(text, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  const icon = type === 'correct' ? '✅' : type === 'wrong' ? '❌' : '🔔';
  t.innerHTML = `<span style="font-size:16px;">${icon}</span><span style="flex:1;">${text}</span>`;
  container.appendChild(t);
  setTimeout(() => t.remove(), 3100);
}

function showChapterComplete(title, subtitle, onNext, tpBonus = 20) {
  Skills.addTP(tpBonus, 'Hoàn thành chương');
  const overlay = document.createElement('div');
  overlay.className = 'chapter-complete';
  overlay.innerHTML = `
    <div class="chapter-complete-title">${title}</div>
    <div class="chapter-complete-sub">${subtitle}</div>
    <div style="display:flex;gap:12px;margin-top:10px;flex-wrap:wrap;justify-content:center;">
      <button class="btn-primary"   id="cc-continue" style="min-width:180px;">Tiếp tục</button>
      <button class="btn-secondary" id="cc-train"    style="min-width:160px;">Trung Tâm Đào Tạo</button>
    </div>
  `;
  overlay.querySelector('#cc-continue').addEventListener('click', () => {
    overlay.remove();
    onNext();
  });
  overlay.querySelector('#cc-train').addEventListener('click', () => {
    overlay.remove();
    Skills.openModal(() => onNext());
  });
  document.body.appendChild(overlay);
  Audio.chapterComplete();
}

function saveHistory() {
  const key = 'cyberShieldHistory';
  const history = JSON.parse(localStorage.getItem(key) || '[]');
  history.unshift({
    date: new Date().toLocaleString('vi-VN'),
    score: State.trustScore,
    grade: State.trustScore >= 80 ? 'XUẤT SẮC' : State.trustScore >= 50 ? 'HOÀN THÀNH' : 'CẢNH BÁO'
  });
  localStorage.setItem(key, JSON.stringify(history.slice(0, 5)));
}

function loadHistory() {
  return JSON.parse(localStorage.getItem('cyberShieldHistory') || '[]');
}

function writeSave(chapter) {
  localStorage.setItem('cyberShieldSave', JSON.stringify({ chapter, trust: State.trustScore }));
}

function clearSave() {
  localStorage.removeItem('cyberShieldSave');
}

function loadSave() {
  const s = localStorage.getItem('cyberShieldSave');
  return s ? JSON.parse(s) : null;
}

function initGuideTicker() {
  const tickerEl = document.getElementById('ticker-text');
  const container = document.getElementById('ticker-floating-chars');
  if (!tickerEl) return;

  const guides = [
    "[CHƯƠNG 1: TẬP HUẤN] Đọc đoạn đối thoại giữa chuyên viên SOC Mai và Long, sau đó trả lời câu hỏi trắc nghiệm về Luật An ninh mạng.",
    "[CHƯƠNG 2: PHÂN LOẠI] Chạm vào thẻ sự kiện, sau đó chạm vào vùng phân loại (Tấn công mạng / Tội phạm mạng) để di chuyển chúng.",
    "[CHƯƠNG 3: TRỰC SOC] Phân tích logs trực tiếp dưới áp lực thời gian. Quyết định CHẶN, CHO QUA hoặc BÁO CÁO trước khi hết khiên HP!",
    "[CHƯƠNG 4: THỦ TỤC] Sắp xếp các bước phản ứng sự cố theo đúng trình tự pháp luật quy định.",
    "[CHƯƠNG 5: KHẮC PHỤC] Chiến đấu với Boss Ghost_VN! Chọn đúng tổ hợp combo hành động nghiệp vụ để vô hiệu hóa mã độc."
  ];

  let currentIdx = 0;
  let typeInterval = null;

  function typeText(text) {
    if (State.tickerIntervals && State.tickerIntervals.typeInterval) {
      clearInterval(State.tickerIntervals.typeInterval);
    }
    tickerEl.textContent = '';
    let i = 0;
    typeInterval = setInterval(() => {
      if (i < text.length) {
        tickerEl.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 25);
    if (!State.tickerIntervals) State.tickerIntervals = {};
    State.tickerIntervals.typeInterval = typeInterval;
  }

  function spawnChar() {
    if (!container) return;
    const char = ['0', '1', 'SOC', 'ANM', 'LAW', 'SHIELD', 'x', 'a', 'y'][Math.floor(Math.random() * 9)];
    const el = document.createElement('span');
    el.className = 'floating-char';
    el.textContent = char;
    el.style.left = Math.random() * 90 + '%';
    el.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
    container.appendChild(el);
    setTimeout(() => el.remove(), 2500);
  }

  // Clear existing intervals if any
  if (State.tickerIntervals) {
    clearInterval(State.tickerIntervals.cycleInterval);
    clearInterval(State.tickerIntervals.charInterval);
    clearInterval(State.tickerIntervals.typeInterval);
  }

  // Start typewriter
  typeText(guides[currentIdx]);
  
  // Cycle texts every 7.5 seconds
  const cycleInterval = setInterval(() => {
    currentIdx = (currentIdx + 1) % guides.length;
    typeText(guides[currentIdx]);
  }, 7500);

  // Spawn drifting characters every 350ms
  const charInterval = setInterval(() => {
    if (document.getElementById('screen-menu')?.classList.contains('active')) {
      spawnChar();
    }
  }, 350);

  State.tickerIntervals = { cycleInterval, charInterval, typeInterval };
}

// ─── MENU ────────────────────────────────────────────────────────────────────
function initMenu() {
  Combat.hide();
  hideMPScoreboard();
  State.mpMode = false;
  State.currentChapter = 0;
  showScreen('screen-menu');
  initGuideTicker();
  setCaseLabel('---');

  // Cập nhật tên nhân vật trong header và subtitle
  const charName = Auth.getCharacterName();
  const headerName = document.getElementById('header-charname');
  if (headerName) headerName.textContent = charName;
  const subEl = document.querySelector('.menu-subtitle');
  if (subEl) subEl.innerHTML = subEl.innerHTML.replace(/\bLong\b/g, charName);

  // User info bar
  const userBar  = document.getElementById('menu-user-bar');
  const userNameEl = document.getElementById('menu-user-name');
  if (Auth.isLoggedIn()) {
    userBar?.classList.remove('hidden');
    if (userNameEl) userNameEl.textContent = '👤 ' + charName;
    document.getElementById('btn-logout')?.addEventListener('click', async () => {
      Audio.click();
      await Auth.logout();
      initAuthScreen();
    });
  } else {
    userBar?.classList.add('hidden');
  }

  // Load leaderboard
  loadAndRenderLeaderboard('trust');
  document.querySelectorAll('.lb-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.lb-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      loadAndRenderLeaderboard(tab.dataset.type);
    });
  });

  const historyData = loadHistory();
  const historyList = document.getElementById('history-list');
  if (historyList) {
    historyList.innerHTML = '';
    if (historyData.length === 0) {
      historyList.innerHTML = '<div class="history-empty">Chưa có lịch sử nhiệm vụ</div>';
    } else {
      historyData.forEach(h => {
        const cls = h.score >= 80 ? 'excellent' : h.score >= 50 ? 'good' : 'failed';
        historyList.innerHTML += `<div class="history-item">
          <span class="history-date">${h.date}</span>
          <span class="history-score ${cls}">${h.score}/100 — ${h.grade}</span>
        </div>`;
      });
    }
  }

  const btnStart    = document.getElementById('btn-start');
  const btnContinue = document.getElementById('btn-continue');
  const save = loadSave();

  if (btnContinue) {
    if (save) {
      btnContinue.classList.remove('hidden');
      btnContinue.onclick = () => {
        State.trustScore = save.trust;
        updateTrustBar();
        gotoChapter(save.chapter);
      };
    } else {
      btnContinue.classList.add('hidden');
    }
  }

  if (btnStart) {
    btnStart.onclick = () => {
      State.trustScore = 60;
      updateTrustBar();
      clearSave();
      gotoChapter(1);
    };
  }

  const btnMP = document.getElementById('btn-multiplayer');
  if (btnMP) {
    const mpReady = MP.isReady();
    btnMP.disabled = !mpReady;
    if (!mpReady) {
      btnMP.title = 'Cần cấu hình Firebase — xem file js/firebase-config.js';
      btnMP.style.opacity = '0.45';
    }
    btnMP.onclick = () => { Audio.click(); gotoChapter('lobby'); };
  }
}

// ─── CHAPTER ROUTER ──────────────────────────────────────────────────────────
function gotoChapter(n) {
  State.currentChapter = n;
  if (!State.mpMode) writeSave(n);
  switch(n) {
    case 1:       initChapter1();   break;
    case 2:       initChapter2();   break;
    case 3:       initChapter3();   break;
    case 4:       initChapter4();   break;
    case 5:       initChapter5();   break;
    case 6:       initEnding();     break;
    case 'lobby': initLobby();      break;
    case 'rwait': initRoomWait();   break;
    case 'mpres': initMPResults();  break;
  }
}

// ─── CHƯƠNG 1: TUTORIAL ──────────────────────────────────────────────────────
function initChapter1() {
  Combat.hide();
  showScreen('screen-ch1');
  setCaseLabel('#INTRO');
  State.ch1DialogueIndex = 0;
  State.ch1QuizIndex = 0;

  const charName = Auth.getCharacterName();
  const avatarLongName = document.querySelector('#avatar-long .avatar-name');
  if (avatarLongName) {
    avatarLongName.innerHTML = `${charName}<br><span style="font-size:10px;">Chuyên viên mới</span>`;
  }
  const avatarLongIcon = document.querySelector('#avatar-long .avatar-icon');
  if (avatarLongIcon) {
    avatarLongIcon.textContent = charName.charAt(0).toUpperCase();
  }

  document.getElementById('ch1-dialogue').classList.remove('hidden');
  document.getElementById('ch1-quiz').classList.add('hidden');
  renderDialogue();
}

function renderDialogue() {
  const data = GAME_DATA.chapter1.dialogues;
  const d = data[State.ch1DialogueIndex];
  document.getElementById('avatar-mai').classList.toggle('active',  d.speaker === 'mai');
  document.getElementById('avatar-long').classList.toggle('active', d.speaker === 'long');
  const charName = Auth.getCharacterName();
  const speakerName = d.speaker === 'long' ? charName : d.name;
  document.getElementById('dialogue-speaker').textContent = speakerName + (d.subtitle ? ` — ${d.subtitle}` : '');
  document.getElementById('dialogue-text').textContent    = d.text.replace(/\bLong\b/g, charName);
  document.getElementById('dialogue-progress').textContent = `${State.ch1DialogueIndex + 1} / ${data.length}`;

  document.getElementById('dialogue-next').onclick = () => {
    Audio.click();
    State.ch1DialogueIndex++;
    if (State.ch1DialogueIndex >= data.length) {
      document.getElementById('ch1-dialogue').classList.add('hidden');
      document.getElementById('ch1-quiz').classList.remove('hidden');
      renderCh1Quiz();
    } else {
      renderDialogue();
    }
  };
}

function renderCh1Quiz() {
  const data = GAME_DATA.chapter1.quiz;
  if (State.ch1QuizIndex >= data.length) {
    showChapterComplete('Chương 1 Hoàn Thành', 'Bàn làm việc SOC đã sẵn sàng.', () => {
      if (Skills.isFirstOpen) {
        Skills.openModal(() => gotoChapter(2));
      } else {
        gotoChapter(2);
      }
    });
    return;
  }
  const q = data[State.ch1QuizIndex];
  const container = document.getElementById('ch1-quiz');
  container.innerHTML = `
    <div class="quiz-card">
      <div class="quiz-question">${q.question}</div>
      <div class="quiz-options">
        ${q.options.map((opt, i) => `<button class="quiz-opt" data-idx="${i}">${opt}</button>`).join('')}
      </div>
      <div class="quiz-explanation" id="q-explanation">${q.explanation}</div>
      <div style="margin-top:16px;display:flex;justify-content:space-between;align-items:center;">
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--text-muted);">Câu ${State.ch1QuizIndex + 1} / ${data.length}</span>
        <button class="btn-next hidden" id="q-next">Câu tiếp theo</button>
      </div>
    </div>`;

  container.querySelectorAll('.quiz-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx     = parseInt(btn.dataset.idx);
      const correct = idx === q.correct;
      container.querySelectorAll('.quiz-opt').forEach(b => b.disabled = true);
      btn.classList.add(correct ? 'correct' : 'wrong');
      if (!correct) container.querySelectorAll('.quiz-opt')[q.correct].classList.add('correct');
      container.querySelector('#q-explanation').classList.add('show');
      container.querySelector('#q-next').classList.remove('hidden');
      if (correct) Audio.correct(); else Audio.wrong();
    });
  });
  container.querySelector('#q-next')?.addEventListener('click', () => {
    Audio.click();
    State.ch1QuizIndex++;
    renderCh1Quiz();
  });
}

// ─── CHƯƠNG 2: KÉO-THẢ ───────────────────────────────────────────────────────
function initChapter2() {
  Combat.hide();
  showScreen('screen-ch2');
  setCaseLabel('#CH2');
  State.ch2Score = 0;
  State.ch2DragId = null;
  if (State.mpMode) {
    MP.updateMyState({
      currentChapter: 2,
      score: getMPTotalScore(),
      trustScore: State.trustScore,
      caseIndex: 0,
      hp: 100
    });
  }
  renderCh2Board();
}

function renderCh2Board() {
  const board = document.getElementById('ch2-board');
  const cards  = GAME_DATA.chapter2.cards;
  board.innerHTML = `
    <div class="drop-zone zone-attack" id="zone-attack" data-zone="attack">
      <div class="drop-zone-title">TẤN CÔNG MẠNG</div>
      <div style="font-size:12px;color:var(--text-muted);text-align:center;line-height:1.6;">
        Dùng công nghệ để xâm nhập, kiểm soát hoặc làm gián đoạn hệ thống thông tin
      </div>
    </div>
    <div id="ch2-pool">
      ${cards.map(c => `
        <div class="drag-card" id="dc-${c.id}" draggable="true" data-id="${c.id}">
          <div class="drag-card-title">${c.title}</div>
          <div class="drag-card-desc">${c.description}</div>
        </div>`).join('')}
    </div>
    <div class="drop-zone zone-crime" id="zone-crime" data-zone="crime">
      <div class="drop-zone-title">TỘI PHẠM MẠNG</div>
      <div style="font-size:12px;color:var(--text-muted);text-align:center;line-height:1.6;">
        Hành vi nguy hiểm cho xã hội được quy định trong Bộ luật Hình sự thực hiện qua mạng
      </div>
    </div>
    <div id="ch2-score-bar" style="grid-column:1/-1;">
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="color:var(--text-muted);">Điểm:</span>
        <span id="ch2-score-display" style="font-weight:700;color:var(--accent);">${State.ch2Score}</span>
      </div>
      <div style="display:flex;gap:8px;align-items:center;">
        <div class="drop-zone zone-both" id="zone-both" data-zone="both"
             style="min-height:unset;flex-direction:row;flex-wrap:wrap;padding:8px 12px;gap:8px;align-items:center;">
          <span class="drop-zone-title" style="margin:0;">CẢ HAI</span>
          <span style="font-size:11px;color:var(--text-muted);">Vừa là tấn công, vừa là tội phạm</span>
        </div>
      </div>
    </div>`;
  setupDragDrop();
}

function placeCh2Card(cardEl, zone) {
  const cardData = GAME_DATA.chapter2.cards.find(c => c.id === State.ch2DragId);
  if (!cardData) return;

  const zoneId  = zone.dataset.zone;
  const correct = cardData.correct === zoneId;
  cardEl.dataset.placed = '1';
  cardEl.classList.add(correct ? 'placed-correct' : 'placed-wrong');
  
  // Clear classes
  cardEl.classList.remove('selected');
  document.querySelectorAll('.drag-card').forEach(c => c.classList.remove('selected'));
  document.querySelectorAll('.drop-zone').forEach(z => z.classList.remove('can-drop'));
  
  zone.appendChild(cardEl);
  cardEl.draggable = false;

  if (correct) {
    State.ch2Score += 10;
    Audio.correct();
    showToast(`Đúng! ${cardData.explanation}`, 'correct');
  } else {
    State.ch2Score = Math.max(0, State.ch2Score - 5);
    Audio.wrong();
    showToast(`Sai. ${cardData.explanation}`, 'wrong');
  }
  document.getElementById('ch2-score-display').textContent = State.ch2Score;
  setTrust(correct ? 2 : -1);

  const placedCount = document.querySelectorAll('[data-placed]').length;
  if (State.mpMode) {
    MP.updateMyState({
      currentChapter: 2,
      score: getMPTotalScore(),
      trustScore: State.trustScore,
      caseIndex: placedCount,
      hp: 100
    });
  }

  if (placedCount === GAME_DATA.chapter2.cards.length) {
    if (State.mpMode) {
      setTimeout(() => nextMPChapter(), 1500);
    } else {
      setTimeout(() => finishChapter2(), 800);
    }
  }
  State.ch2DragId = null;
}

function setupDragDrop() {
  document.querySelectorAll('.drag-card').forEach(card => {
    // Native drag start
    card.addEventListener('dragstart', e => {
      State.ch2DragId = card.dataset.id;
      card.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    card.addEventListener('dragend', () => card.classList.remove('dragging'));

    // Tap-to-select for mobile & ease of use
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      if (card.dataset.placed === '1') return;
      
      const isSelected = card.classList.contains('selected');
      document.querySelectorAll('.drag-card').forEach(c => c.classList.remove('selected'));
      document.querySelectorAll('.drop-zone').forEach(z => z.classList.remove('can-drop'));
      
      if (!isSelected) {
        card.classList.add('selected');
        State.ch2DragId = card.dataset.id;
        document.querySelectorAll('.drop-zone').forEach(z => z.add ? z.classList.add('can-drop') : z.classList.add('can-drop'));
      } else {
        State.ch2DragId = null;
      }
    });
  });

  document.querySelectorAll('.drop-zone').forEach(zone => {
    zone.addEventListener('dragover',  e => { e.preventDefault(); zone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    
    // Tap to drop
    zone.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!State.ch2DragId) return;
      const cardEl = document.getElementById(`dc-${State.ch2DragId}`);
      if (!cardEl || cardEl.dataset.placed === '1') return;
      placeCh2Card(cardEl, zone);
    });

    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      if (!State.ch2DragId) return;
      const cardEl = document.getElementById(`dc-${State.ch2DragId}`);
      if (!cardEl || cardEl.dataset.placed === '1') return;
      placeCh2Card(cardEl, zone);
    });
  });

  // Click outside to cancel selection
  document.addEventListener('click', () => {
    document.querySelectorAll('.drag-card').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('.drop-zone').forEach(z => z.classList.remove('can-drop'));
    State.ch2DragId = null;
  });
}

function finishChapter2() {
  if (State.ch2Score >= 50) {
    showChapterComplete('Chương 2 Hoàn Thành', `Điểm phân loại: ${State.ch2Score}/80 — Mở khóa Vùng cấm.`, () => gotoChapter(3));
  } else {
    showToast(`Điểm chưa đủ (${State.ch2Score}/50). Thử lại!`, 'wrong');
    setTimeout(() => initChapter2(), 1500);
  }
}

// ─── CHƯƠNG 3: CASE TICKETS + COMBAT (playerHP only) ─────────────────────────
function initChapter3() {
  showScreen('screen-ch3');
  setCaseLabel('#VÙNG-CẤM');
  State.ch3CaseIndex  = 0;
  State.ch3Score      = 0;
  State.ch3Streak     = 0;
  State.ch3AwaitingNext = false;
  clearInterval(State.ch3TimerInterval);

  // Combat: chỉ thanh máu player, không có boss
  Combat.init(false);
  renderCh3Stats();
  renderCh3Case();
}

function renderCh3Stats() {
  const el = document.getElementById('ch3-stats');
  if (!el) return;
  el.innerHTML = `
    <div class="ch3-stat">
      <span class="ch3-stat-label">Điểm</span>
      <span class="ch3-stat-value" id="ch3-score-val">${State.ch3Score}</span>
    </div>
    <div class="ch3-stat">
      <span class="ch3-stat-label">Chuỗi đúng</span>
      <span class="ch3-stat-value streak" id="ch3-streak-val">${State.ch3Streak}x</span>
    </div>
    <div class="ch3-stat">
      <span class="ch3-stat-label">Case</span>
      <span class="ch3-stat-value">${State.ch3CaseIndex + 1} / ${GAME_DATA.chapter3.cases.length}</span>
    </div>`;
}

function renderCh3Case() {
  if (State.ch3CaseIndex >= GAME_DATA.chapter3.cases.length) {
    finishChapter3(); return;
  }
  const caseIdx = State.mpMode
    ? (State.mpCaseOrder[State.ch3CaseIndex] ?? State.ch3CaseIndex)
    : State.ch3CaseIndex;
  const c = GAME_DATA.chapter3.cases[caseIdx];
  setCaseLabel(c.caseNumber);
  State.ch3AwaitingNext = false;
  clearInterval(State.ch3TimerInterval);
  const ch3TotalTime = 8 + Skills.getTimerBonus();
  State.ch3Timer = ch3TotalTime;

  const arena = document.getElementById('ch3-arena');
  const diffLabel = { easy: 'DỄ', medium: 'VỪA', hard: 'KHÓ' }[c.difficulty || 'medium'];
  const diffColor = { easy: 'var(--safe)', medium: 'var(--accent)', hard: 'var(--danger)' }[c.difficulty || 'medium'];

  arena.innerHTML = `
    <div id="ch3-stats"></div>
    <div class="case-ticket" id="current-ticket">
      <div class="ticket-header">
        <div class="ticket-meta">
          <div class="ticket-number">${c.caseNumber}</div>
          <div class="ticket-source">${c.source}</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center;">
          <span style="font-family:var(--font-mono);font-size:10px;font-weight:700;color:${diffColor};
                       background:${diffColor}18;padding:2px 8px;border-radius:3px;border:1px solid ${diffColor}40;">
            ${diffLabel}
          </span>
          <div class="ticket-severity sev-${c.severity}">${c.severity}</div>
        </div>
      </div>
      <div class="ticket-body">
        <div class="ticket-title">${c.title}</div>
        <div class="ticket-desc">${Skills.applyKeywordHighlight(c.description)}</div>
      </div>
      <div class="ticket-footer">
        <div class="ticket-actions" style="display: flex; flex-direction: column; gap: 10px; width: 100%;">
          <div style="display: flex; gap: 12px; align-items: center; width: 100%;">
            <button class="action-btn btn-block"  id="act-block"  data-act="block">CHẶN</button>
            <button class="action-btn btn-report" id="act-report" data-act="report">BÁO CÁO</button>
            <button class="action-btn btn-allow"  id="act-allow"  data-act="allow">CHO QUA</button>
            <div class="timer-wrap">
              <svg class="timer-svg" viewBox="0 0 38 38">
                <circle class="timer-bg"   cx="19" cy="19" r="18"/>
                <circle class="timer-ring" id="timer-ring" cx="19" cy="19" r="18"/>
                <text class="timer-label" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
                      font-family="var(--font-mono)" font-size="11" fill="var(--text)"
                      id="timer-num" transform="rotate(90,19,19)">${ch3TotalTime}</text>
              </svg>
            </div>
          </div>
          <button class="btn-confirm" id="act-confirm" disabled>XÁC NHẬN PHÁN QUYẾT</button>
        </div>
      </div>
      <div class="stamp-overlay" id="stamp-overlay"></div>
    </div>
    <div class="result-popup" id="ch3-result">
      <div class="result-verdict" id="result-verdict"></div>
      <div class="result-law"     id="result-law"></div>
      <div class="result-text"    id="result-text"></div>
      <button class="btn-next" style="margin-top:12px;" id="ch3-next">Case tiếp theo</button>
    </div>`;

  renderCh3Stats();
  Skills.applyElimination(c);

  const selectedActions = [];
  const btnBlock = document.getElementById('act-block');
  const btnReport = document.getElementById('act-report');
  const btnAllow = document.getElementById('act-allow');
  const btnConfirm = document.getElementById('act-confirm');

  function updateConfirmState() {
    if (btnConfirm) btnConfirm.disabled = (selectedActions.length === 0);
  }

  [btnBlock, btnReport, btnAllow].forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (State.ch3AwaitingNext) return;
      Audio.click();
      const act = btn.dataset.act;
      if (act === 'allow') {
        if (btn.classList.contains('selected')) {
          btn.classList.remove('selected');
          const idx = selectedActions.indexOf(act);
          if (idx > -1) selectedActions.splice(idx, 1);
        } else {
          btn.classList.add('selected');
          selectedActions.push(act);
          if (btnBlock) { btnBlock.classList.remove('selected'); const i = selectedActions.indexOf('block'); if (i > -1) selectedActions.splice(i, 1); }
          if (btnReport) { btnReport.classList.remove('selected'); const i = selectedActions.indexOf('report'); if (i > -1) selectedActions.splice(i, 1); }
        }
      } else {
        if (btn.classList.contains('selected')) {
          btn.classList.remove('selected');
          const idx = selectedActions.indexOf(act);
          if (idx > -1) selectedActions.splice(idx, 1);
        } else {
          btn.classList.add('selected');
          selectedActions.push(act);
          if (btnAllow) { btnAllow.classList.remove('selected'); const i = selectedActions.indexOf('allow'); if (i > -1) selectedActions.splice(i, 1); }
        }
      }
      updateConfirmState();
    });
  });

  btnConfirm?.addEventListener('click', () => {
    if (State.ch3AwaitingNext || selectedActions.length === 0) return;
    Audio.click();
    handleCh3Action(selectedActions, c);
  });

  document.getElementById('ch3-next')?.addEventListener('click', () => {
    Audio.click();
    State.ch3CaseIndex++;
    renderCh3Case();
  });

  startCh3Timer(c);
}

function startCh3Timer(caseData, timeLeft) {
  const circumference = 2 * Math.PI * 18;
  const total = 8 + Skills.getTimerBonus();
  State.ch3Timer = (timeLeft !== undefined) ? timeLeft : total;
  State.ch3TimerInterval = setInterval(() => {
    State.ch3Timer--;
    const num  = document.getElementById('timer-num');
    const ring = document.getElementById('timer-ring');
    if (num)  num.textContent = State.ch3Timer;
    if (ring) {
      ring.style.strokeDashoffset = circumference * (1 - State.ch3Timer / total);
      if (State.ch3Timer <= 3) { ring.classList.add('urgent'); Audio.urgent(); }
      else Audio.tick();
    }
    if (State.ch3Timer <= 0) {
      clearInterval(State.ch3TimerInterval);
      if (!State.ch3AwaitingNext) handleCh3Action('timeout', caseData);
    }
  }, 1000);
}

function handleCh3Action(action, caseData) {
  clearInterval(State.ch3TimerInterval);
  State.ch3AwaitingNext = true;
  document.querySelectorAll('.action-btn').forEach(b => b.disabled = true);
  const btnConfirm = document.getElementById('act-confirm');
  if (btnConfirm) btnConfirm.disabled = true;

  const isTimeout = action === 'timeout';
  const selected = isTimeout ? [] : action;
  const correct = caseData.correct;
  
  const isCorrect = !isTimeout && 
                    selected.length === correct.length && 
                    selected.every(val => correct.includes(val));

  // ── Stamp ──
  const overlay = document.getElementById('stamp-overlay');
  const ticket  = document.getElementById('current-ticket');
  
  let stampText = 'HẾT GIỜ';
  let stampClass = 'stamp-wrong';
  if (!isTimeout) {
    if (selected.includes('block') && selected.includes('report')) {
      stampText = 'CHẶN + BÁO CÁO';
      stampClass = 'stamp-both';
    } else if (selected.includes('block')) {
      stampText = 'CHẶN';
      stampClass = 'stamp-block';
    } else if (selected.includes('report')) {
      stampText = 'BÁO CÁO';
      stampClass = 'stamp-report';
    } else if (selected.includes('allow')) {
      stampText = 'CHO QUA';
      stampClass = 'stamp-allow';
    }
  }

  if (overlay) {
    overlay.innerHTML = `<div class="stamp ${stampClass}">${stampText}</div>`;
    setTimeout(() => overlay.querySelector('.stamp')?.classList.add('show'), 50);
    Audio.stamp();
  }

  // ── Score + Trust ──
  if (isCorrect) {
    State.ch3Score += 15;
    State.ch3Streak++;
    setTrust(3);
    Audio.correct();
    Skills.addTP(5);
    if (caseData.id === 'c3_5' || caseData.id === 'c3_10' || caseData.id === 'c3_13') {
      setTimeout(() => Skills.addTP(10, 'Case bẫy'), 300);
    }
    const recHP = Skills.getRecoveryHP();
    if (recHP > 0 && State.ch3Streak % 2 === 0) {
      const maxHP = Skills.getMaxHP();
      Combat.playerHP = Math.min(maxHP, Combat.playerHP + recHP);
      Combat.updatePlayerBar();
      Skills.showSkillTrigger('Phục Hồi Nhanh +' + recHP + ' HP');
    }
  } else {
    State.ch3Score  = Math.max(0, State.ch3Score - 10);
    State.ch3Streak = 0;
    setTrust(-5);
    Audio.wrong();
  }

  // ── Sync MP state ──
  if (State.mpMode) {
    MP.updateMyState({
      currentChapter: 3,
      score:      getMPTotalScore(),
      trustScore: State.trustScore,
      caseIndex:  State.ch3CaseIndex,
      streak:     State.ch3Streak,
      hp:         Combat.playerHP
    });
  }

  // ── Combat ──
  let playerDefeated = false;
  if (isCorrect) {
    Combat.onCorrect(caseData);
  } else {
    const res = Combat.onWrong();
    playerDefeated = res.playerDefeated;
  }

  // ── Slide out ticket ──
  setTimeout(() => {
    if (ticket) ticket.classList.add(isCorrect ? 'slide-out-correct' : 'slide-out-wrong');
  }, 500);

  // ── Result popup ──
  setTimeout(() => {
    const popup   = document.getElementById('ch3-result');
    const verdict = document.getElementById('result-verdict');
    const law     = document.getElementById('result-law');
    const text    = document.getElementById('result-text');
    if (popup) {
      popup.classList.add('show', isCorrect ? 'result-correct' : 'result-wrong');
      if (verdict) {
        verdict.textContent = isCorrect ? 'PHÁN QUYẾT ĐÚNG' : (isTimeout ? 'HẾT GIỜ — SAI' : 'PHÁN QUYẾT SAI');
        verdict.className   = `result-verdict ${isCorrect ? 'verdict-correct' : 'verdict-wrong'}`;
      }
      if (law)  law.textContent  = caseData.lawRef;
      if (text) text.textContent = caseData.explanation;
    }
    const scoreEl  = document.getElementById('ch3-score-val');
    const streakEl = document.getElementById('ch3-streak-val');
    if (scoreEl)  scoreEl.textContent  = State.ch3Score;
    if (streakEl) streakEl.textContent = State.ch3Streak + 'x';

    if (playerDefeated) {
      setTimeout(() => handleCh3PlayerDefeated(), 800);
    }
  }, 700);
}

// Ch3: player HP = 0 → tạm ngừng, hồi 50 HP, làm lại case
function handleCh3PlayerDefeated() {
  const charName = Auth.getCharacterName();
  // Trong MP mode: loại trực tiếp và chuyển tới màn hình kết quả chờ người khác
  if (State.mpMode) {
    showToast('Hệ thống quá tải — Bạn đã bị loại!', 'wrong');
    clearAllGameplayTimers();
    const finalRaceScore = getMPTotalScore();
    MP.finishMyGame(finalRaceScore, 0); // Điểm tín nhiệm về 0
    Auth.saveScore('race', finalRaceScore);
    hideMPScoreboard();
    gotoChapter('mpres');
    return;
  }
  const overlay = document.createElement('div');
  overlay.className = 'chapter-complete';
  overlay.style.background = 'rgba(14,20,36,0.97)';
  overlay.innerHTML = `
    <div class="chapter-complete-title" style="color:var(--danger);">Hệ thống quá tải!</div>
    <div class="chapter-complete-sub">${charName} cần xem lại case này.<br>Hệ thống tự phục hồi — tiếp tục từ case vừa sai.</div>
    <button class="btn-primary" style="margin-top:12px;min-width:220px;">Làm lại case này</button>
  `;
  overlay.querySelector('button').addEventListener('click', () => {
    overlay.remove();
    Combat.playerHP = 50;
    Combat.updatePlayerBar();
    renderCh3Case(); // State.ch3CaseIndex không đổi → làm lại đúng case đó
  });
  document.body.appendChild(overlay);
}

function finishChapter3() {
  Combat.hide();
  if (State.mpMode) {
    nextMPChapter();
    return;
  }
  showChapterComplete(
    'Chương 3 Hoàn Thành',
    `Điểm "Vùng cấm": ${State.ch3Score} — Chuyển sang quản lý đội phản ứng.`,
    () => gotoChapter(4)
  );
}

// ─── CHƯƠNG 4: TURN-BASED (không có combat) ──────────────────────────────────
function initChapter4() {
  Combat.hide();
  showScreen('screen-ch4');
  setCaseLabel('#ROUND-1');
  State.ch4Round = 0;
  State.ch4Score = 0;
  if (State.mpMode) {
    MP.updateMyState({
      currentChapter: 4,
      score: getMPTotalScore(),
      trustScore: State.trustScore,
      caseIndex: State.ch4Round,
      hp: 100
    });
  }
  renderCh4Round();
}

function renderCh4Round() {
  const rounds = GAME_DATA.chapter4.rounds;
  if (State.ch4Round >= rounds.length) { finishChapter4(); return; }

  const round = rounds[State.ch4Round];
  setCaseLabel(`#ROUND-${State.ch4Round + 1}`);
  const board = document.getElementById('ch4-board');
  const staff  = GAME_DATA.chapter4.staff;

  board.innerHTML = `
    <div class="ch4-staff-bar">
      ${staff.map(s => `
        <div class="staff-card" id="staff-${s.id}">
          <div class="staff-avatar">${s.avatar}</div>
          <div class="staff-info">
            <div class="staff-name">${s.name}</div>
            <div class="staff-role">${s.role}</div>
          </div>
          <span class="staff-status status-free">Sẵn sàng</span>
        </div>`).join('')}
    </div>
    <div class="ch4-round-label">LƯỢT ${State.ch4Round + 1} / ${rounds.length} — Xử lý các sự cố bên dưới</div>
    <div class="ch4-incidents" id="ch4-incidents">
      ${round.incidents.map(inc => `
        <div class="incident-card" id="inc-${inc.id}">
          <div class="incident-header">
            <div class="incident-title">${inc.title}</div>
            <div class="ticket-severity sev-${inc.priority}">${inc.priority}</div>
          </div>
          <div class="incident-desc">${inc.description}</div>
          <div class="incident-actions">
            <button class="inc-btn inc-btn-internal" data-inc="${inc.id}" data-choice="internal">Tự xử lý nội bộ</button>
            <button class="inc-btn inc-btn-report"   data-inc="${inc.id}" data-choice="report">Báo cáo cơ quan chức năng</button>
          </div>
          <div class="incident-result" id="ir-${inc.id}"></div>
        </div>`).join('')}
    </div>
    <button class="ch4-next-btn" id="ch4-next">Lượt tiếp theo</button>`;

  State.ch4RoundAnswered = 0;

  document.querySelectorAll('[data-choice]').forEach(btn => {
    btn.addEventListener('click', () => handleCh4Choice(btn.dataset.inc, btn.dataset.choice, round));
  });
  document.getElementById('ch4-next')?.addEventListener('click', () => {
    Audio.click();
    State.ch4Round++;
    if (State.mpMode) {
      MP.updateMyState({
        currentChapter: 4,
        score: getMPTotalScore(),
        trustScore: State.trustScore,
        caseIndex: State.ch4Round,
        hp: 100
      });
    }
    renderCh4Round();
  });
}

function handleCh4Choice(incId, choice, round) {
  const incData = round.incidents.find(i => i.id === incId);
  if (!incData) return;
  document.querySelectorAll(`[data-inc="${incId}"]`).forEach(b => b.disabled = true);

  const option  = incData.options[choice === 'internal' ? 0 : 1];
  const correct = option.correct;
  const resultEl = document.getElementById(`ir-${incId}`);
  if (resultEl) {
    resultEl.classList.add('show', correct ? 'correct' : 'wrong');
    resultEl.textContent = option.explanation;
  }
  State.ch4Score += option.score;
  setTrust(option.score > 0 ? 3 : -5);
  if (correct) Audio.correct(); else Audio.wrong();

  if (State.mpMode) {
    MP.updateMyState({
      currentChapter: 4,
      score: getMPTotalScore(),
      trustScore: State.trustScore,
      caseIndex: State.ch4Round,
      hp: 100
    });
  }

  State.ch4RoundAnswered++;
  if (State.ch4RoundAnswered >= round.incidents.length) {
    document.getElementById('ch4-next')?.classList.add('show');
  }
}

function finishChapter4() {
  if (State.mpMode) {
    nextMPChapter();
    return;
  }
  showChapterComplete('Chương 4 Hoàn Thành', 'GHOST_VN đang lộ diện. Chuẩn bị cho đợt tấn công cuối!', () => gotoChapter(5));
}

// ─── CHƯƠNG 5: BOSS FINAL + COMBAT (player + boss HP) ────────────────────────
function initChapter5() {
  showScreen('screen-ch5');
  setCaseLabel('#GHOST_VN');

  State.ch5TimeLeft   = 90;
  State.ch5Score      = 0;
  State.ch5PoolIndex  = 0;
  State.ch5AwaitingNext = false;
  State.ch5BossDefeated = false;
  clearInterval(State.ch5TimerInterval);
  clearInterval(State.ch5CaseInterval);

  // Shuffle pool
  const pool = [...GAME_DATA.chapter3.cases];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  State.ch5Pool = pool;

  // Combat: player + boss HP, boss bắt đầu với khiên
  Combat.init(true);

  if (State.mpMode) {
    MP.updateMyState({
      currentChapter: 5,
      score: getMPTotalScore(),
      trustScore: State.trustScore,
      caseIndex: State.ch5PoolIndex,
      hp: Combat.playerHP
    });
  }

  renderCh5UI();
  startCh5Timer();
  renderCh5Case();
}

function renderCh5UI() {
  const arena = document.getElementById('ch5-arena');
  arena.innerHTML = `
    <div class="boss-alert">GHOST_VN ĐANG TẤN CÔNG — XỬ LÝ TẤT CẢ CÁC CASE NGAY LẬP TỨC</div>
    <div class="boss-timer-bar"><div class="boss-timer-fill" id="boss-timer-fill" style="width:100%"></div></div>
    <div class="boss-stats">
      <div class="ch3-stat">
        <span class="ch3-stat-label">Thời gian còn lại</span>
        <span class="ch3-stat-value text-danger" id="boss-time">90</span>
      </div>
      <div class="ch3-stat">
        <span class="ch3-stat-label">Case đã xử lý</span>
        <span class="ch3-stat-value" id="boss-done">0</span>
      </div>
      <div class="ch3-stat">
        <span class="ch3-stat-label">Điểm</span>
        <span class="ch3-stat-value text-accent" id="boss-score">0</span>
      </div>
    </div>
    <div id="ch5-case-area"></div>
    <div class="result-popup" id="ch5-result"></div>`;
}

function startCh5Timer() {
  State.ch5TimerInterval = setInterval(() => {
    State.ch5TimeLeft--;
    const el   = document.getElementById('boss-time');
    const fill = document.getElementById('boss-timer-fill');
    if (el)   el.textContent = State.ch5TimeLeft;
    if (fill) fill.style.width = (State.ch5TimeLeft / 90 * 100) + '%';
    if (State.ch5TimeLeft <= 10) Audio.urgent();
    if (State.ch5TimeLeft <= 0) {
      clearInterval(State.ch5TimerInterval);
      clearInterval(State.ch5CaseInterval);
      if (!State.ch5BossDefeated) setTimeout(finishChapter5, 600);
    }
  }, 1000);
}

function renderCh5Case() {
  if (State.ch5BossDefeated) return;

  if (State.ch5PoolIndex >= State.ch5Pool.length) {
    State.ch5PoolIndex = 0;
    const pool = [...State.ch5Pool];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    State.ch5Pool = pool;
  }

  const c = State.ch5Pool[State.ch5PoolIndex];
  State.ch5AwaitingNext = false;
  const ch5CaseTotal = 10 + Skills.getTimerBonus();
  State.ch5CaseTimer = ch5CaseTotal;
  clearInterval(State.ch5CaseInterval);

  const area = document.getElementById('ch5-case-area');
  if (!area) return;

  const diffLabel = { easy: 'DỄ', medium: 'VỪA', hard: 'KHÓ' }[c.difficulty || 'medium'];
  const diffColor = { easy: 'var(--safe)', medium: 'var(--accent)', hard: 'var(--danger)' }[c.difficulty || 'medium'];

  area.innerHTML = `
    <div class="case-ticket" id="ch5-ticket">
      <div class="ticket-header">
        <div class="ticket-meta">
          <div class="ticket-number">${c.caseNumber}</div>
          <div class="ticket-source">${c.source}</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center;">
          <span style="font-family:var(--font-mono);font-size:10px;font-weight:700;color:${diffColor};
                       background:${diffColor}18;padding:2px 8px;border-radius:3px;border:1px solid ${diffColor}40;">
            ${diffLabel}
          </span>
          <div class="ticket-severity sev-${c.severity}">${c.severity}</div>
        </div>
      </div>
      <div class="ticket-body">
        <div class="ticket-title">${c.title}</div>
        <div class="ticket-desc">${Skills.applyKeywordHighlight(c.description)}</div>
      </div>
      <div class="ticket-footer">
        <div class="ticket-actions" style="display: flex; flex-direction: column; gap: 10px; width: 100%;">
          <div style="display: flex; gap: 12px; align-items: center; width: 100%;">
            <button class="action-btn btn-block"  data-act="block">CHẶN</button>
            <button class="action-btn btn-report" data-act="report">BÁO CÁO</button>
            <button class="action-btn btn-allow"  data-act="allow">CHO QUA</button>
            <div class="timer-wrap" style="position:relative;">
              <svg class="timer-svg" viewBox="0 0 38 38">
                <circle class="timer-bg"   cx="19" cy="19" r="18"/>
                <circle class="timer-ring" id="ch5-timer-ring" cx="19" cy="19" r="18"/>
              </svg>
              <span style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
                           font-family:var(--font-mono);font-size:11px;font-weight:700;color:var(--text);"
                    id="ch5-timer-num">${ch5CaseTotal}</span>
            </div>
          </div>
          <button class="btn-confirm" id="ch5-confirm" disabled>XÁC NHẬN PHÁN QUYẾT</button>
        </div>
      </div>
      <div class="stamp-overlay" id="ch5-stamp"></div>
    </div>`;

  Skills.applyElimination(c);

  const selectedActions = [];
  const ticketEl = document.getElementById('ch5-ticket');
  const btnBlock = ticketEl.querySelector('.btn-block');
  const btnReport = ticketEl.querySelector('.btn-report');
  const btnAllow = ticketEl.querySelector('.btn-allow');
  const btnConfirm = document.getElementById('ch5-confirm');

  function updateConfirmState() {
    if (btnConfirm) btnConfirm.disabled = (selectedActions.length === 0);
  }

  [btnBlock, btnReport, btnAllow].forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (State.ch5AwaitingNext) return;
      Audio.click();
      const act = btn.dataset.act;
      if (act === 'allow') {
        if (btn.classList.contains('selected')) {
          btn.classList.remove('selected');
          const idx = selectedActions.indexOf(act);
          if (idx > -1) selectedActions.splice(idx, 1);
        } else {
          btn.classList.add('selected');
          selectedActions.push(act);
          if (btnBlock) { btnBlock.classList.remove('selected'); const i = selectedActions.indexOf('block'); if (i > -1) selectedActions.splice(i, 1); }
          if (btnReport) { btnReport.classList.remove('selected'); const i = selectedActions.indexOf('report'); if (i > -1) selectedActions.splice(i, 1); }
        }
      } else {
        if (btn.classList.contains('selected')) {
          btn.classList.remove('selected');
          const idx = selectedActions.indexOf(act);
          if (idx > -1) selectedActions.splice(idx, 1);
        } else {
          btn.classList.add('selected');
          selectedActions.push(act);
          if (btnAllow) { btnAllow.classList.remove('selected'); const i = selectedActions.indexOf('allow'); if (i > -1) selectedActions.splice(i, 1); }
        }
      }
      updateConfirmState();
    });
  });

  btnConfirm?.addEventListener('click', () => {
    if (State.ch5AwaitingNext || selectedActions.length === 0) return;
    Audio.click();
    handleCh5Action(selectedActions, c);
  });

  startCh5CaseTimer(c);
}

function startCh5CaseTimer(c, timeLeft) {
  clearInterval(State.ch5CaseInterval);
  const ch5CaseTotal = 10 + Skills.getTimerBonus();
  State.ch5CaseTimer = (timeLeft !== undefined) ? timeLeft : ch5CaseTotal;
  State.ch5CaseInterval = setInterval(() => {
    State.ch5CaseTimer--;
    const num  = document.getElementById('ch5-timer-num');
    const ring = document.getElementById('ch5-timer-ring');
    if (num)  num.textContent = State.ch5CaseTimer;
    if (ring) {
      ring.style.strokeDashoffset = 113 * (1 - State.ch5CaseTimer / ch5CaseTotal);
      if (State.ch5CaseTimer <= 3) ring.classList.add('urgent');
    }
    if (State.ch5CaseTimer <= 0) {
      clearInterval(State.ch5CaseInterval);
      if (!State.ch5AwaitingNext) handleCh5Action('timeout', c);
    }
  }, 1000);
}

function handleCh5Action(action, caseData) {
  clearInterval(State.ch5CaseInterval);
  State.ch5AwaitingNext = true;
  document.querySelectorAll('#ch5-ticket .action-btn').forEach(b => b.disabled = true);
  const btnConfirm = document.getElementById('ch5-confirm');
  if (btnConfirm) btnConfirm.disabled = true;

  const isTimeout = action === 'timeout';
  const selected = isTimeout ? [] : action;
  const correct = caseData.correct;
  
  const isCorrect = !isTimeout && 
                    selected.length === correct.length && 
                    selected.every(val => correct.includes(val));

  // ── Stamp ──
  const stamp = document.getElementById('ch5-stamp');
  if (stamp) {
    let stampText = 'HẾT GIỜ';
    let stampClass = 'stamp-wrong';
    if (!isTimeout) {
      if (selected.includes('block') && selected.includes('report')) {
        stampText = 'CHẶN + BÁO CÁO';
        stampClass = 'stamp-both';
      } else if (selected.includes('block')) {
        stampText = 'CHẶN';
        stampClass = 'stamp-block';
      } else if (selected.includes('report')) {
        stampText = 'BÁO CÁO';
        stampClass = 'stamp-report';
      } else if (selected.includes('allow')) {
        stampText = 'CHO QUA';
        stampClass = 'stamp-allow';
      }
    }
    stamp.innerHTML = `<div class="stamp ${stampClass}">${stampText}</div>`;
    setTimeout(() => stamp.querySelector('.stamp')?.classList.add('show'), 40);
  }

  // ── Score + Trust ──
  if (isCorrect) {
    State.ch5Score += 15;
    setTrust(2);
    Audio.correct();
    Skills.addTP(5);
  } else {
    State.ch5Score = Math.max(0, State.ch5Score - 10);
    setTrust(-3);
    Audio.wrong();
  }

  // ── Combat ──
  let bossDefeated  = false;
  let playerDefeated = false;

  if (isCorrect) {
    const res = Combat.onCorrect(caseData);
    bossDefeated = res.bossDefeated;
    const recHP = Skills.getRecoveryHP();
    if (recHP > 0 && Combat.comboCount > 0 && Combat.comboCount % 2 === 0) {
      const maxHP = Skills.getMaxHP();
      Combat.playerHP = Math.min(maxHP, Combat.playerHP + recHP);
      Combat.updatePlayerBar();
      Skills.showSkillTrigger('Phục Hồi Nhanh +' + recHP + ' HP');
    }
  } else {
    const res = Combat.onWrong();
    playerDefeated = res.playerDefeated;
  }

  // ── Update displays ──
  const bScore = document.getElementById('boss-score');
  const bDone  = document.getElementById('boss-done');
  if (bScore) bScore.textContent = State.ch5Score;

  // ── Result ──
  const result = document.getElementById('ch5-result');
  if (result) {
    result.className = `result-popup show ${isCorrect ? 'result-correct' : 'result-wrong'}`;
    result.innerHTML = `
      <div class="result-verdict ${isCorrect ? 'verdict-correct' : 'verdict-wrong'}">
        ${isCorrect ? 'ĐÚNG' : (isTimeout ? 'HẾT GIỜ' : 'SAI')} — Đáp án: ${caseData.correctLabel}
      </div>
      <div class="result-text" style="font-size:12px;">${caseData.explanation}</div>`;
  }

  State.ch5PoolIndex++;
  if (bDone) bDone.textContent = State.ch5PoolIndex;

  if (State.mpMode) {
    MP.updateMyState({
      currentChapter: 5,
      score: getMPTotalScore(),
      trustScore: State.trustScore,
      caseIndex: State.ch5PoolIndex,
      hp: Combat.playerHP
    });
  }

  // ── Boss defeated? ──
  if (bossDefeated) {
    State.ch5BossDefeated = true;
    clearInterval(State.ch5TimerInterval);
    clearInterval(State.ch5CaseInterval);
    if (State.mpMode) {
      setTimeout(() => finishChapter5(), 1200);
    } else {
      setTimeout(() => showBossDefeatedCutscene(), 1200);
    }
    return;
  }

  // ── Player defeated in Ch5? ──
  if (playerDefeated) {
    if (State.mpMode) {
      showToast('Hệ thống bị xâm nhập — Bạn đã bị loại!', 'wrong');
      clearAllGameplayTimers();
      const finalRaceScore = getMPTotalScore();
      MP.finishMyGame(finalRaceScore, 0); // Điểm tín nhiệm về 0
      Auth.saveScore('race', finalRaceScore);
      hideMPScoreboard();
      gotoChapter('mpres');
      return;
    } else {
      handleCh5PlayerDefeated();
    }
  }

  // ── Next case ──
  setTimeout(() => {
    const ticket = document.getElementById('ch5-ticket');
    if (ticket) ticket.classList.add(isCorrect ? 'slide-out-correct' : 'slide-out-wrong');
    if (result) result.classList.remove('show');
    setTimeout(renderCh5Case, 400);
  }, 1700);
}

// Ch5: player HP = 0 → hồi 40, trừ -10 trust, chơi tiếp
function handleCh5PlayerDefeated() {
  const charName = Auth.getCharacterName();
  setTrust(-10);
  Combat.playerHP = 40;
  Combat.updatePlayerBar();
  showToast(`Hệ thống bị xâm nhập! ${charName} hồi phục với 40 HP. −10 Tín nhiệm.`, 'wrong');
}

// Ch5: boss HP = 0 → cutscene ngắn visual novel → ending
function showBossDefeatedCutscene() {
  Combat.hide();
  const charName = Auth.getCharacterName();
  const dialogues = [
    {
      speaker: 'SYS',
      color: '#D64550',
      text: '[HỆ THỐNG] GHOST_VN: TẤT CẢ PHIÊN KẾT NỐI BỊ CHẶN — VÔ HIỆU HÓA LÚC 04:17:33'
    },
    {
      speaker: 'Chị Mai',
      color: '#E8A33D',
      text: `${charName}! Em đã làm được rồi. Toàn bộ cuộc tấn công bị chặn đứng. IP của GHOST_VN đã được truy vết và chuyển cơ quan điều tra.`
    },
    {
      speaker: charName,
      color: '#3FA796',
      text: 'Hệ thống đã an toàn. Đang gửi báo cáo đầy đủ đến Cục An toàn thông tin và Bộ Công an — đúng quy trình Luật ANM 2025.'
    },
    {
      speaker: 'Chị Mai',
      color: '#E8A33D',
      text: 'Xuất sắc. Hôm nay em đã chứng minh: hiểu luật không chỉ là nghĩa vụ — đó là lợi thế chiến lược thực sự.'
    }
  ];

  let idx = 0;
  const overlay = document.createElement('div');
  overlay.className = 'chapter-complete';
  overlay.style.cssText = 'background:rgba(14,20,36,0.98);gap:0;padding:32px;';

  function renderCutsceneLine() {
    if (idx >= dialogues.length) {
      overlay.remove();
      finishChapter5();
      return;
    }
    const d = dialogues[idx];
    overlay.innerHTML = `
      <div style="font-family:var(--font-mono);font-size:11px;color:var(--safe);letter-spacing:0.18em;margin-bottom:20px;">
        ✓ GHOST_VN DEFEATED
      </div>
      <div style="font-family:var(--font-mono);font-size:12px;font-weight:700;color:${d.color};
                  letter-spacing:0.06em;margin-bottom:10px;">${d.speaker}</div>
      <div style="font-size:15px;color:var(--text);max-width:520px;text-align:center;
                  line-height:1.8;margin-bottom:28px;font-family:var(--font-sans);">${d.text}</div>
      <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-muted);margin-bottom:20px;">
        ${idx + 1} / ${dialogues.length}
      </div>
      <button class="btn-next">Tiếp tục</button>`;
    overlay.querySelector('button').addEventListener('click', () => {
      Audio.click();
      idx++;
      renderCutsceneLine();
    });
  }

  document.body.appendChild(overlay);
  renderCutsceneLine();
  Audio.chapterComplete();
}

function finishChapter5() {
  Combat.hide();
  Skills.addTP(20, 'Hoàn thành chương');
  clearSave();
  saveHistory();
  if (State.mpMode) {
    nextMPChapter();
  } else {
    gotoChapter(6);
  }
}

// ─── ENDING ───────────────────────────────────────────────────────────────────
function initEnding() {
  Combat.hide();
  showScreen('screen-ending');
  setCaseLabel('#ENDING');

  const score = State.trustScore;
  Auth.saveScore('trust', score); // lưu điểm tín nhiệm lên leaderboard
  let endKey  = 'failed';
  if (score >= 80)      endKey = 'excellent';
  else if (score >= 50) endKey = 'good';

  const e = GAME_DATA.endings[endKey];
  const charName = Auth.getCharacterName();
  const summaryText = e.summary.replace(/\bLong\b/g, charName);
  const ghostText = e.ghost.replace(/\bLong\b/g, charName);
  const detailText = e.detail.replace(/\bLong\b/g, charName);
  const container = document.getElementById('ending-container');

  container.innerHTML = `
    <div class="ending-report">
      <div class="ending-top">
        <div class="ending-grade-badge" style="background:${e.color}20;color:${e.color};border:1px solid ${e.color}40;">
          ${e.grade}
        </div>
        <div>
          <div class="ending-title">${e.title}</div>
          <div class="ending-summary">${summaryText}</div>
        </div>
      </div>
      <div class="ending-body">
        <div class="ending-score-display">
          <div class="ending-score-num" style="color:${e.color};">${score}</div>
          <div>
            <div style="font-family:var(--font-mono);font-size:12px;color:var(--text-muted);">CHỈ SỐ TÍN NHIỆM CUỐI CÙNG</div>
            <div class="ending-score-label">/ 100 điểm</div>
          </div>
        </div>
        <div class="ending-ghost"><strong>GHOST_VN:</strong> ${ghostText}</div>
        <div class="ending-detail">${detailText}</div>
        <div style="font-family:var(--font-serif);font-size:12px;color:var(--text-muted);font-style:italic;
                    text-align:center;padding-top:8px;border-top:1px solid var(--border);">
          Nội dung mô phỏng dựa trên Luật An ninh mạng 2025 (Luật số 116/2025/QH15) — chỉ phục vụ mục đích học tập.
        </div>
      </div>
      <div class="ending-footer">
        <button class="btn-primary"   id="btn-replay" style="flex:1;">Chơi lại từ đầu</button>
        <button class="btn-secondary" id="btn-menu"   style="flex:1;">Về menu chính</button>
      </div>
    </div>`;

  document.getElementById('btn-replay')?.addEventListener('click', () => {
    Audio.click();
    const dlg = document.createElement('div');
    dlg.className = 'chapter-complete';
    dlg.style.cssText = 'background:rgba(14,20,36,0.99);';
    dlg.innerHTML = `
      <div class="chapter-complete-title" style="font-size:19px;">Bắt đầu lại?</div>
      <div class="chapter-complete-sub" style="margin-bottom:16px;">Chọn cách reset tiến trình của ${charName}:</div>
      <div style="display:flex;flex-direction:column;gap:10px;width:100%;max-width:300px;">
        <button class="btn-primary"   id="dlg-keep">Giữ lại kỹ năng đã nâng cấp</button>
        <button class="btn-secondary" id="dlg-reset">Reset toàn bộ (bao gồm kỹ năng)</button>
        <button class="btn-secondary" id="dlg-cancel" style="opacity:0.7;">Hủy</button>
      </div>`;
    dlg.querySelector('#dlg-keep').addEventListener('click', () => {
      dlg.remove();
      State.trustScore = 60; updateTrustBar(); clearSave(); gotoChapter(1);
    });
    dlg.querySelector('#dlg-reset').addEventListener('click', () => {
      dlg.remove();
      Skills.resetAll();
      State.trustScore = 60; updateTrustBar(); clearSave(); gotoChapter(1);
    });
    dlg.querySelector('#dlg-cancel').addEventListener('click', () => dlg.remove());
    document.body.appendChild(dlg);
  });
  document.getElementById('btn-menu')?.addEventListener('click', () => {
    Audio.click();
    State.trustScore = 60;
    updateTrustBar();
    clearSave();
    initMenu();
  });

  Audio.chapterComplete();
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
async function loadAllScreens() {
  const screens = [
    { id: 'screen-menu', file: 'screens/menu.html' },
    { id: 'screen-auth', file: 'screens/auth.html' },
    { id: 'screen-ch1', file: 'screens/ch1.html' },
    { id: 'screen-ch2', file: 'screens/ch2.html' },
    { id: 'screen-ch3', file: 'screens/ch3.html' },
    { id: 'screen-ch4', file: 'screens/ch4.html' },
    { id: 'screen-ch5', file: 'screens/ch5.html' },
    { id: 'screen-lobby', file: 'screens/lobby.html' },
    { id: 'screen-room-wait', file: 'screens/room_wait.html' },
    { id: 'screen-mp-results', file: 'screens/mp_results.html' },
    { id: 'screen-ending', file: 'screens/ending.html' }
  ];

  const main = document.getElementById('main');
  if (!main) return;

  if (window.location.protocol === 'file:') {
    alert("Cảnh báo: Do chính sách bảo mật CORS của trình duyệt, không thể tải các file HTML màn chơi qua giao thức file://. Vui lòng mở game thông qua một web server (ví dụ dùng Docker, Nginx, Live Server trong VS Code, hoặc lệnh: npx serve / python -m http.server).");
    return;
  }

  main.innerHTML = '';

  for (const s of screens) {
    try {
      const res = await fetch(s.file);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const html = await res.text();
      const div = document.createElement('div');
      div.id = s.id;
      div.className = 'screen';
      div.innerHTML = html;
      main.appendChild(div);
    } catch (e) {
      console.error(`Failed to load screen ${s.id}:`, e);
      const errDiv = document.createElement('div');
      errDiv.style.color = 'var(--danger)';
      errDiv.style.padding = '20px';
      errDiv.textContent = `Lỗi tải màn chơi ${s.id}: ${e.message}`;
      main.appendChild(errDiv);
    }
  }
}

function pauseGameplay() {
  if (State.mpMode) return;
  State.gamePaused = true;
  clearInterval(State.ch3TimerInterval);
  clearInterval(State.ch5TimerInterval);
  clearInterval(State.ch5CaseInterval);
}

function resumeGameplay() {
  State.gamePaused = false;
  
  if (document.getElementById('screen-ch3')?.classList.contains('active')) {
    const caseIdx = State.mpMode
      ? (State.mpCaseOrder[State.ch3CaseIndex] ?? State.ch3CaseIndex)
      : State.ch3CaseIndex;
    const c = GAME_DATA.chapter3.cases[caseIdx];
    if (c && !State.ch3AwaitingNext) {
      startCh3Timer(c, State.ch3Timer);
    }
  } else if (document.getElementById('screen-ch5')?.classList.contains('active')) {
    if (!State.ch5BossDefeated) {
      startCh5Timer();
      const c = State.ch5Pool[State.ch5PoolIndex];
      if (c && !State.ch5AwaitingNext) {
        startCh5CaseTimer(c, State.ch5CaseTimer);
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadAllScreens();
  Skills.init();
  const firebaseOK = MP.init();
  updateTrustBar();
  document.getElementById('btn-mute')?.addEventListener('click', () => {
    const muted = !Audio.isMuted();
    Audio.setMuted(muted);
    document.getElementById('btn-mute').textContent = muted ? '🔇' : '🔊';
  });
  document.getElementById('btn-pause')?.addEventListener('click', () => {
    Audio.click();
    if (!State.mpMode) {
      pauseGameplay();
      Skills.openModal(() => {
        resumeGameplay();
      });
    } else {
      Skills.openModal();
    }
  });
  document.getElementById('btn-exit-mission')?.addEventListener('click', () => {
    Audio.click();
    if (confirm('Bạn có chắc chắn muốn thoát khỏi nhiệm vụ này không? Tiến trình của chương hiện tại sẽ bị mất.')) {
      clearAllGameplayTimers();
      State.trustScore = 60;
      updateTrustBar();
      initMenu();
    }
  });

  document.getElementById('btn-mp-quit')?.addEventListener('click', async () => {
    Audio.click();
    if (MP.isHost) {
      if (confirm('Bạn là chủ phòng. Bạn có chắc chắn muốn hủy trận đấu và giải tán phòng không?')) {
        await MP.leaveRoom();
        State.mpMode = false;
        hideMPScoreboard();
        initMenu();
      }
    } else {
      if (confirm('Bạn có chắc chắn muốn rời khỏi phòng đấu mạng này không?')) {
        await MP.leaveRoom();
        State.mpMode = false;
        hideMPScoreboard();
        initMenu();
      }
    }
  });

  if (firebaseOK) {
    Auth.init(loggedIn => {
      try {
        if (loggedIn) initMenu();
        else          initAuthScreen();
      } catch(e) {
        console.error('Init crash:', e);
        initAuthScreen(); // fallback nếu initMenu crash
      }
    });
  } else {
    initMenu();
  }

  // Cảnh báo khi reload hoặc đóng trang khi đang chơi để tránh mất tiến trình
  window.addEventListener('beforeunload', (e) => {
    const isPlaying = (typeof State.currentChapter === 'number' && State.currentChapter >= 1 && State.currentChapter <= 5);
    if (isPlaying || State.mpMode) {
      e.preventDefault();
      e.returnValue = 'Bạn đang trong trận đấu hoặc nhiệm vụ. Nếu tải lại trang, tiến trình chơi hiện tại có thể bị mất. Bạn có chắc chắn muốn rời đi?';
      return e.returnValue;
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// MULTIPLAYER SCREENS
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Lobby ───────────────────────────────────────────────────────────────────
function initLobby() {
  Combat.hide();
  hideMPScoreboard();
  State.mpMode = false;
  showScreen('screen-lobby');
  setCaseLabel('#MP');

  const nameInput = document.getElementById('mp-name-input');
  const codeInput = document.getElementById('mp-code-input');
  const errEl     = document.getElementById('mp-lobby-error');
  if (nameInput) nameInput.value = MP.playerName;

  function clearErr() { if (errEl) errEl.textContent = ''; }

  document.getElementById('btn-lobby-back')?.addEventListener('click', () => {
    Audio.click(); initMenu();
  });

  document.getElementById('btn-create-room')?.addEventListener('click', async () => {
    Audio.click(); clearErr();
    const name = nameInput?.value.trim() || 'Long';
    MP.setPlayerName(name);
    const hn = document.getElementById('header-charname');
    if (hn) hn.textContent = name;
    try {
      const code = await MP.createRoom();
      gotoChapter('rwait');
    } catch(e) {
      if (errEl) errEl.textContent = 'Lỗi tạo phòng: ' + e.message;
    }
  });

  document.getElementById('btn-join-room')?.addEventListener('click', async () => {
    Audio.click(); clearErr();
    const name = nameInput?.value.trim() || 'Long';
    const code = codeInput?.value.trim().toUpperCase();
    if (!code || code.length !== 6) {
      if (errEl) errEl.textContent = 'Nhập đủ 6 ký tự mã phòng.';
      return;
    }
    MP.setPlayerName(name);
    const hn = document.getElementById('header-charname');
    if (hn) hn.textContent = name;
    try {
      await MP.joinRoom(code);
      gotoChapter('rwait');
    } catch(e) {
      if (errEl) errEl.textContent = e.message;
    }
  });

  // Enter key on code input triggers join
  codeInput?.addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('btn-join-room')?.click();
  });
}

// ─── Waiting Room ─────────────────────────────────────────────────────────────
function initRoomWait() {
  showScreen('screen-room-wait');
  setCaseLabel('#ROOM');

  const codeEl    = document.getElementById('room-code-text');
  const startBtn  = document.getElementById('btn-start-mp');
  const waitMsg   = document.getElementById('room-wait-msg');
  const errEl     = document.getElementById('mp-room-error');
  const playersList = document.getElementById('room-players-list');

  if (codeEl) codeEl.textContent = MP.roomCode;

  // Copy code button
  document.getElementById('btn-copy-code')?.addEventListener('click', () => {
    navigator.clipboard?.writeText(MP.roomCode)
      .then(() => showToast('Đã sao chép mã phòng: ' + MP.roomCode, 'info'))
      .catch(() => showToast(MP.roomCode, 'info'));
  });

  // Leave button
  document.getElementById('btn-leave-room')?.addEventListener('click', async () => {
    Audio.click();
    await MP.leaveRoom();
    initMenu();
  });

  // Show host options panel
  const hostPanel = document.getElementById('host-options-panel');
  if (hostPanel && MP.isHost) {
    hostPanel.classList.remove('hidden');
  }

  // Host checkbox listeners
  if (MP.isHost) {
    const chk2 = document.getElementById('chk-ch2');
    const chk3 = document.getElementById('chk-ch3');
    const chk4 = document.getElementById('chk-ch4');
    const chk5 = document.getElementById('chk-ch5');

    const updateChaptersOnFirebase = () => {
      const selected = [];
      if (chk2?.checked) selected.push(2);
      if (chk3?.checked) selected.push(3);
      if (chk4?.checked) selected.push(4);
      if (chk5?.checked) selected.push(5);

      if (selected.length === 0) {
        if (errEl) errEl.textContent = 'Bạn phải chọn ít nhất một chương để bắt đầu.';
        if (startBtn) startBtn.disabled = true;
        return;
      } else {
        if (errEl) errEl.textContent = '';
      }
      MP.db.ref('rooms/' + MP.roomCode + '/meta/chapters').set(selected);
    };

    [chk2, chk3, chk4, chk5].forEach(chk => {
      chk?.addEventListener('change', updateChaptersOnFirebase);
    });
    // Ghi ngay trạng thái mặc định (tất cả chương được chọn) lên Firebase
    updateChaptersOnFirebase();
  }

  // Host start button
  if (startBtn) {
    if (MP.isHost) {
      startBtn.classList.remove('hidden');
      if (waitMsg) waitMsg.style.display = 'none';
    } else {
      startBtn.classList.add('hidden');
      if (waitMsg) waitMsg.style.display = '';
    }
    startBtn.addEventListener('click', async () => {
      const snap = await MP.db.ref('rooms/' + MP.roomCode + '/players').once('value');
      const count = snap.exists() ? Object.keys(snap.val()).length : 0;
      if (count < 2) {
        if (errEl) errEl.textContent = 'Cần ít nhất 2 người để bắt đầu.';
        return;
      }

      // Kiểm tra xem có chương nào được chọn không
      const metaSnap = await MP.db.ref('rooms/' + MP.roomCode + '/meta/chapters').once('value');
      const chs = metaSnap.val();
      if (!Array.isArray(chs) || chs.length === 0) {
        if (errEl) errEl.textContent = 'Bạn phải chọn ít nhất một chương để bắt đầu.';
        return;
      }

      Audio.click();
      await MP.startGame();
    });
  }

  // Listen to room updates
  MP.onRoomUpdate(roomData => {
    if (!roomData) { initMenu(); return; }

    const meta    = roomData.meta || {};
    const players = roomData.players || {};
    const count   = Object.keys(players).length;

    // Update players list
    if (playersList) {
      playersList.innerHTML = Object.values(players).map(p =>
        '<div class="room-player-row">' +
          '<span class="rp-dot"></span>' +
          '<span class="rp-name">' + _esc(p.name) + '</span>' +
          (meta.hostId && Object.keys(players).find(id => players[id] === p) === meta.hostId
            ? '<span class="rp-host">HOST</span>' : '') +
        '</div>'
      ).join('');
    }

    // Update selected chapters label
    const label = document.getElementById('mp-selected-chapters-label');
    if (label && Array.isArray(meta.chapters)) {
      label.textContent = meta.chapters.map(ch => 'Chương ' + ch).join(', ');
    }

    // Enable/disable start button
    if (startBtn && MP.isHost) {
      const hasChapters = Array.isArray(meta.chapters) && meta.chapters.length > 0;
      startBtn.disabled = count < 2 || !hasChapters;
      startBtn.textContent = count < 2
        ? 'Bắt đầu đua (cần thêm ' + (2 - count) + ' người)'
        : 'Bắt đầu đua (' + count + ' người)';
    }

    // Host closed room — hiện thông báo rõ ràng rồi mới về menu
    if (meta.status === 'closed' && !MP.isHost) {
      MP.cleanup();
      // Hiện overlay thông báo thay vì toast (toast bị mất khi đổi screen)
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.75);z-index:9999;display:flex;align-items:center;justify-content:center;';
      overlay.innerHTML = '<div style="background:var(--bg-panel);border:1px solid var(--danger);border-radius:12px;padding:32px 40px;text-align:center;max-width:320px;">' +
        '<div style="font-size:2rem;margin-bottom:12px;">🚪</div>' +
        '<div style="font-family:var(--font-mono);color:var(--danger);font-weight:700;font-size:1rem;margin-bottom:8px;">PHÒNG ĐÃ ĐÓNG</div>' +
        '<div style="color:var(--text-muted);font-size:0.85rem;margin-bottom:20px;">Host đã hủy phòng chơi.</div>' +
        '<button onclick="this.closest(\'div[style*=fixed]\').remove();initMenu();" style="background:var(--accent);color:#0E1424;border:none;padding:10px 28px;border-radius:6px;font-family:var(--font-mono);font-weight:700;cursor:pointer;">Về menu</button>' +
      '</div>';
      document.body.appendChild(overlay);
      setTimeout(() => { overlay.remove(); initMenu(); }, 4000);
      return;
    }

    // Game started — dùng setTimeout để thoát callback Firebase trước khi cleanup
    if (meta.status === 'playing') {
      State.mpCaseOrder  = Array.isArray(meta.caseOrder) ? meta.caseOrder : [];
      State.mpChapters   = Array.isArray(meta.chapters)  ? meta.chapters  : [3];
      State.mpChapterIndex = 0;
      setTimeout(() => startMPGame(), 0);
    }
  });
}

function _esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ─── Start MP game (Đấu mạng nhiều chương) ─────────────────────────────────────────
function startMPGame() {
  MP.cleanupListeners();

  State.mpMode = true;
  State.trustScore = 60;
  updateTrustBar();

  // Reset các biến điểm của từng chương
  State.ch2Score = 0;
  State.ch3CaseIndex = 0;
  State.ch3Score     = 0;
  State.ch3Streak    = 0;
  State.ch4Round = 0;
  State.ch4Score = 0;
  State.ch5Score      = 0;
  State.ch5PoolIndex  = 0;

  showMPScoreboard();

  // Bắt đầu với chương đầu tiên được chọn
  const firstCh = State.mpChapters[State.mpChapterIndex];
  gotoMPChapter(firstCh);

  MP.onRoomUpdate(roomData => {
    if (!roomData) {
      showToast('Phòng chơi đã bị hủy.', 'wrong');
      State.mpMode = false;
      hideMPScoreboard();
      MP.cleanup();
      initMenu();
      return;
    }

    const meta = roomData.meta || {};
    if (meta.status === 'closed') {
      showToast('Chủ phòng đã dừng/đóng phòng đấu mạng.', 'wrong');
      State.mpMode = false;
      hideMPScoreboard();
      MP.cleanup();
      initMenu();
      return;
    }

    renderMPScoreboard(roomData);
  });
}

function gotoMPChapter(ch) {
  if (ch === 2) {
    initChapter2();
  } else if (ch === 3) {
    initChapter3();
  } else if (ch === 4) {
    initChapter4();
  } else if (ch === 5) {
    initChapter5();
  }
}

function getMPTotalScore() {
  let total = 0;
  if (State.mpChapters.includes(2)) total += State.ch2Score;
  if (State.mpChapters.includes(3)) total += State.ch3Score;
  if (State.mpChapters.includes(4)) total += State.ch4Score;
  if (State.mpChapters.includes(5)) total += State.ch5Score;
  return total;
}

function clearAllGameplayTimers() {
  clearInterval(State.ch3TimerInterval);
  clearInterval(State.ch5TimerInterval);
  clearInterval(State.ch5CaseInterval);
}

function nextMPChapter() {
  State.mpChapterIndex++;
  if (State.mpChapterIndex < State.mpChapters.length) {
    const nextCh = State.mpChapters[State.mpChapterIndex];
    gotoMPChapter(nextCh);
  } else {
    const finalRaceScore = getMPTotalScore();
    MP.finishMyGame(finalRaceScore, State.trustScore);
    Auth.saveScore('race', finalRaceScore); // lưu ngay tại đây, trước khi đổi màn hình
    hideMPScoreboard();
    gotoChapter('mpres');
  }
}

// ─── MP Scoreboard ────────────────────────────────────────────────────────────
function showMPScoreboard() {
  const el = document.getElementById('mp-scoreboard');
  if (el) {
    el.classList.remove('hidden');
    const roomEl = document.getElementById('mp-sb-room');
    if (roomEl) roomEl.textContent = MP.roomCode;

    const btnQuit = document.getElementById('btn-mp-quit');
    if (btnQuit) {
      btnQuit.textContent = MP.isHost ? 'HỦY TRẬN / ĐÓNG PHÒNG' : 'RỜI PHÒNG ĐUA';
    }
  }
}

function hideMPScoreboard() {
  document.getElementById('mp-scoreboard')?.classList.add('hidden');
}

function renderMPScoreboard(roomData) {
  const list = document.getElementById('mp-sb-list');
  if (!list) return;

  const players  = MP.getSortedPlayers(roomData);
  const total    = players.length;
  const myRank   = players.findIndex(p => p.id === MP.playerId);
  const TOP      = 10;
  const topSlice = players.slice(0, TOP);
  const meInTop  = myRank < TOP;

  function renderRow(p, i) {
    const isMe     = p.id === MP.playerId;
    const finished = p.status === 'finished';
    const rank     = ['🥇','🥈','🥉'][i] || (i + 1) + '.';

    let subText = '';
    if (finished) {
      subText = '✓ Xong';
    } else {
      const ch = p.currentChapter || 3;
      const idx = (p.caseIndex || 0) + (ch === 2 ? 0 : 1);
      const streak = p.streak || 0;
      if (ch === 2) {
        subText = `Ch2 · Mục ${idx}`;
      } else if (ch === 3) {
        subText = `Ch3 · Mục ${idx} · ×${streak}`;
      } else if (ch === 4) {
        subText = `Ch4 · Mục ${idx}`;
      } else if (ch === 5) {
        subText = `Ch5 · Mục ${idx}`;
      } else {
        subText = `Case ${idx}`;
      }
    }

    return '<div class="mp-sb-row' + (isMe ? ' mp-sb-me' : '') + '">' +
      '<span class="mp-sb-rank">' + rank + '</span>' +
      '<div class="mp-sb-info">' +
        '<span class="mp-sb-name">' + _esc(p.name) + (isMe ? ' ◀' : '') + '</span>' +
        '<span class="mp-sb-sub">' + subText + '</span>' +
      '</div>' +
      '<span class="mp-sb-score">' + (p.score || 0) + '</span>' +
    '</div>';
  }

  let html = topSlice.map((p, i) => renderRow(p, i)).join('');

  // Show separator + my own row when I'm outside top 10
  if (!meInTop && myRank >= 0) {
    html += '<div class="mp-sb-sep">· · ·</div>';
    html += renderRow(players[myRank], myRank);
  }

  // Player count footer
  if (total > TOP) {
    html += '<div class="mp-sb-footer">' + total + ' người chơi</div>';
  }

  list.innerHTML = html;
}

// ─── MP Results screen ────────────────────────────────────────────────────────
function initMPResults() {
  showScreen('screen-mp-results');
  setCaseLabel('#KẾT QUẢ');
  hideMPScoreboard();
  const container = document.getElementById('mp-results-container');
  if (!container) return;

  container.innerHTML = '<div class="mp-results-card">' +
    '<div class="mp-results-title">KẾT QUẢ PHÒNG ' + MP.roomCode + '</div>' +
    '<div id="mp-results-list" class="mp-results-list">' +
      '<div style="color:var(--text-muted);text-align:center;padding:20px;">Đang tổng hợp kết quả...</div>' +
    '</div>' +
    '<div style="display:flex;gap:12px;margin-top:20px;justify-content:center;">' +
      '<button class="btn-primary"   id="btn-mp-again">Chơi lại (phòng mới)</button>' +
      '<button class="btn-secondary" id="btn-mp-menu">Về menu</button>' +
    '</div>' +
  '</div>';

  const listEl = document.getElementById('mp-results-list');
  if (!listEl) return;

  // Real-time listener for results
  const ref = MP.db.ref('rooms/' + MP.roomCode + '/players');
  const handler = snap => {
    const roomSnap = snap.val() || {};
    const players  = Object.entries(roomSnap)
      .map(([id, p]) => ({ id, ...p }))
      .sort((a, b) => b.score - a.score);

    listEl.innerHTML = players.map((p, i) => {
      const isMe   = p.id === MP.playerId;
      const medal  = ['🥇','🥈','🥉'][i] || '';
      
      let grade = '';
      let gradeColor = 'var(--text-muted)';
      if (p.status !== 'finished') {
        grade = 'ĐANG ĐUA...';
        gradeColor = 'var(--accent)';
      } else {
        const isWinner = (i === 0);
        grade = isWinner ? 'THẮNG CUỘC' : ('HẠNG ' + (i + 1));
        gradeColor = isWinner ? 'var(--safe)' : 'var(--text-muted)';
      }
      
      const trustText = `Tín nhiệm: ${p.trustScore ?? 0}%`;
      const trustColor = (p.trustScore ?? 0) >= 50 ? 'var(--accent)' : 'var(--danger)';

      return '<div class="mp-result-row' + (isMe ? ' mp-result-me' : '') + '">' +
        '<div class="mp-result-rank">' + (medal || (i + 1) + '.') + '</div>' +
        '<div class="mp-result-info">' +
          '<div class="mp-result-name">' + _esc(p.name) + (isMe ? ' (Bạn)' : '') + '</div>' +
          '<div style="display: flex; gap: 8px; font-size: 11px; margin-top: 2px;">' +
            '<span class="mp-result-grade" style="color:' + gradeColor + '; font-weight: bold;">' + grade + '</span>' +
            '<span style="color: rgba(255,255,255,0.15)">|</span>' +
            '<span style="color: ' + trustColor + '">' + trustText + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="mp-result-score">' +
          '<div class="mp-rs-num">' + (p.score || 0) + '</div>' +
          '<div class="mp-rs-label">điểm</div>' +
        '</div>' +
      '</div>';
    }).join('');
  };

  ref.on('value', handler);
  MP._listeners.push({ ref, event: 'value', handler });

  document.getElementById('btn-mp-again')?.addEventListener('click', () => {
    Audio.click();
    MP.leaveRoom().then(() => gotoChapter('lobby'));
  });
  document.getElementById('btn-mp-menu')?.addEventListener('click', () => {
    Audio.click();
    State.mpMode = false;
    MP.leaveRoom().then(() => initMenu());
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// AUTH & LEADERBOARD FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function initAuthScreen() {
  Combat.hide();
  State.currentChapter = 0;
  showScreen('screen-auth');
  setCaseLabel('#AUTH');

  let isRegister = false;

  const emailEl    = document.getElementById('auth-email');
  const passEl     = document.getElementById('auth-password');
  const nameEl     = document.getElementById('auth-charname');
  const fieldName  = document.getElementById('field-charname');
  const errEl      = document.getElementById('auth-error');
  const submitBtn  = document.getElementById('btn-auth-submit');
  const tabLogin   = document.getElementById('tab-login');
  const tabReg     = document.getElementById('tab-register');

  function setTab(reg, clearErr = true) {
    isRegister = reg;
    tabLogin.classList.toggle('active', !reg);
    tabReg.classList.toggle('active',  reg);
    fieldName?.classList.toggle('hidden', !reg);
    submitBtn.textContent = reg ? 'Tạo tài khoản' : 'Đăng nhập';
    if (clearErr && errEl) errEl.textContent = '';
  }

  tabLogin?.addEventListener('click',    () => setTab(false));
  tabReg?.addEventListener('click',      () => setTab(true));

  submitBtn?.addEventListener('click', async () => {
    const email    = emailEl?.value.trim();
    const password = passEl?.value;
    const charName = nameEl?.value.trim() || 'Long';
    if (errEl) errEl.textContent = '';

    if (!email || !password) {
      if (errEl) errEl.textContent = 'Vui lòng nhập đầy đủ email và mật khẩu.';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Đang xử lý...';
    try {
      if (isRegister) await Auth.register(email, password, charName);
      else            await Auth.login(email, password);
      // Cập nhật tên nhân vật header
      const hn = document.getElementById('header-charname');
      if (hn) hn.textContent = Auth.getCharacterName();
      initMenu();
    } catch(e) {
      const msgs = {
        'auth/email-already-in-use':   'Email này đã được dùng.',
        'auth/invalid-email':           'Email không hợp lệ.',
        'auth/weak-password':           'Mật khẩu phải ít nhất 6 ký tự.',
        'auth/user-not-found':          'Không tìm thấy tài khoản.',
        'auth/wrong-password':          'Mật khẩu không đúng.',
        'auth/invalid-credential':      'Email hoặc mật khẩu không đúng.',
        'auth/too-many-requests':       'Quá nhiều lần thử. Thử lại sau.'
      };
      if (errEl) errEl.textContent = msgs[e.code] || e.message;
    } finally {
      submitBtn.disabled = false;
      setTab(isRegister, false); // giữ lại error message
    }
  });

  // Enter key
  [emailEl, passEl, nameEl].forEach(el =>
    el?.addEventListener('keydown', e => { if (e.key === 'Enter') submitBtn?.click(); })
  );

  // Skip (chơi không cần tài khoản)
  document.getElementById('btn-auth-skip')?.addEventListener('click', () => {
    Audio.click();
    const guestName = prompt('Hãy nhập tên nhân vật của bạn (mặc định: Long):', 'Long');
    const finalName = guestName?.trim().slice(0, 20) || 'Long';
    localStorage.setItem('csPlayerName', finalName);
    if (typeof MP !== 'undefined') {
      MP.setPlayerName(finalName);
    }
    initMenu();
  });
}

// ─── Leaderboard ─────────────────────────────────────────────────────────────
async function loadAndRenderLeaderboard(type) {
  const listEl = document.getElementById('lb-list');
  if (!listEl) return;
  listEl.innerHTML = '<div class="lb-loading">Đang tải...</div>';

  const rows = await Auth.loadLeaderboard(type);
  if (!rows || rows.length === 0) {
    listEl.innerHTML = '<div class="lb-empty">Chưa có ai lên bảng — hãy là người đầu tiên!</div>';
    return;
  }

  const myUid  = Auth.user ? Auth.user.uid : localStorage.getItem('csGuestUID');
  const labels = { trust: 'Tín nhiệm', race: 'Điểm đua' };
  const colors = { trust: 'var(--safe)', race: 'var(--accent)' };

  listEl.innerHTML = rows.map((r, i) => {
    const isMe  = r.id === myUid;
    const medal = ['🥇','🥈','🥉'][i] || (i + 1) + '.';
    return '<div class="lb-row' + (isMe ? ' lb-me' : '') + '">' +
      '<span class="lb-rank">' + medal + '</span>' +
      '<span class="lb-name">' + _esc(r.name || 'Agent') + '</span>' +
      '<span class="lb-score" style="color:' + colors[type] + '">' + r.score + '</span>' +
    '</div>';
  }).join('');
}

function _esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// Global Audio hover effects on interactive elements
document.addEventListener('mouseover', (e) => {
  const target = e.target.closest('button, .auth-tab, .btn-ghost, .btn-primary, .btn-secondary, [role="button"], input[type="checkbox"], input[type="text"], input[type="password"], input[type="email"]');
  if (target && !target.disabled && !target.dataset.hoverSoundPlayed) {
    if (typeof Audio !== 'undefined' && typeof Audio.hover === 'function') {
      Audio.hover();
    }
    target.dataset.hoverSoundPlayed = 'true';
    setTimeout(() => {
      delete target.dataset.hoverSoundPlayed;
    }, 200);
  }
});

