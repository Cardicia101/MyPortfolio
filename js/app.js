const modal = document.getElementById("contactModal");
const openButton = document.getElementById("openContact");
const closeButton = document.getElementById("closeContact");
const form = document.getElementById("contactForm");
const statusBox = document.getElementById("formStatus");
const submitButton = document.getElementById("submitContact");
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");

document.getElementById("year").textContent = new Date().getFullYear();

function openModal() {
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setTimeout(() => modal.querySelector("input")?.focus(), 100);
}
function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}
openButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && modal.classList.contains("show")) closeModal(); });
navToggle.addEventListener("click", () => siteNav.classList.toggle("open"));
siteNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => siteNav.classList.remove("open")));

form.addEventListener("submit", (event) => {
  event.preventDefault();
  submitButton.disabled = true;
  submitButton.innerHTML = "Saving…";
  statusBox.className = "form-status";

  const message = Object.fromEntries(new FormData(form).entries());
  message.id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
  message.createdAt = new Date().toISOString();

  const saved = JSON.parse(localStorage.getItem("cardiciaContactMessages") || "[]");
  saved.push(message);
  localStorage.setItem("cardiciaContactMessages", JSON.stringify(saved));

  statusBox.className = "form-status success";
  statusBox.textContent = "Message saved successfully on this device.";
  form.reset();

  setTimeout(() => {
    submitButton.disabled = false;
    submitButton.innerHTML = "Save Message <span>↗</span>";
  }, 500);

  setTimeout(closeModal, 1800);
});
