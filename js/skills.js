// skills.js — hệ thống Điểm Đào Tạo (TP) và kỹ năng nghiệp vụ

const Skills = {
  trainingPoints: 0,
  levels: {},
  isFirstOpen: true,

  LEGAL_KEYWORDS: [
    'nghiêm cấm', 'bị cấm', 'trái phép', 'vi phạm', 'giả mạo', 'mạo danh',
    'xâm nhập', 'chiếm đoạt', 'sai sự thật', 'tống tiền', 'lừa đảo',
    'đánh bạc', 'bản quyền', 'phần mềm độc hại', 'tấn công', 'chiếm quyền',
    'đánh cắp', 'phishing', 'ransomware', 'deepfake', 'DDoS'
  ],

  // ─── Persistence ─────────────────────────────────────────────────────────────
  save() {
    localStorage.setItem('csSkills', JSON.stringify({
      tp: this.trainingPoints,
      levels: this.levels,
      firstOpen: this.isFirstOpen
    }));
  },

  load() {
    try {
      const raw = localStorage.getItem('csSkills');
      if (!raw) return;
      const data = JSON.parse(raw);
      this.trainingPoints = data.tp || 0;
      this.levels         = data.levels || {};
      this.isFirstOpen    = data.firstOpen !== false;
    } catch(e) {}
  },

  init() {
    this.load();
    this.updateHeaderTP();
  },

  resetAll() {
    this.trainingPoints = 0;
    this.levels         = {};
    this.isFirstOpen    = true;
    this.save();
    this.updateHeaderTP();
  },

  // ─── TP management ───────────────────────────────────────────────────────────
  addTP(amount, label) {
    this.trainingPoints += amount;
    this.save();
    this.updateHeaderTP();
    this._floatTP(amount, label);
  },

  _floatTP(amount, label) {
    const tpEl = document.getElementById('tp-display');
    if (!tpEl) return;
    const el = document.createElement('div');
    el.className = 'floating-tp';
    el.textContent = '+' + amount + ' TP' + (label ? ' · ' + label : '');
    document.body.appendChild(el);
    const rect = tpEl.getBoundingClientRect();
    el.style.left = rect.left + 'px';
    el.style.top  = (rect.top - 10) + 'px';
    setTimeout(() => el.remove(), 1500);
  },

  updateHeaderTP() {
    const el = document.getElementById('tp-value');
    if (el) el.textContent = this.trainingPoints;
  },

  // ─── Skill lookup ─────────────────────────────────────────────────────────────
  getLevel(id) { return this.levels[id] || 0; },

  getSkillData(id) {
    for (const branch of GAME_DATA.skillTree) {
      const skill = branch.skills.find(s => s.id === id);
      if (skill) return { ...skill, branchColor: branch.color };
    }
    return null;
  },

  canUpgrade(id) {
    const data = this.getSkillData(id);
    if (!data) return false;
    const lv = this.getLevel(id);
    if (lv >= data.maxLevel) return false;
    return this.trainingPoints >= data.costPerLevel[lv];
  },

  upgrade(id) {
    if (!this.canUpgrade(id)) return false;
    const data = this.getSkillData(id);
    const cost = data.costPerLevel[this.getLevel(id)];
    this.trainingPoints -= cost;
    this.levels[id] = (this.levels[id] || 0) + 1;
    this.save();
    this.updateHeaderTP();
    return true;
  },

  // ─── Effect getters ───────────────────────────────────────────────────────────
  getTimerBonus()        { return [0, 2, 4, 6][this.getLevel('owl_eye')] || 0; },
  getHighlightChance()   { return [0, 0.30, 0.55][this.getLevel('quick_analysis')] || 0; },
  getEliminationChance() { return [0, 0.15, 0.30, 0.45][this.getLevel('investigation_instinct')] || 0; },
  getMaxHP()             { return 100 + ([0, 10, 20, 30][this.getLevel('backup_shield')] || 0); },
  getDamageReduction()   { return [0, 0.20, 0.35][this.getLevel('shock_absorption')] || 0; },
  getRecoveryHP()        { return [0, 3, 5][this.getLevel('fast_recovery')] || 0; },
  getCritChance()        { return [0, 0.05, 0.10, 0.15][this.getLevel('decisive_strike')] || 0; },
  getBossShieldMax()     { return [30, 25, 20][this.getLevel('shield_breaker')] || 30; },
  getComboMultiplier()   { return [1.5, 1.65, 1.80, 2.0][this.getLevel('battlefield_exp')] || 1.5; },

  // ─── In-game effects ──────────────────────────────────────────────────────────
  applyKeywordHighlight(text) {
    if (this.getHighlightChance() === 0) return text;
    if (Math.random() > this.getHighlightChance()) return text;
    let result = text;
    this.LEGAL_KEYWORDS.forEach(kw => {
      const re = new RegExp('(' + kw + ')', 'gi');
      result = result.replace(re, '<mark class="law-keyword">$1</mark>');
    });
    return result;
  },

  applyElimination(caseData) {
    if (this.getEliminationChance() === 0) return;
    if (caseData.difficulty !== 'hard') return;
    if (Math.random() > this.getEliminationChance()) return;

    const allActions = ['block', 'report', 'allow'];
    const wrong = allActions.filter(a => !caseData.correct.includes(a));
    if (wrong.length === 0) return;

    const toElim = wrong[Math.floor(Math.random() * wrong.length)];
    const btn = document.querySelector('[data-act="' + toElim + '"]');
    if (!btn) return;

    btn.classList.add('eliminated-option');
    btn.disabled = true;

    const hint = document.createElement('div');
    hint.className = 'elim-hint';
    hint.textContent = '✦ Trực Giác Điều Tra: đã loại trừ 1 phương án';
    const actions = btn.closest('.ticket-actions');
    if (actions) actions.insertBefore(hint, actions.firstChild);
    setTimeout(() => hint.remove(), 3000);
  },

  showSkillTrigger(text) {
    const el = document.createElement('div');
    el.className = 'skill-trigger-notif';
    el.textContent = text;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1800);
  },

  // ─── Skill tree modal ─────────────────────────────────────────────────────────
  openModal(onClose) {
    document.getElementById('skill-modal')?.remove();

    const isFirst = this.isFirstOpen;
    if (isFirst) {
      this.isFirstOpen = false;
      this.save();
    }

    const modal = document.createElement('div');
    modal.id = 'skill-modal';
    modal.className = 'skill-modal-overlay';
    modal.innerHTML = this._buildModalHTML(isFirst);
    document.body.appendChild(modal);

    modal.querySelector('#skill-modal-close')?.addEventListener('click', () => {
      modal.remove();
      if (onClose) onClose();
    });

    modal.addEventListener('click', e => {
      const node = e.target.closest('.skill-node[data-skill-id]');
      if (!node) return;
      const id = node.dataset.skillId;
      const lv = this.getLevel(id);
      const data = this.getSkillData(id);
      if (!data) return;

      if (lv >= data.maxLevel) {
        this._shakeNode(node);
        return;
      }
      if (!this.canUpgrade(id)) {
        this._shakeNode(node);
        this.showSkillTrigger('Không đủ TP — cần ' + data.costPerLevel[lv] + ' TP');
        return;
      }

      this.upgrade(id);
      this._flashNode(node, data.branchColor);
      Audio.correct();

      // Re-render tree
      const inner = modal.querySelector('#skill-tree-inner');
      if (inner) inner.innerHTML = this._buildTreeHTML();
      const tpVal = modal.querySelector('#tp-modal-value');
      if (tpVal) tpVal.textContent = this.trainingPoints;
    });
  },

  _buildModalHTML(isFirst) {
    return '<div class="skill-modal">' +
      '<div class="skill-modal-header">' +
        '<div>' +
          '<div class="skill-modal-title">TRUNG TÂM ĐÀO TẠO</div>' +
          '<div class="skill-modal-sub">Nâng cao nghiệp vụ cho chuyên viên SOC</div>' +
        '</div>' +
        '<div style="display:flex;align-items:center;gap:16px;">' +
          '<div class="skill-modal-tp">' +
            '<svg width="14" height="14" viewBox="0 0 16 16" fill="none">' +
              '<polygon points="8,1 10,6 15,6 11,10 13,15 8,12 3,15 5,10 1,6 6,6"' +
              ' fill="none" stroke="#E8A33D" stroke-width="1.5" stroke-linejoin="round"/>' +
            '</svg>' +
            '<span id="tp-modal-value">' + this.trainingPoints + '</span> TP' +
          '</div>' +
          '<button id="skill-modal-close" class="skill-modal-close-btn">Đóng ×</button>' +
        '</div>' +
      '</div>' +
      (isFirst ? '<div class="skill-intro-banner">' +
        '<div class="skill-intro-speaker">Chị Mai — Giám đốc SOC</div>' +
        '<div class="skill-intro-text">"' + ((typeof Auth !== 'undefined') ? Auth.getCharacterName() : 'Long') + ', đây là Trung Tâm Đào Tạo. ' +
        'Mỗi case xử lý đúng tích lũy Điểm Đào Tạo (TP). ' +
        'Dùng TP để nâng cấp kỹ năng — chúng tăng hiệu quả phân tích và khả năng chịu đòn của em trong thực chiến."' +
        '</div>' +
      '</div>' : '') +
      '<div id="skill-tree-inner">' + this._buildTreeHTML() + '</div>' +
    '</div>';
  },

  _buildTreeHTML() {
    return '<div class="skill-tree-grid">' +
      GAME_DATA.skillTree.map(branch =>
        '<div class="skill-branch">' +
          '<div class="branch-header" style="color:' + branch.color + ';border-bottom-color:' + branch.color + '40;">' +
            branch.label +
          '</div>' +
          '<div class="branch-nodes">' +
            branch.skills.map((skill, idx) => this._buildNodeHTML(skill, branch, idx)).join('') +
          '</div>' +
        '</div>'
      ).join('') +
    '</div>';
  },

  _buildNodeHTML(skill, branch, idx) {
    const lv      = this.getLevel(skill.id);
    const maxed   = lv >= skill.maxLevel;
    const canUp   = this.canUpgrade(skill.id);
    const nextCost = !maxed ? skill.costPerLevel[lv] : null;
    const effectNow  = lv > 0 ? skill.effectLabels[lv - 1] : 'Chưa mở khóa';
    const effectNext = !maxed ? skill.effectLabels[lv] : 'Đã đạt tối đa';
    const borderCol  = maxed ? branch.color : canUp ? branch.color : '#2A3550';
    const fillBg     = maxed ? branch.color + '22' : 'var(--bg-panel)';
    const stateClass = maxed ? 'node-maxed' : canUp ? 'node-ready' : 'node-locked';

    const pips = Array.from({ length: skill.maxLevel }, (_, i) =>
      '<div class="level-pip' + (i < lv ? ' pip-filled' : '') + '"' +
      (i < lv ? ' style="background:' + branch.color + '"' : '') + '></div>'
    ).join('');

    return '<div class="skill-node-wrap">' +
      (idx > 0 ? '<div class="branch-connector" style="background:' + branch.color + '30;"></div>' : '') +
      '<div class="skill-node ' + stateClass + '" data-skill-id="' + skill.id + '">' +
        '<div class="hex-border-outer" style="background:' + borderCol + ';">' +
          '<div class="hex-inner-fill" style="background:' + fillBg + ';">' +
            '<div class="node-pips">' + pips + '</div>' +
            '<div class="node-name">' + skill.name + '</div>' +
            '<div class="node-cost" style="color:' + (maxed ? branch.color : canUp ? branch.color : 'var(--text-muted)') + ';">' +
              (maxed ? 'MAX' : nextCost + ' TP') +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="node-tooltip">' +
          '<div class="tt-name">' + skill.name + '</div>' +
          '<div class="tt-desc">' + skill.desc + '</div>' +
          '<div class="tt-row">Hiện tại: <span>' + effectNow + '</span></div>' +
          (!maxed
            ? '<div class="tt-row tt-next">Cấp ' + (lv + 1) + ': <span style="color:' + branch.color + '">' + effectNext + '</span> (' + nextCost + ' TP)</div>'
            : '<div class="tt-row" style="color:var(--safe)">Đã đạt cấp tối đa</div>') +
        '</div>' +
      '</div>' +
    '</div>';
  },

  _shakeNode(el) {
    el.classList.add('node-shake');
    setTimeout(() => el.classList.remove('node-shake'), 450);
  },

  _flashNode(el, color) {
    el.style.transition = 'box-shadow 0.15s';
    el.style.boxShadow  = '0 0 18px ' + color;
    setTimeout(() => { el.style.boxShadow = ''; }, 500);
  }
};
