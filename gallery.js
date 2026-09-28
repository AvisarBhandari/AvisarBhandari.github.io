// Click a gallery image to open it full size.
// Esc or click outside = close. Left/Right arrows (or the buttons) = previous/next.
(function () {
  var imgs = Array.prototype.slice.call(
    document.querySelectorAll(".gallery img"),
  );
  if (!imgs.length) return;
  var box, i;

  function show() {
    var img = imgs[i];
    var fig = img.closest("figure");
    var cap = fig && fig.querySelector("figcaption");
    box.querySelector("img").src = img.src;
    box.querySelector("img").alt = img.alt || "";
    box.querySelector(".lb-cap").textContent = cap ? cap.textContent : "";
  }
  function step(d) {
    i = (i + d + imgs.length) % imgs.length;
    show();
  }
  function close() {
    box.remove();
    box = null;
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onKey);
  }
  function onKey(e) {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
  }
  function open(n) {
    i = n;
    box = document.createElement("div");
    box.className = "lightbox";
    box.innerHTML =
      '<button class="lb-close" aria-label="Close">close ✕</button>' +
      '<button class="lb-prev" aria-label="Previous">‹</button>' +
      '<img alt="">' +
      '<div class="lb-cap"></div>' +
      '<button class="lb-next" aria-label="Next">›</button>';
    box.addEventListener("click", function (e) {
      if (e.target.classList.contains("lb-prev")) step(-1);
      else if (e.target.classList.contains("lb-next")) step(1);
      else if (e.target.tagName !== "IMG") close();
    });
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    document.body.appendChild(box);
    show();
  }
  imgs.forEach(function (img, n) {
    img.addEventListener("click", function () {
      open(n);
    });
  });
})();
