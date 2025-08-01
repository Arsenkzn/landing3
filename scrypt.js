document.addEventListener("DOMContentLoaded", function () {
  // Кнопка Twitter (X)
  document.getElementById("twitter-btn").addEventListener("click", function () {
    window.open("https://twitter.com/market98", "_blank");
  });

  // Имитация товаров
  const products = [
    {
      id: 1,
      name: "Nokia 3310",
      price: 1999,
      category: "Техника",
      image: "images/nokia3310.png",
    },
    {
      id: 2,
      name: "Half-Life (CD)",
      price: 899,
      category: "Игры",
      image: "images/halflife.png",
    },
    // Добавьте другие товары
  ];

  const productsGrid = document.getElementById("products-grid");

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.className = "product-item win98-window";
    productElement.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}" width="100">
            <p>${product.price} руб.</p>
            <button class="win98-button">Купить</button>
        `;
    productsGrid.appendChild(productElement);
  });

  // Обновление часов
  function updateClock() {
    const now = new Date();
    const clock = document.querySelector(".clock");
    clock.textContent = now.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  setInterval(updateClock, 1000);
  updateClock();

  // Здесь можно добавить другие функции: звуки, диалоговые окна и т.д.
});
