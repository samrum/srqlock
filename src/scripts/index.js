import Srqlock from "@components/Srqlock";
import "@styles/index.scss";

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

if (module.hot) {
  module.hot.accept("@components/Srqlock", () => {
    srqlock.tearDown();
    srqlock = new Srqlock();
    srqlock.init();
  });
}
