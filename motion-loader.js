/* Defer decorative motion until after the page is ready; honor reduced motion. */
(function () {
  "use strict";
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  function addScript(src, done) {
    var script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = done;
    document.head.appendChild(script);
  }
  function loadMotion() {
    addScript("https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js", function () {
      addScript("https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js", function () {
        var script = document.createElement("script");
        script.src = "motion.js";
        script.defer = true;
        document.body.appendChild(script);
      });
    });
  }
  function schedule() {
    if ("requestIdleCallback" in window) window.requestIdleCallback(loadMotion, { timeout: 2500 });
    else window.setTimeout(loadMotion, 1200);
  }
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
})();