document.addEventListener("DOMContentLoaded", function () {
  const windows = document.querySelectorAll(".win98-window");

  windows.forEach((window) => {
    const titleBar = window.querySelector(".title-bar");
    let isDragging = false;
    let offsetX, offsetY;

    titleBar.addEventListener("mousedown", (e) => {
      if (e.target.closest(".window-controls")) return; // Не перетаскивать при клике на кнопки

      isDragging = true;
      offsetX = e.clientX - window.getBoundingClientRect().left;
      offsetY = e.clientY - window.getBoundingClientRect().top;

      window.style.zIndex = 1000; // Поднимаем окно поверх других
      document.body.style.userSelect = "none"; // Отключаем выделение текста при перетаскивании
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;

      window.style.left = `${e.clientX - offsetX}px`;
      window.style.top = `${e.clientY - offsetY}px`;
      window.style.position = "absolute"; // Меняем позиционирование
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      document.body.style.userSelect = "";
    });
  });
  const buyButtons = document.querySelectorAll(".buy-btn");
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");
  const popupYes = document.getElementById("popup-yes");
  const popupNo = document.getElementById("popup-no");
  const popupClose = document.getElementById("popup-close");

  const bgMusic = new Audio("sounds/loopSound.wav");
  bgMusic.loop = true;
  bgMusic.volume = 0.1;
  let isSoundEnabled = false;

  // Активация по первому клику
  document.addEventListener(
    "click",
    function initSound() {
      if (!isSoundEnabled) {
        console.log("Starting background music");
        bgMusic.play().catch((e) => console.error("Music error:", e));
        isSoundEnabled = true;
        document.removeEventListener("click", initSound);
      }
    },
    { once: true }
  );

  buyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Случайное решение - показать сообщение о подтверждении или ошибке
      if (Math.random() > 0.3) {
        popupMessage.textContent = "Are you sure you want to add to cart?";
        popup.style.display = "flex";
      } else {
        popupMessage.textContent = "Error 404: Product sold out!";
        popup.style.display = "flex";
        popupYes.style.display = "none";
        popupNo.style.display = "none";
      }
    });
  });

  function updateClock() {
    const now = new Date();
    const clock = document.querySelector(".clock");
    clock.textContent = now.toLocaleTimeString("en-En", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  setInterval(updateClock, 1000);
  updateClock();

  document.getElementById("refresh-btn").addEventListener("click", function () {
    document.body.classList.add("crash-animation");
    setTimeout(() => {
      document.body.classList.remove("crash-animation");
      setTimeout(() => {
        location.reload();
      }, 500);
    }, 1000);
  });

  // Закрытие попапа
  popupYes.addEventListener("click", function () {
    popup.style.display = "none";
    popupYes.style.display = "";
    popupNo.style.display = "";
  });

  popupNo.addEventListener("click", function () {
    popup.style.display = "none";
    popupYes.style.display = "";
    popupNo.style.display = "";
  });

  popupClose.addEventListener("click", function () {
    popup.style.display = "none";
    popupYes.style.display = "";
    popupNo.style.display = "";
  });

  document.getElementById("popup-yes").addEventListener("click", function () {
    popup.style.display = "none";
    showDownloadDialog();
  });

  function showDownloadDialog() {
    const dialog = document.getElementById("download-dialog");
    const progressBar = document.getElementById("download-progress-bar");
    const progressText = document.getElementById("download-progress-text");
    const filename = `nostalgia_product_${Math.floor(
      Math.random() * 90 + 10
    )}.zip`;

    // Сброс состояния
    progressBar.style.width = "0%";
    progressText.textContent = "0%";
    document.getElementById("download-open").disabled = true;
    document.getElementById("download-save").disabled = true;
    document.getElementById(
      "download-filename"
    ).textContent = `Downloading: ${filename}`;

    dialog.style.display = "flex";

    // Улучшенная анимация прогресса
    let progress = 0;
    const speeds = [5, 8, 12, 7]; // Разные скорости для реалистичности
    let currentSpeed = 0;

    function updateProgress() {
      // Реалистичное поведение с замедлениями/ускорениями
      if (progress > 85 && progress < 95) {
        progress += 0.3; // Замедление в конце
      } else if (progress > 98) {
        progress += 0.1; // Почти остановка
      } else {
        progress += speeds[currentSpeed % speeds.length];
        currentSpeed++;
      }

      // Корректировка значений
      if (progress > 100) progress = 100;

      progressBar.style.width = `${progress}%`;
      progressText.textContent = `${Math.round(progress)}%`;

      // Дрожание в середине (как будто что-то загружается)
      if (progress > 45 && progress < 55 && Math.random() > 0.7) {
        progressBar.style.width = `${progress - 2}%`;
        setTimeout(() => {
          progressBar.style.width = `${progress}%`;
        }, 200);
      }

      if (progress < 100) {
        // Случайные паузы для реалистичности
        if (Math.random() > 0.95) {
          setTimeout(updateProgress, 500);
        } else {
          setTimeout(updateProgress, 100 + Math.random() * 100);
        }
      } else {
        // Завершение
        document.getElementById("download-open").disabled = false;
        document.getElementById("download-save").disabled = false;

        // Мигание при завершении (как в IE)
        let blinkCount = 0;
        const blinkInterval = setInterval(() => {
          progressBar.style.backgroundColor =
            blinkCount % 2 ? "#000080" : "#1084d0";
          blinkCount++;
          if (blinkCount > 3) {
            clearInterval(blinkInterval);
            progressBar.style.backgroundColor = "#000080";
          }
        }, 150);
      }
    }

    // Начинаем с небольшой задержки (как будто сервер обрабатывает запрос)
    setTimeout(() => {
      updateProgress();
    }, 1000);

    // Обработчики кнопок (остаются как в предыдущем коде)
    document.getElementById("download-open").onclick = function () {
      alert(
        "This file does not have a program associated with it...\n\nPlease install a program to open this file."
      );
      if (document.getElementById("download-close-checkbox").checked) {
        dialog.style.display = "none";
      }
    };

    document.getElementById("download-save").onclick = function () {
      // Добавляем звуковой эффект сохранения (если нужно)
      const saveSound = new Audio("sounds/mouse.mp3");
      saveSound.volume = 1;

      saveSound.play().catch((e) => {});

      alert(`File saved to C:\\My Documents\\${filename}`);
      if (document.getElementById("download-close-checkbox").checked) {
        dialog.style.display = "none";
      }
    };

    document.getElementById("download-cancel").onclick =
      document.getElementById("download-close").onclick = function () {
        dialog.style.display = "none";
      };
  }
});
