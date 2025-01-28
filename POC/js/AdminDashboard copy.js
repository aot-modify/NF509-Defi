document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".menu-item");
  const sections = document.querySelectorAll(".content-section");
  const mainTitle = document.getElementById("main-title");

  // เมนูทั้งหมด (รวมถึง dropdown-item)
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
      const selectedSection = document.getElementById(sectionId);
      if (selectedSection) {
        selectedSection.classList.remove("d-none");
      }

      // Update the title dynamically
      const newTitle = item.getAttribute("data-title");
      mainTitle.textContent = newTitle;
    });
  });

  // คำนึงถึงเมนูภายใน dropdown ด้วย
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  dropdownItems.forEach(item => {
    item.addEventListener("click", (e) => {
      // หยุดการทำงานของลิงค์
      e.preventDefault();
      
      // Remove active class from all dropdown items
      dropdownItems.forEach(menu => menu.classList.remove("active"));
      
      // Add active class to clicked dropdown item
      item.classList.add("active");
      
      // เปลี่ยนแปลงเมนูหลัก (KYC Management) ให้เป็นสีฟ้า
      const dropdownMenu = item.closest(".dropdown");
      const mainKycMenu = dropdownMenu.querySelector("a.dropdown-toggle");
      mainKycMenu.classList.add("active");

      // แสดงเนื้อหาที่เกี่ยวข้อง (ในกรณีนี้คือลิงค์ KYC ที่เลือก)
      const sectionId = item.getAttribute("data-section") + "-section";
      const selectedSection = document.getElementById(sectionId);
      if (selectedSection) {
        selectedSection.classList.remove("d-none");
      }

      // เปลี่ยนชื่อหัวข้อ (เช่น "KYC Management")
      const newTitle = item.getAttribute("data-title");
      mainTitle.textContent = newTitle;
    });
  });
});
