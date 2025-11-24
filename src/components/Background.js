import RenderElement from "./RenderElement";
import Giphy from "./Giphy";

export default class Background extends RenderElement {
  constructor() {
    super();
    this.giphy = new Giphy();
  }

  init(renderElement) {
    super.init(renderElement);
    this.featuredContent = document.getElementById("featuredContent");
    this.featuredVideo = document.getElementById("featuredVideo");
  }

  reset() {
    this.hideFeaturedContent();
    super.reset();
  }

  render(options) {
    if (options.hideFeaturedContent) {
      this.hideFeaturedContent();
      // this.giphy
      //   .getGiphy()
      //   .then((data) => {
      //     this.featuredVideo.src = data.data.image_mp4_url;
      //   })
      //   .catch((error) => console.error(error));
    }

    if (options.showFeaturedContent) {
      this.showFeaturedContent();
      this.renderHide(options);
    } else if (options.isNight) {
      this.renderStatic(options);
    } else {
      this.renderAnimated(options);
    }

    super.render(options);
  }

  renderStatic(options) {
    this.element.style.backgroundColor =
      options.displayProperties.backgroundColor;
    super.renderStatic(options);
  }

  hideFeaturedContent() {
    this.featuredContent.style.display = "none";
  }

  showFeaturedContent() {
    this.featuredContent.style.display = "flex";
  }
}
