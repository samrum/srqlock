import fetchUrl from "@components/AjaxHelper";

export default class Giphy {
  constructor() {
    this.apiKey = "LmjnOE0NApPbHRthjEwnK1oTnXJtX422";
  }

  getGiphy() {
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${
      this.apiKey
    }&rating=g&tag=prfm`;
    const options = {
      accept: "image/*",
    };

    return new Promise((resolve, reject) => {
      fetchUrl(url, options)
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }
}
