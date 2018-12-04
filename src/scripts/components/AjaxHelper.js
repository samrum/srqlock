export default function fetchUrl(url, options = {}) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: new Headers(options),
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response.json();
      })
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}
