// auth.js — đăng ký / đăng nhập Firebase + lưu điểm leaderboard

const Auth = {
  user:    null,
  profile: null,
  _db:     null,

  // ─── Khởi tạo ──────────────────────────────────────────────────────────────
  init(onInitialState) {
    if (typeof firebase === 'undefined') { onInitialState(false); return; }
    try {
      this._db = firebase.database();
      // Chỉ nghe 1 lần để lấy trạng thái ban đầu
      const unsub = firebase.auth().onAuthStateChanged(async user => {
        unsub();
        if (user) {
          this.user    = user;
          this.profile = await this._loadProfile(user.uid)
                         || { displayName: 'Agent', stats: {} };
          onInitialState(true);
        } else {
          onInitialState(false);
        }
      });
    } catch(e) {
      console.error('Auth.init error:', e);
      onInitialState(false);
    }
  },

  // ─── Đăng ký ───────────────────────────────────────────────────────────────
  async register(email, password, charName) {
    const cred    = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const uid     = cred.user.uid;
    const name    = (charName || 'Agent').trim().slice(0, 20) || 'Agent';
    const profile = {
      displayName: name,
      createdAt:   firebase.database.ServerValue.TIMESTAMP,
      stats: { gamesPlayed: 0, bestTrustScore: 0, bestRaceScore: 0 }
    };
    await this._db.ref('users/' + uid).set(profile);
    this.user    = cred.user;
    this.profile = profile;
    this._switchUser(uid); // xóa data của user cũ
  },

  // ─── Đăng nhập ─────────────────────────────────────────────────────────────
  async login(email, password) {
    const cred   = await firebase.auth().signInWithEmailAndPassword(email, password);
    this.user    = cred.user;
    this.profile = await this._loadProfile(cred.user.uid)
                   || { displayName: 'Agent', stats: {} };
    this._switchUser(cred.user.uid); // xóa data của user cũ nếu khác
  },

  // Xóa localStorage khi đổi tài khoản
  _switchUser(uid) {
    const prev = localStorage.getItem('csCurrentUser');
    if (prev !== uid) {
      localStorage.removeItem('cyberShieldSave');
      localStorage.removeItem('cyberShieldHistory');
      localStorage.removeItem('csSkills');
      localStorage.setItem('csCurrentUser', uid);
    }
  },

  // ─── Đăng xuất ─────────────────────────────────────────────────────────────
  async logout() {
    await firebase.auth().signOut();
    this.user    = null;
    this.profile = null;
  },

  // ─── Profile ───────────────────────────────────────────────────────────────
  async _loadProfile(uid) {
    const snap = await this._db.ref('users/' + uid).once('value');
    return snap.val();
  },

  getCharacterName() {
    if (this.profile && this.profile.displayName) {
      return this.profile.displayName;
    }
    return localStorage.getItem('csPlayerName') || 'Long';
  },

  isLoggedIn() { return !!this.user; },

  // ─── Lưu điểm leaderboard ──────────────────────────────────────────────────
  // type: 'trust' (solo) | 'race' (multiplayer)
  async saveScore(type, score) {
    if (!this.isLoggedIn() || !this._db) return;
    const uid  = this.user.uid;
    const name = this.getCharacterName();
    const ref  = this._db.ref('leaderboard/' + type + '/' + uid);
    const snap = await ref.once('value');
    const cur  = snap.val();
    if (!cur || score > (cur.score || 0)) {
      await ref.set({ name, score, updatedAt: firebase.database.ServerValue.TIMESTAMP });
    }
    if (type === 'trust') {
      await this._db.ref('users/' + uid + '/stats/gamesPlayed')
        .transaction(v => (v || 0) + 1);
    }
  },

  // ─── Đọc bảng xếp hạng ─────────────────────────────────────────────────────
  async loadLeaderboard(type) {
    if (!this._db) return [];
    try {
      const snap = await this._db.ref('leaderboard/' + type)
        .orderByChild('score').limitToLast(10).once('value');
      if (!snap.exists()) return [];
      const rows = [];
      snap.forEach(c => rows.push({ id: c.key, ...c.val() }));
      return rows.sort((a, b) => b.score - a.score);
    } catch(e) { return []; }
  }
};
