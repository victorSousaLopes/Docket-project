class Api {

    constructor() {
        this.url = 'https://picsum.photos/v2/list';
    }

    //  Request with fetch
    async fetchApi() {
         try {
            await fetch(`${this.url}`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw Error(`Bad request ${response.status}`)
                    }
                })
                .then(json => json.forEach(each => {
                     const imgCarousel = `<div class="slide">
                    <img src="${each.download_url}" height="100" width="250" alt="" />
                    </div>`
                    $(imgCarousel).appendTo("#slide-track");
                })
                )
        } catch (error) {
            console.log('Err fecth request', error);
        }
    }

    //To make requests with jquery
    //Create an instance of this object outside the DOM event pre-loaded because this file not loaded yet
    jqueryApi() {
       
        try {
            return $.get(`${this.url}`).done((data) => {
                data.forEach(each => {
                    const imgCarousel = `<div class="slide">
                    <img src="${each.download_url}" height="100" width="250" alt="" />
                    </div>`
                    $(imgCarousel).appendTo("#slide-track");
                }
                )
            });
        } catch (error) {
            console.log('Err jquery request', error);

        }
    }
}
