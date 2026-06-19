// combat.js — lớp combat (thanh máu, damage, combo, shield) cho Ch3 và Ch5

const Combat = {
  // ─── State ────────────────────────────────────────────────────────────────
  playerHP: 100,
  bossHP: 100,
  comboCount: 0,
  shieldActive: false,
  shieldHP: 30,
  postShieldBonus: false,
  shieldMilestonesTriggered: [], // track 70 và 40
  hasBoss: false,

  DAMAGE_TABLE: { easy: 10, medium: 15, hard: 20 },
  PLAYER_DAMAGE: 15,
  SHIELD_MAX: 30,

  // ─── Init / Hide ──────────────────────────────────────────────────────────
  init(hasBoss) {
    this.playerHP = (typeof Skills !== 'undefined') ? Skills.getMaxHP() : 100;
    this.bossHP = 100;
    this.comboCount = 0;
    this.SHIELD_MAX = (hasBoss && typeof Skills !== 'undefined') ? Skills.getBossShieldMax() : 30;
    this.shieldActive = hasBoss;
    this.shieldHP = this.SHIELD_MAX;
    this.postShieldBonus = false;
    this.shieldMilestonesTriggered = [];
    this.hasBoss = hasBoss;

    const bar = document.getElementById('combat-hp-bar');
    if (bar) bar.classList.remove('hidden');

    const bossSide = document.getElementById('boss-hp-side');
    if (bossSide) bossSide.style.display = hasBoss ? 'flex' : 'none';

    const vsEl = document.getElementById('hp-vs');
    if (vsEl) vsEl.style.display = hasBoss ? 'block' : 'none';

    this.updatePlayerBar();
    if (hasBoss) this.updateBossBar();
  },

  hide() {
    const bar = document.getElementById('combat-hp-bar');
    if (bar) bar.classList.add('hidden');
  },

  // ─── Correct answer ───────────────────────────────────────────────────────
  onCorrect(caseData) {
    this.comboCount++;
    const difficulty = caseData.difficulty || 'medium';
    const isHardCrit = (difficulty === 'hard');
    // Đòn Quyết Đoán: random crit on non-hard cases
    const critChance  = (!isHardCrit && typeof Skills !== 'undefined') ? Skills.getCritChance() : 0;
    const isRandomCrit = !isHardCrit && critChance > 0 && Math.random() < critChance;
    const isCritical   = isHardCrit || isRandomCrit;
    let damage = this.DAMAGE_TABLE[difficulty];
    let extraText = null;

    if (isCritical) {
      damage = damage * 2;
      const critLabel = isHardCrit ? 'CHÍNH XÁC TUYỆT ĐỐI!' : 'ĐÒN QUYẾT ĐOÁN!';
      extraText = { text: critLabel, color: '#E8A33D' };
      this.screenFlash();
    } else if (this.comboCount >= 3) {
      const comboMult = (typeof Skills !== 'undefined') ? Skills.getComboMultiplier() : 1.5;
      damage = Math.round(damage * comboMult);
      if (this.comboCount === 3 || this.comboCount === 5 || this.comboCount === 7) {
        this.showSpecialText('COMBO x' + this.comboCount + '!', '#3FA796');
      }
    }

    // Đòn xuyên giáp sau khi phá khiên
    if (this.postShieldBonus && !isCritical) {
      damage = Math.round(damage * 1.5);
      this.postShieldBonus = false;
      extraText = extraText || { text: 'XUYÊN GIÁP!', color: '#D64550' };
    } else if (this.postShieldBonus) {
      this.postShieldBonus = false;
    }

    if (extraText) setTimeout(() => this.showSpecialText(extraText.text, extraText.color), 100);

    // Áp dụng damage
    if (this.hasBoss) {
      if (this.shieldActive) {
        this.shieldHP = Math.max(0, this.shieldHP - damage);
        this.fireProjectile('player', damage, true);
        this.floatingNumber('boss-hp-side', damage, '#E8A33D', true);
        if (this.shieldHP <= 0) {
          this.shieldActive = false;
          this.postShieldBonus = true;
          setTimeout(() => this.showSpecialText('KHIÊN BỊ PHÁ VỠ!', '#D64550'), 280);
          Audio.stamp();
        }
      } else {
        const prev = this.bossHP;
        this.bossHP = Math.max(0, this.bossHP - damage);
        this.fireProjectile('player', damage, false);
        this.floatingNumber('boss-hp-side', damage, '#D64550', true);
        if (prev !== this.bossHP) this.checkShieldMilestone();
      }
      this.updateBossBar();
    } else {
      // Ch3: không có boss — chỉ hiển thị combo effect
      this.fireProjectile('player', damage, false);
    }

    return { bossDefeated: this.hasBoss && this.bossHP <= 0 };
  },

  // ─── Wrong / Timeout ──────────────────────────────────────────────────────
  onWrong() {
    this.comboCount = 0;
    let damage = this.PLAYER_DAMAGE;
    if (typeof Skills !== 'undefined') {
      const reduction = Skills.getDamageReduction();
      if (reduction > 0) damage = Math.max(1, Math.round(damage * (1 - reduction)));
    }
    this.playerHP = Math.max(0, this.playerHP - damage);
    this.fireProjectile('boss', damage, false);
    this.floatingNumber('player-hp-side', damage, '#D64550', false);
    this.updatePlayerBar();
    setTimeout(() => this.screenShake(), 80);
    return { playerDefeated: this.playerHP <= 0 };
  },

  // ─── Bar updates ──────────────────────────────────────────────────────────
  updatePlayerBar() {
    const maxHP = (typeof Skills !== 'undefined') ? Skills.getMaxHP() : 100;
    const pct   = this.playerHP / maxHP * 100;
    const fill  = document.getElementById('player-hp-fill');
    const val   = document.getElementById('player-hp-val');
    if (fill) {
      fill.style.width      = pct + '%';
      fill.style.background = pct >= 60 ? '#3FA796' : pct >= 30 ? '#E8A33D' : '#D64550';
    }
    if (val) val.textContent = this.playerHP + '/' + maxHP;
  },

  updateBossBar() {
    const pct  = this.bossHP;
    const fill = document.getElementById('boss-hp-fill');
    const val  = document.getElementById('boss-hp-val');
    if (fill) {
      fill.style.width = pct + '%';
      fill.style.background = pct >= 60 ? '#3FA796' : pct >= 30 ? '#E8A33D' : '#D64550';
    }
    if (val) val.textContent = `${this.bossHP}/100`;

    // Shield bar
    const shieldWrap = document.getElementById('boss-shield-wrap');
    const shieldFill = document.getElementById('shield-fill');
    if (shieldWrap) shieldWrap.style.display = this.shieldActive ? 'flex' : 'none';
    if (shieldFill) shieldFill.style.width = (this.shieldHP / this.SHIELD_MAX * 100) + '%';

    // Shield ring trên icon boss
    const shieldRing = document.getElementById('boss-shield-ring');
    if (shieldRing) shieldRing.style.display = this.shieldActive ? 'block' : 'none';
  },

  // ─── Shield milestone check ───────────────────────────────────────────────
  checkShieldMilestone() {
    const hp = this.bossHP;
    if (hp <= 70 && !this.shieldMilestonesTriggered.includes(70)) {
      this.shieldMilestonesTriggered.push(70);
      setTimeout(() => this.activateShield(), 450);
    } else if (hp <= 40 && !this.shieldMilestonesTriggered.includes(40)) {
      this.shieldMilestonesTriggered.push(40);
      setTimeout(() => this.activateShield(), 450);
    }
  },

  activateShield() {
    this.shieldActive = true;
    this.shieldHP = this.SHIELD_MAX;
    this.postShieldBonus = false;
    this.updateBossBar();
    this.showSpecialText('GHOST_VN KÍCH HOẠT LẠI KHIÊN!', '#E8A33D');
    Audio.stamp();
  },

  // ─── Projectile animation ─────────────────────────────────────────────────
  fireProjectile(direction, damage, isShield) {
    const layer = document.getElementById('combat-fx-layer');
    if (!layer) return;
    const el = document.createElement('div');
    el.className = [
      'projectile',
      direction === 'player' ? 'proj-player' : 'proj-boss',
      isShield ? 'proj-shield' : ''
    ].join(' ');
    layer.appendChild(el);
    // Remove after animation
    el.addEventListener('animationend', () => el.remove(), { once: true });
    setTimeout(() => el.remove(), 900); // safety cleanup
  },

  // ─── Floating damage number ───────────────────────────────────────────────
  floatingNumber(sideId, value, color, isDamageOnBoss) {
    const side = document.getElementById(sideId);
    if (!side) return;
    const el = document.createElement('div');
    el.className = 'floating-dmg';
    el.textContent = isDamageOnBoss ? `-${value}` : `-${value}`;
    el.style.color = color;
    side.style.position = 'relative';
    side.appendChild(el);
    setTimeout(() => el.remove(), 900);
  },

  // ─── Screen effects ───────────────────────────────────────────────────────
  screenShake() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const app = document.getElementById('app');
    app.classList.add('screen-shake');
    setTimeout(() => app.classList.remove('screen-shake'), 400);
  },

  screenFlash() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const flash = document.createElement('div');
    flash.className = 'screen-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 250);
  },

  // ─── Combat text popup ────────────────────────────────────────────────────
  showSpecialText(text, color) {
    const el = document.createElement('div');
    el.className = 'combat-special-text';
    el.textContent = text;
    el.style.color = color;
    el.style.borderColor = color + '60';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1400);
  }
};
