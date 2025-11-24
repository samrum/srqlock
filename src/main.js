import Srqlock from "./components/Srqlock";

if (
  document.attachEvent
    ? document.readyState === "complete"
    : document.readyState !== "loading"
) {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}

function init() {
  new Srqlock().init();
}
