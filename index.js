document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search-button");
  
  if (searchButton) {
    searchButton.addEventListener("click", function () {
      const searchInput = document.getElementById("search-input");
      if (!searchInput) return;
      
      const searchTerm = searchInput.value.toLowerCase();
      const elements = document.getElementsByTagName("p");
      
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].textContent.toLowerCase().includes(searchTerm)) {
          elements[i].scrollIntoView({ behavior: "smooth", block: "start" });
          break;
        }
      }
    });
  }

  // Helper function for smooth scrolling (if needed elsewhere)
  window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
});
