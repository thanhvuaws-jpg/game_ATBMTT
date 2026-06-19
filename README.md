<div align="center">

<img src="https://img.shields.io/badge/version-1.0.0-E8A33D?style=for-the-badge" />
<img src="https://img.shields.io/badge/platform-Web-3FA796?style=for-the-badge" />
<img src="https://img.shields.io/badge/Firebase-Realtime%20DB-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
<img src="https://img.shields.io/badge/Docker-nginx%3Aalpine-2496ED?style=for-the-badge&logo=docker&logoColor=white" />

# 🛡️ CYBER SHIELD: Đội Phản Ứng Số

**Game giáo dục an ninh mạng — mô phỏng vai trò chuyên viên SOC**

*Dựa trên Luật An ninh mạng Việt Nam 2025 (Luật số 116/2025/QH15)*

---

🌐 **[CHƠI NGAY](https://proceed-intl-card-sharing.trycloudflare.com/)** &nbsp;|&nbsp; 📁 **[Source Code](https://github.com/thanhvuaws-jpg/game_ATBMTT)**

</div>

---

## 📖 Giới thiệu

**CYBER SHIELD: Đội Phản Ứng Số** là game giáo dục tương tác, đưa người chơi vào vai **Long** — chuyên viên SOC (Security Operations Center) mới vào nghề. Thành phố đang bị tấn công bởi nhóm hacker bí ẩn **GHOST_VN**, và bạn phải áp dụng đúng **Luật An ninh mạng 2025** để bảo vệ hệ thống, giữ vững chỉ số tín nhiệm và tiêu diệt mối đe dọa.

Game được xây dựng nhằm mục đích **học tập và nghiên cứu** về pháp luật an ninh mạng Việt Nam, phù hợp cho sinh viên, giảng viên và cán bộ làm việc trong lĩnh vực công nghệ thông tin và an toàn thông tin.

---

## ✨ Tính năng nổi bật

| Tính năng | Mô tả |
|-----------|-------|
| 🎮 **5 chương SP** | Mỗi chương có cơ chế gameplay khác nhau — tutorial, kéo-thả, case ticket, turn-based, boss fight |
| 👥 **Multiplayer** | Tạo/tham gia phòng thi đấu thời gian thực tối đa 30 người, bảng điểm cập nhật live |
| 🏆 **Leaderboard Server** | Bảng xếp hạng toàn cầu top 10 Tín Nhiệm (SP) và top 10 Đua Phòng (MP) |
| 🌳 **Skill Tree** | Hệ thống kỹ năng 3 nhánh, nâng cấp bằng Điểm Đào Tạo kiếm được trong game |
| ⚔️ **Combat HP Bars** | Thanh máu trực quan, hiệu ứng đòn tấn công khi trả lời đúng/sai |
| 🔐 **Firebase Auth** | Đăng ký / đăng nhập tài khoản, lưu điểm cao cá nhân lên server |
| 💾 **Lưu tiến trình** | Tự động lưu vị trí trong game (SP), có thể tiếp tục từ chỗ dừng |

---

## 🕹️ Cách chơi

### Chế độ Đơn người

> **Chỉ số Tín nhiệm** bắt đầu ở **60/100** — tăng khi xử lý đúng, giảm khi sai. Kết quả cuối: ≥80 Xuất Sắc | 50–79 Hoàn Thành | <50 Cảnh Báo.

---

#### 📘 Chương 1 — Tutorial: Nhập môn SOC
- Hội thoại với **Chị Mai** (Giám đốc SOC) để nắm nền tảng pháp lý
- Trả lời **5 câu trắc nghiệm** về Luật ANM 2025, Nghị định 13/2023, vai trò A05

---

#### 🗂️ Chương 2 — Phân loại Tấn công & Tội phạm
- **8 thẻ tình huống** thực tế (ransomware, deepfake, lừa đảo, DDoS...)
- **Kéo-thả** vào đúng danh mục:

```
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│   TẤN CÔNG      │   │   TỘI PHẠM      │   │     CẢ HAI      │
│    MẠNG         │   │    MẠNG         │   │                 │
│  (xâm nhập,     │   │  (lừa đảo,      │   │  (vừa tấn công  │
│   phá hoại)     │   │   chiếm đoạt)   │   │  vừa tội phạm)  │
└─────────────────┘   └─────────────────┘   └─────────────────┘
```

- Đúng: **+10 điểm** | Sai: **-5 điểm** | Cần ≥50 điểm để qua chương

---

#### ⚡ Chương 3 — Phán quyết Luật ANM 2025
- Case ticket liên tục xuất hiện: deepfake CEO, ransomware, rò rỉ dữ liệu...
- Mỗi case chỉ có **8 giây** để đọc và ra phán quyết đúng theo luật
- Đúng: **+15 điểm** + tăng combo | Sai: **-10 điểm** + mất HP
- Hệ thống **thanh máu HP** — mất hết = thất bại

---

#### 🏢 Chương 4 — Điều phối Đội Phản ứng SOC
- Đóng vai **Trưởng nhóm**, chỉ huy 3 nhân viên:

| Nhân viên | Vai trò |
|-----------|---------|
| 🔵 Hùng | Phân tích mạng |
| 🟢 Linh | Phản ứng sự cố |
| 🟡 Tuấn | Điều tra số |

- Nhiều sự cố xảy ra đồng thời mỗi lượt — chọn người xử lý và phương án đúng (cách ly, báo A05, điều tra log...)

---

#### 💀 Chương 5 — Quyết đấu Boss GHOST_VN
- Đồng hồ đếm ngược **90 giây**
- Case ngẫu nhiên từ pool Ch2 + Ch3 liên tục xuất hiện
- Mỗi lần đúng → đánh vào **HP Boss GHOST_VN**, mỗi lần sai → mất HP của bạn
- Tiêu diệt Boss → kết thúc hoàn hảo

---

### 🌐 Chế độ Nhiều người (Multiplayer)

```
Host tạo phòng  →  Chia mã 6 ký tự  →  Bạn bè tham gia
      ↓
Host chọn chương (Ch2 / Ch3 / Ch4 / Ch5)
      ↓
Tất cả thi đồng thời — bảng điểm live real-time
      ↓
Kết thúc → Bảng tổng kết xếp hạng toàn phòng
```

| | Host | Người tham gia |
|--|------|----------------|
| Quyền chọn chương | ✅ | ❌ |
| Xem bảng điểm live | ✅ | ✅ |
| Rời phòng giữa chừng | ✅ (đóng phòng) | ✅ |
| Tối đa | 30 người/phòng | |

---

### 🌳 Skill Tree — Trung Tâm Đào Tạo

Bấm nút **⏸** trên header để mở. Dùng **Điểm Đào Tạo (TP)** kiếm được khi hoàn thành chương để mua kỹ năng:

| Nhánh | Kỹ năng tiêu biểu |
|-------|-------------------|
| 🔍 **Trinh Sát** | Thêm giờ quan sát case, làm nổi từ khóa luật, loại đáp án sai |
| 🛡️ **Phòng Thủ** | Tăng HP tối đa, giảm sát thương khi trả lời sai |
| ⚡ **Tấn Công** | Tăng điểm thưởng, bonus combo streak |

---

## 🛠️ Công nghệ

```
Frontend:   HTML5 / CSS3 / JavaScript (Vanilla — không framework)
Backend:    Firebase Realtime Database (rooms, leaderboard)
Auth:       Firebase Authentication (email/password)
Server:     Docker — nginx:alpine
Deploy:     Cloudflare Tunnel (HTTPS public URL)
```

### Cấu trúc thư mục

```
game_ATBMTT/
├── index.html              # Shell chính (header, HP bars, toast)
├── Dockerfile              # nginx:alpine, serve port 80
├── screens/                # Các màn hình (load động khi khởi động)
│   ├── menu.html
│   ├── auth.html
│   ├── ch1.html ~ ch5.html
│   ├── lobby.html
│   ├── room_wait.html
│   ├── mp_results.html
│   └── ending.html
├── js/
│   ├── data.js             # Toàn bộ nội dung game (câu hỏi, tình huống)
│   ├── game.js             # State machine chính, điều phối flow
│   ├── multiplayer.js      # Firebase room logic
│   ├── auth.js             # Firebase Auth + Leaderboard
│   ├── firebase-config.js  # Firebase project config
│   ├── combat.js           # HP bar system
│   ├── skills.js           # Skill tree + TP system
│   └── audio.js            # Âm thanh
└── css/
    ├── base.css            # Core styles, menu
    ├── skills.css          # Skill tree UI
    ├── multiplayer.css     # Multiplayer UI
    └── auth.css            # Auth screen + leaderboard
```

---

## 🚀 Chạy local

### Yêu cầu
- Docker Desktop đã cài và đang chạy

### Các bước

```bash
# 1. Clone repo
git clone https://github.com/thanhvuaws-jpg/game_ATBMTT.git
cd game_ATBMTT

# 2. Build Docker image
docker build -t cybershield .

# 3. Chạy container
docker run -d -p 3000:80 --name cybershield-game cybershield

# 4. Mở trình duyệt
# http://localhost:3000
```

> **Lưu ý:** Game **bắt buộc** phải chạy qua HTTP server (không hỗ trợ `file://`) vì Firebase Auth yêu cầu giao thức HTTP/HTTPS để hoạt động.

### Rebuild sau khi chỉnh code

```bash
docker stop cybershield-game && docker rm cybershield-game
docker build -t cybershield . -q
docker run -d -p 3000:80 --name cybershield-game cybershield
```

---

## 🔧 Cấu hình Firebase

Game sử dụng Firebase Realtime Database với cấu trúc dữ liệu:

```
/users/{uid}                    # Hồ sơ người dùng
/leaderboard/trust/{uid}        # Bảng xếp hạng Tín Nhiệm (SP)
/leaderboard/race/{uid}         # Bảng xếp hạng Đua Phòng (MP)
/rooms/{roomCode}               # Dữ liệu phòng multiplayer
  /meta                         # Trạng thái phòng, chapters, caseOrder
  /players/{playerId}           # Dữ liệu từng người chơi
```

### Firebase Database Rules (khuyến nghị)

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read":  "auth != null && auth.uid == $uid",
        ".write": "auth != null && auth.uid == $uid"
      }
    },
    "leaderboard": {
      ".read": true,
      "trust": {
        ".indexOn": ["score"],
        "$uid": { ".write": "auth != null && auth.uid == $uid" }
      },
      "race": {
        ".indexOn": ["score"],
        "$uid": { ".write": "auth != null && auth.uid == $uid" }
      }
    },
    "rooms": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

---

## 📚 Nội dung học thuật

Toàn bộ tình huống, câu hỏi và giải thích trong game đều dựa trên:

- 📜 **Luật An ninh mạng 2025** — Luật số 116/2025/QH15, có hiệu lực 01/07/2026
- 📋 **Nghị định 13/2023/NĐ-CP** — Bảo vệ dữ liệu cá nhân
- 🏛️ **A05** — Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao (Bộ Công an)

> Nội dung chỉ phục vụ mục đích **học tập và nghiên cứu**.

---

## 👥 Nhóm phát triển

Đồ án môn **An toàn Bảo mật Thông tin**

---

<div align="center">

**🌐 [Chơi ngay tại đây](https://proceed-intl-card-sharing.trycloudflare.com/)**

*CYBER SHIELD — Bảo vệ không gian mạng, áp dụng đúng pháp luật.*

</div>
