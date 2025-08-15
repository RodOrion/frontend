/** burger **/
let burger = document.querySelector("#burger #check");
let nav = document.querySelector("header nav ul.flexContainer");
burger.addEventListener("click", () => {
  nav.classList.add("enable-transition");
  nav.classList.toggle("active");
});
window.addEventListener("resize", () => {
  nav.classList.remove("enable-transition");
});
/*** heart ***/
let circlesLike = document.querySelectorAll("#essentials .circle");
circlesLike.forEach((e) => {
  e.addEventListener("click", () => {
    e.classList.toggle("active");
  });
});

/** caroussel ++ **/
let next = document.querySelectorAll("#essentials .next");
let prev = document.querySelectorAll("#essentials .prev");
//let caroussel = document.querySelector("#essentials .rack");
let slidesFirstCaroussel = document.querySelectorAll(
  "#essentials .caroussel.first .rack article"
).length;
let slidesSecondCaroussel = document.querySelectorAll(
  "#essentials .caroussel.second .rack article"
).length;
let slideWidth =
  document.querySelector("#essentials .rack article").clientWidth + 10;

window.addEventListener("resize", () => {
  slideWidth =
    document.querySelector("#essentials .rack article").clientWidth + 10;
});

const carouselConfig = {
  first: {
    currentIndex: 0,
    maxSlides: slidesFirstCaroussel - 3,
  },
  second: {
    currentIndex: 0,
    maxSlides: slidesSecondCaroussel - 3,
  },
};

const moveToSlide = (rack, index) => {
  rack.style.transform = `translateX(${-index * slideWidth}px)`;
};

// Fonction générique pour gérer la navigation
function handleCarouselNavigation(button, direction) {
  // Déterminer quel carrousel
  const carouselClasses = button.parentElement.className.split(" ");
  const carouselType = carouselClasses.includes("first") ? "first" : "second";
  const config = carouselConfig[carouselType];

  // Calculer le nouvel index
  const newIndex = config.currentIndex + direction;

  // Vérifier les limites
  const canMove = direction > 0 ? newIndex <= config.maxSlides : newIndex >= 0;

  if (canMove) {
    // Déplacer le carrousel
    config.currentIndex = newIndex;
    const rack = button.parentElement.children[0]; // ou firstElementChild
    moveToSlide(rack, config.currentIndex);

    // Gérer l'état disabled
    button.classList.remove("disabled");
  } else {
    button.classList.add("disabled");
  }

  // gérer l'état du bouton opposé
  updateButton(button, carouselType, config);
}

// Fonction maj état du bouton
function updateButton(currentButton, carouselType, config) {
  const parent = currentButton.parentElement;
  const isNext = currentButton.classList.contains("next"); // ou autre classe
  const oppositeButton = isNext
    ? parent.querySelector(".prev")
    : parent.querySelector(".next");

  if (oppositeButton) {
    // Réactiver le bouton opposé si on n'est plus aux limites
    if (isNext && config.currentIndex > 0) {
      oppositeButton.classList.remove("disabled");
    } else if (!isNext && config.currentIndex < config.maxSlides) {
      oppositeButton.classList.remove("disabled");
    }
  }
}

// Event listeners
next.forEach((n) => {
  n.addEventListener("click", () => {
    handleCarouselNavigation(n, 1);
  });
});

prev.forEach((p) => {
  p.addEventListener("click", () => {
    handleCarouselNavigation(p, -1);
  });
});

// // caroussel non factorisé
// next.forEach( (n) => {
//   n.addEventListener('click', () => {
//       caroussel = n.parentElement.className.split(" ");
//       if(caroussel.includes("first")){
//         if(currentIndexFirst < slidesFirstCaroussel - 3) {
//           n.classList.remove('disabled')
//           currentIndexFirst++;
//           moveToSlide(n.parentElement.children[0], currentIndexFirst);
//         } else {
//           n.classList.add('disabled')
//         }
//       } else {
//         if(currentIndexSecond < slidesSecondCaroussel - 3) {
//           n.classList.remove('disabled')
//           currentIndexSecond++;
//           moveToSlide(n.parentElement.children[0], currentIndexSecond);
//         } else {
//           n.classList.add('disabled')
//         }
//       }

//   });
// })

// prev.forEach( (n) => {
//   n.addEventListener('click', () => {
//       if(currentIndex > 0) {
//         prev.classList.remove('disabled')
//         currentIndex--;
//         moveToSlide(currentIndex);
//       } else {
//         prev.classList.add('disabled')
//       }
//   });
// })
