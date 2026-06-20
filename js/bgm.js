// bgm.js — Trình quản lý nhạc nền sử dụng HTML5 Audio API (chạy local tránh lỗi CORS/Iframe)
const BGM = (() => {
  let audio = null;
  let muted = false;
  let volume = 0.4; // Âm lượng mặc định 40% (HTML5 Audio dùng từ 0.0 đến 1.0)

  function init() {
    // 1. Tạo đối tượng Audio HTML5
    audio = new window.Audio('assets/bgm.m4a');
    audio.loop = true;
    audio.volume = volume;

    // 2. Thiết lập tự động phát sau tương tác đầu tiên của người dùng
    setupAutoPlay();

    // 3. Thiết lập điều khiển UI
    setupUIControls();
  }

  function setupAutoPlay() {
    const startPlay = () => {
      if (audio && !muted) {
        audio.play().catch(err => {
          console.warn("Autoplay blocked by browser policy. Retrying on next gesture.");
        });
      }
      // Gỡ bỏ listener sau khi tương tác thành công
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
            if (audio) audio.pause();
            toggleBtn.innerHTML = '🔇';
            toggleBtn.title = 'Bật Nhạc nền';
            toggleBtn.style.color = 'var(--text-muted)';
          } else {
            if (audio) {
              audio.play().catch(err => console.warn("Play failed:", err));
            }
            toggleBtn.innerHTML = '🎵';
            toggleBtn.title = 'Tắt Nhạc nền';
            toggleBtn.style.color = 'var(--accent)';
          }
        });
      }

      if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
          const val = parseInt(e.target.value);
          volume = val / 100;
          if (audio) {
            audio.volume = volume;
          }
          if (val === 0) {
            toggleBtn.innerHTML = '🔇';
            toggleBtn.style.color = 'var(--text-muted)';
          } else {
            // Tự động bật lại khi kéo thanh âm lượng lớn hơn 0
            if (muted) {
              muted = false;
              if (audio) {
                audio.play().catch(err => console.warn("Play failed:", err));
              }
            }
            toggleBtn.innerHTML = '🎵';
            toggleBtn.style.color = 'var(--accent)';
          }
        });
      }
    });
  }

  return {
    init,
    play() {
      if (audio && !muted) audio.play().catch(e => {});
    },
    pause() {
      if (audio) audio.pause();
    }
  };
})();

// Khởi chạy trình quản lý BGM
BGM.init();
