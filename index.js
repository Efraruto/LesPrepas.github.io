document.getElementById("search-button").addEventListener("click", function () {
  var searchTerm = document.getElementById("search-input").value.toLowerCase();
  var elements = document.getElementsByTagName("p");
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].textContent.toLowerCase().includes(searchTerm)) {
      elements[i].scrollIntoView({ behavior: "smooth", block: "start" });
      break;
    }
  }
});
// Récupérer les éléments HTML nécessaires
// const searchForm = document.getElementById("searchForm");
// const searchInput = document.getElementById("searchInput");
// const searchResults = document.getElementById("searchResults");

// // Ajouter un écouteur d'événement lors de la soumission du formulaire
// searchForm.addEventListener("submit", function (event) {
//   event.preventDefault(); // Empêcher le rechargement de la page

//   // Récupérer le mot recherché depuis l'input
//   const searchTerm = searchInput.value.trim().toLowerCase();

//   // Réinitialiser les résultats de la recherche précédente
//   searchResults.innerHTML = "";

//   // Parcourir tous les éléments div de la page
//   const allDivs = document.getElementsByTagName("div");
//   for (let i = 0; i < allDivs.length; i++) {
//     const div = allDivs[i];
//     const divText = div.textContent.trim().toLowerCase();

//     // Vérifier si le texte du div contient le mot recherché
//     if (divText.includes(searchTerm)) {
//       // Créer un nouvel élément <p> pour afficher le texte du div correspondant
//       const result = document.createElement("p");
//       result.textContent = divText;

//       // Ajouter le résultat à la div des résultats de recherche
//       searchResults.appendChild(result);
//     }
//   }
// });

function scrollToTop() {
  // Obtenez la position actuelle du scroll vertical
  var currentPosition =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;

  // Définir la position à laquelle vous voulez faire défiler lentement vers le haut
  var targetPosition = 0;

  // Calculer la distance totale du défilement
  var distance = targetPosition - currentPosition;

  // Définir la durée totale du défilement (en millisecondes)
  var duration = 1100; // 1 seconde

  // Définir l'incrément de déplacement à chaque intervalle de temps
  var increment = 20;

  // Calculer le déplacement à effectuer à chaque intervalle de temps
  var scrollStep = Math.PI / (duration / increment);

  // Définir une fonction pour effectuer le défilement progressif
  var scrollInterval = setInterval(function () {
    // Calculer la nouvelle position du défilement
    currentPosition += distance * Math.sin(scrollStep);

    // Faire défiler la page vers la nouvelle position
    window.scrollTo(0, currentPosition);

    // Vérifier si la position cible a été atteinte
    if (currentPosition <= targetPosition) {
      // Arrêter l'intervalle de défilement
      clearInterval(scrollInterval);
    }
  }, increment);
}

// Obtenez le chemin de la page actuelle
var currentPath = window.location.pathname;

// Sélectionnez tous les liens avec l'ID "lien"
var navLinks = document.querySelectorAll("#lien"); // Sélectionnez tous les liens avec l'ID "lien"
for (var i = 0; i < navLinks.length; i++) {
  if (navLinks[i].getAttribute("href") === currentPath) {
    navLinks[i].setAttribute("lien", "active"); // Remplacez l'ID "lien" par "active" pour le lien actif
  }
}

/*!
 * Start Bootstrap - Business Casual v7.0.9 (https://startbootstrap.com/theme/business-casual)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-business-casual/blob/master/LICENSE)
 */
// Highlights current date on contact page
window.addEventListener("DOMContentLoaded", (event) => {
  const listHoursArray = document.body.querySelectorAll(".list-hours li");
  listHoursArray[new Date().getDay()].classList.add("today");
});
