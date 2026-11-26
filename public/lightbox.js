const dialog = document.querySelector("#lightbox");
const image = document.querySelector("#lightbox-img");
const caption = document.querySelector("#lightbox-caption");
const links = [...document.querySelectorAll("#gallery .shot")];

if (dialog && image && caption && links.length) {
  let index = 0;
  const show = (next) => {
    index = (next + links.length) % links.length;
    const link = links[index];
    image.src = link.dataset.full || link.href;
    image.alt = link.dataset.caption || "Enlarged reference photograph";
    caption.textContent = link.dataset.caption || "";
  };
  links.forEach((link, linkIndex) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      show(linkIndex);
      dialog.showModal();
    });
  });
  dialog.querySelector("[data-close]")?.addEventListener("click", () => dialog.close());
  dialog.querySelector("[data-prev]")?.addEventListener("click", () => show(index - 1));
  dialog.querySelector("[data-next]")?.addEventListener("click", () => show(index + 1));
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") show(index + 1);
    if (event.key === "ArrowLeft") show(index - 1);
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}
