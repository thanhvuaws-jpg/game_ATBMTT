// bgm.js — Trình quản lý nhạc nền sử dụng YouTube IFrame API để stream nhạc của người dùng
const BGM = (() => {
  let player = null;
  let muted = false;
  let volume = 40; // Âm lượng mặc định 40%

  // Khởi tạo và chèn API YouTube
  function init() {
    // 1. Chèn container ẩn cho YouTube Player
    const playerContainer = document.createElement('div');
    playerContainer.id = 'bgm-player-container';
    playerContainer.style.position = 'absolute';
    playerContainer.style.width = '0';
    playerContainer.style.height = '0';
    playerContainer.style.left = '-9999px';
    playerContainer.style.top = '-9999px';
    playerContainer.innerHTML = '<div id="bgm-player"></div>';
    document.body.appendChild(playerContainer);

    // 2. Tải API YouTube
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Đăng ký callback toàn cục cho YouTube API
    window.onYouTubeIframeAPIReady = () => {
      player = new YT.Player('bgm-player', {
        height: '0',
        width: '0',
        videoId: '1vviWhYvmXo',
        playerVars: {
          'autoplay': 1,
          'loop': 1,
          'playlist': '1vviWhYvmXo',
          'controls': 0,
          'showinfo': 0,
          'rel': 0,
          'enablejsapi': 1,
          'origin': window.location.origin
        },
        events: {
          'onReady': (event) => {
            event.target.setVolume(volume);
            setupAutoPlay();
          },
          'onStateChange': (event) => {
            // Đảm bảo bài hát tự động lặp lại
            if (event.data === YT.PlayerState.ENDED) {
              player.playVideo();
            }
          }
        }
      });
    };

    // 3. Đăng ký sự kiện điều khiển UI
    setupUIControls();
  }

  function setupAutoPlay() {
    // Để tuân thủ chính sách autoplay của trình duyệt, nhạc sẽ tự động phát sau lượt tương tác đầu tiên của người dùng
    const startPlay = () => {
      if (player && typeof player.playVideo === 'function' && !muted) {
        player.playVideo();
      }
      document.removeEventListener('click', startPlay);
      document.removeEventListener('keydown', startPlay);
    };
    document.addEventListener('click', startPlay);
    document.addEventListener('keydown', startPlay);
  }

  function setupUIControls() {
    document.addEventListener('DOMContentLoaded', () => {
      const toggleBtn = document.getElementById('btn-bgm-toggle');
      const volumeSlider = document.getElementById('slider-bgm-volume');

      if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          muted = !muted;
          if (muted) {
            if (player && typeof player.pauseVideo === 'function') player.pauseVideo();
            toggleBtn.innerHTML = '🔇';
            toggleBtn.title = 'Bật Nhạc nền';
            toggleBtn.style.color = 'var(--text-muted)';
          } else {
            if (player && typeof player.playVideo === 'function') player.playVideo();
            toggleBtn.innerHTML = '🎵';
            toggleBtn.title = 'Tắt Nhạc nền';
            toggleBtn.style.color = 'var(--accent)';
          }
        });
      }

      if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
          volume = parseInt(e.target.value);
          if (player && typeof player.setVolume === 'function') {
            player.setVolume(volume);
          }
          if (volume === 0) {
            toggleBtn.innerHTML = '🔇';
            toggleBtn.style.color = 'var(--text-muted)';
          } else if (muted) {
            // Tự động bật lại khi kéo thanh âm lượng lớn hơn 0
            muted = false;
            if (player && typeof player.playVideo === 'function') player.playVideo();
            toggleBtn.innerHTML = '🎵';
            toggleBtn.style.color = 'var(--accent)';
          }
        });
      }
    });
  }

  return {
    init
  };
})();

// Khởi chạy trình quản lý BGM
BGM.init();
