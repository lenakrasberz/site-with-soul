//Heder
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper } from "swiper";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
AOS.init();

const images = document.querySelectorAll(".hero__image");
let current = 0;
const INTERVAL_MS = 4000; // 4 секунды между слайдами

function showNextImage() {
  images.forEach((img) => img.classList.remove("visible"));
  images[current].classList.add("visible");
  current = (current + 1) % images.length;
}

if (images.length) {
  showNextImage();
  setInterval(showNextImage, INTERVAL_MS);
}

//Modal header

const headerBtn = document.querySelector(".hero__btn");
const headerModal = document.querySelector("#modal");
const closeModal = document.querySelector("#closeBtn");
const overlay = document.querySelector(".modal__overlay");

headerBtn.addEventListener("click", () => {
  headerModal.classList.add("active");
});

closeModal.addEventListener("click", () => {
  headerModal.classList.remove("active");
});
overlay.addEventListener("click", () => {
  headerModal.classList.remove("active");
});

//Modal header-order

const modalOrderBtn = document.querySelector(".form__btn-order");
const modalOrder = document.querySelector("#modal-order");
const closeModalBtn = document.querySelector("#closeOrderBtn");
const overlayOrder = document.querySelector(".modal__overlay-order");
const sidebar = document.querySelector(".sidebar");
const servicesList = document.querySelector(".services__list");

modalOrderBtn.addEventListener("click", () => {
  if (["#landing"].includes(location.hash)) {
    location.hash = "services";
  }
  modalOrder.classList.add("active");
});

closeModalBtn.addEventListener("click", () => {
  modalOrder.classList.remove("active");
});
overlayOrder.addEventListener("click", () => {
  modalOrder.classList.remove("active");
});

//TAB

const tabHeaders = document.querySelectorAll(".list-group-item");
const contentBoxes = document.querySelectorAll("[data-tab-content]");

tabHeaders.forEach(function (item) {
  item.addEventListener("click", function () {
    // Убираем active у всех кнопок
    tabHeaders.forEach((btn) => btn.classList.remove("active"));

    // Делаем активной нажатую кнопку
    this.classList.add("active");

    // Скрываем все contentBox
    contentBoxes.forEach(function (box) {
      box.classList.add("hidden");
    });

    // Показываем нужный contentBox
    const contentBox = document.querySelector("#" + this.dataset.tab);
    contentBox.classList.remove("hidden");
  });
});

//Swiper

document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".mySwiper", {
    modules: [Pagination, Navigation],
    slidesPerView: 1.5,
    spaceBetween: 20,
    centeredSlides: false,
    loop: false,
    speed: 3000,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      slideChange: () => {
        updateProgress(swiper);
      },
    },
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },

    breakpoints: {
      320: { slidesPerView: 1.1 },
      480: { slidesPerView: 1.2 },
      768: { slidesPerView: 1.5 },
      1024: { slidesPerView: 2.5 },
      1280: { slidesPerView: 4.5 },
    },
  });
});
const progressFill = document.querySelector(".custom-progressbar-fill");

function updateProgress(swiper) {
  const trackWidth = document.querySelector(".custom-progressbar").offsetWidth;
  const maxTranslate = trackWidth - progressFill.offsetWidth;

  // swiper.progress идет от 0 (первый слайд) до 1 (последний)
  progressFill.style.transform = `translateX(${
    swiper.progress * maxTranslate
  }px)`;
}

//Карточка портфолио, переворот

document.querySelectorAll(".portfolio__card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("is-flipped");
  });
});

//FAQ

const items = document.querySelectorAll(".faq__accordeon-item");

items.forEach((item) => {
  const header = item.querySelector(".faq__accordeon-header");
  const content = item.querySelector(".faq__accordeon-content");
  const icon = item.querySelector(".faq__accordeon-icon");

  header.addEventListener("click", () => {
    const isActive = content.classList.contains("active");

    // Закрываем все
    items.forEach((el) => {
      el.querySelector(".faq__accordeon-content").classList.remove("active");
      el.querySelector(".faq__accordeon-icon").classList.remove("active");
      el.querySelector(".faq__accordeon-content").style.maxHeight = null;
    });

    // Если не был активен — открываем
    if (!isActive) {
      content.classList.add("active");
      icon.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

//Year footer

(function () {
  const el = document.querySelector(".footer__txt");
  if (!el) return;

  const now = new Date();
  const year = now.getFullYear();
  el.textContent = el.textContent.replace(/\b\d{4}\b/, year);
})();
//Burger

const burger = document.querySelector(".burger");
const burgerMenu = document.querySelector(".burger__menu");
const closeBtn = document.querySelector(".burger__menu-close");
const burgerLinks = document.querySelectorAll(".burger__menu a");

burger.addEventListener("click", function () {
  burgerMenu.classList.add("burger__menu-active");
  document.body.style.overflow = "hidden";
});
closeBtn.addEventListener("click", function () {
  burgerMenu.classList.remove("burger__menu-active");
  document.body.style.overflow = "";
});
burgerLinks.forEach((link) => {
  link.addEventListener("click", () => {
    burgerMenu.classList.remove("burger__menu-active");
    document.body.style.overflow = "";
  });
});

//Adaptive servises >1200

const sidebar2 = document.getElementById("landing");
const serviceLinks = document.querySelectorAll(".services__link");
const serviceTitle = document.querySelector(".services__title");
const serviceContent = document.querySelector(".services__content");
const serviceList = document.querySelector(".services__list");
const containerServices = document.querySelector(".container__services");
const closeBtns = [
  document.querySelector(".close__btn"),
  document.querySelector(".form__btn-order"),
];
// функция открытия
function openSidebar() {
  sidebar2.classList.add("active");
  containerServices.classList.add("sidebar-open");

  if (window.innerWidth < 1200) {
    // небольшая задержка, чтобы анимация не дёргалась
    setTimeout(() => {
      serviceTitle.style.opacity = "0";
      serviceContent.style.opacity = "0";
      serviceList.style.opacity = "0";
    }, 200);
  }
}

// функция закрытия
function closeSidebar() {
  sidebar2.classList.remove("active");
  containerServices.classList.remove("sidebar-open");

  // плавное возвращение
  if (window.innerWidth < 1200) {
    setTimeout(() => {
      serviceTitle.style.opacity = "1";
      serviceContent.style.opacity = "1";
      serviceList.style.opacity = "1";
    }, 300);
  }
}

// открытие по клику
serviceLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // чтобы страница не прыгала
    openSidebar();
  });
});

// закрытие по кнопке
closeBtns.forEach((btn) => btn.addEventListener("click", closeSidebar));
