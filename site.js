// Clock Out Books - tiny progressive enhancement. The site works without this file.
(function () {
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  var form = document.getElementById("review-form");
  if (!form || !window.fetch || !window.FormData) return;
  // Until the real endpoint is filled in, let the browser do a normal post.
  if (form.getAttribute("action").indexOf("{{") === 0) return;

  var status = document.getElementById("form-status");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    btn.textContent = "Sending...";
    status.className = "form-status";
    status.textContent = "";
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    }).then(function (r) {
      if (!r.ok) throw new Error("bad status");
      window.location.href = "/thanks.html";
    }).catch(function () {
      btn.disabled = false;
      btn.textContent = "Request my free books review";
      status.className = "form-status err";
      status.textContent = "That didn't go through. Please try again, or email us directly.";
    });
  });
})();
