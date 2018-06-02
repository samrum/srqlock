import fetchUrl from './AjaxHelper';

export default class Giphy
{
    constructor()
    {
        this.apiKey = 'LmjnOE0NApPbHRthjEwnK1oTnXJtX422';
    }

    getGiphy()
    {
        const url = `https://api.giphy.com/v1/gifs/random?api_key=${this.apiKey}&rating=g&tag=jpop%20perfume`;
        const options = {
            accept: 'image/*',
        };

        return new Promise((resolve, reject) =>
        {
            fetchUrl(url, options)
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    }
}
