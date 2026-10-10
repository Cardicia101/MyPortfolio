const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");

document.getElementById("year").textContent = new Date().getFullYear();

navToggle.addEventListener("click", () => siteNav.classList.toggle("open"));
siteNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => siteNav.classList.remove("open")));
