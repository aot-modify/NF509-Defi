document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".menu-item");
    const sections = document.querySelectorAll(".content-section");
    const mainTitle = document.getElementById("main-title");
  
    menuItems.forEach(item => {
      item.addEventListener("click", () => {
        // Remove active class from all menu items
        menuItems.forEach(menu => menu.classList.remove("active"));
        // Hide all sections
        sections.forEach(section => section.classList.add("d-none"));
  
        // Add active class to clicked menu item
        item.classList.add("active");
        // Show the relevant section
        const sectionId = item.getAttribute("data-section") + "-section";
        document.getElementById(sectionId).classList.remove("d-none");
  
        // Update the title dynamically
        const newTitle = item.getAttribute("data-title");
        mainTitle.textContent = newTitle;
      });
    });
  });
  