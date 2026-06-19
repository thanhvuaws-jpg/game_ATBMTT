// multiplayer.js — phòng chơi nhiều người qua Firebase Realtime Database

const MP = {
  db:         null,
  roomCode:   null,
  playerId:   null,
  playerName: 'Long',
  isHost:     false,
  _listeners: [],   // { ref, event, handler } để unsubscribe

  // ─── Khởi tạo ──────────────────────────────────────────────────────────────
  isReady() {
    try {
      return typeof firebase !== 'undefined' &&
             typeof FIREBASE_CONFIG !== 'undefined' &&
             FIREBASE_CONFIG.databaseURL &&
             !FIREBASE_CONFIG.databaseURL.includes('PASTE_YOUR');
    } catch(e) { return false; }
  },

  init() {
    if (!this.isReady()) return false;
    try {
      if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
      this.db         = firebase.database();
      this.playerId   = this._genId();
      this.playerName = localStorage.getItem('csPlayerName') || 'Long';
      return true;
    } catch(e) {
      console.error('Firebase init failed:', e);
      return false;
    }
  },

  _genId()   { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); },
  _genCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    return Array.from({length: 6}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  },

  setPlayerName(name) {
    this.playerName = name.trim() || 'Long';
    localStorage.setItem('csPlayerName', this.playerName);
  },

  // ─── Tạo phòng ─────────────────────────────────────────────────────────────
  async createRoom() {
    const code = this._genCode();
    this.roomCode = code;
    this.isHost   = true;

    const caseOrder = this._shuffleCases();

    await this.db.ref('rooms/' + code).set({
      meta: {
        code,
        hostId:    this.playerId,
        status:    'waiting',
        startedAt: 0,
        caseOrder
      }
    });

    // Xóa phòng khi host ngắt kết nối
    this.db.ref('rooms/' + code + '/meta/status').onDisconnect().set('closed');

    await this._addPlayer(code);
    return code;
  },

  // ─── Tham gia phòng ────────────────────────────────────────────────────────
  async joinRoom(code) {
    const upper = code.toUpperCase().trim();
    const snap  = await this.db.ref('rooms/' + upper).once('value');

    if (!snap.exists()) throw new Error('Phòng không tồn tại — kiểm tra lại mã.');

    const meta = snap.val().meta;
    if (meta.status === 'playing')  throw new Error('Phòng đã bắt đầu, không thể tham gia.');
    if (meta.status === 'closed')   throw new Error('Phòng đã đóng.');

    const players  = snap.val().players || {};
    const count    = Object.keys(players).length;
    if (count >= 30) throw new Error('Phòng đã đầy (tối đa 30 người).');

    this.roomCode = upper;
    this.isHost   = false;
    await this._addPlayer(upper);
  },

  async _addPlayer(code) {
    const ref = this.db.ref('rooms/' + code + '/players/' + this.playerId);
    const displayName = (typeof Auth !== 'undefined' && Auth.isLoggedIn())
      ? Auth.getCharacterName()
      : this.playerName;
    await ref.set({
      name:        displayName,
      trustScore:  60,
      score:       0,
      caseIndex:   0,
      streak:      0,
      hp:          100,
      status:      'waiting',
      joinedAt:    firebase.database.ServerValue.TIMESTAMP
    });
    ref.onDisconnect().remove();
  },

  // ─── Host bắt đầu game ─────────────────────────────────────────────────────
  async startGame() {
    if (!this.isHost) return;
    await this.db.ref('rooms/' + this.roomCode + '/meta').update({
      status:    'playing',
      startedAt: firebase.database.ServerValue.TIMESTAMP
    });
  },

  // ─── Cập nhật trạng thái player ────────────────────────────────────────────
  updateMyState(data) {
    if (!this.roomCode || !this.playerId) return;
    this.db.ref('rooms/' + this.roomCode + '/players/' + this.playerId).update(data);
  },

  finishMyGame(score, trustScore) {
    this.updateMyState({ status: 'finished', score, trustScore });
  },

  // ─── Subscribe room updates ─────────────────────────────────────────────────
  onRoomUpdate(callback) {
    const ref = this.db.ref('rooms/' + this.roomCode);
    const handler = snap => callback(snap.val());
    ref.on('value', handler);
    this._listeners.push({ ref, event: 'value', handler });
  },

  // ─── Cleanup ───────────────────────────────────────────────────────────────
  async leaveRoom() {
    if (this.roomCode && this.playerId) {
      await this.db.ref('rooms/' + this.roomCode + '/players/' + this.playerId).remove();
      if (this.isHost) {
        await this.db.ref('rooms/' + this.roomCode + '/meta/status').set('closed');
      }
    }
    this.cleanup();
  },

  cleanupListeners() {
    this._listeners.forEach(({ ref, event, handler }) => ref.off(event, handler));
    this._listeners = [];
  },

  cleanup() {
    this.cleanupListeners();
    this.roomCode   = null;
    this.isHost     = false;
  },

  // ─── Utils ─────────────────────────────────────────────────────────────────
  _shuffleCases() {
    const indices = GAME_DATA.chapter3.cases.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  },

  getCaseOrder(roomData) {
    return roomData?.meta?.caseOrder || GAME_DATA.chapter3.cases.map((_, i) => i);
  },

  getSortedPlayers(roomData) {
    if (!roomData?.players) return [];
    return Object.entries(roomData.players)
      .map(([id, p]) => ({ id, ...p }))
      .sort((a, b) => b.score - a.score || a.caseIndex - b.caseIndex);
  }
};
