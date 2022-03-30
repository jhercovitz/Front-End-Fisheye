export class ImageMedia {
    /**
     * @param {string} name
     * @param {number} id
     * @param {number} photographerId
     * @param {image} image
     * @param {string} tagline
     * @param {number} likes
     * @param {date} date
     * @param {number} price
     */

    constructor(title, id, photographerId, image, tags, likes, date, price) {
        this.title = title
        this.id = id
        this.photographerId = photographerId
        this.image = image
        this.tags = tags
        this.likes = likes
        this.date = date
        this.price = price
        console.log(this.name);
    }

    createHTML() {
        document.getElementById('photograph_work').innerHTML = `
      <div class="work">
        <img class="img-page" src="/img/${this.image}" alt="">
          <p class="p1">${this.title}</p>
              <p class="paddeur">${this.likes} ❤</p>
      </div>
        `
    }
}



//// PHOTOGRAPH'S PROFILE CLASS
// A page displaying an user's profile, need to be called with an ID attribute
export class UserPage extends HTMLElement {
    constructor() {
        // an ID attribute is needed
        super();
        // get the user Data
        this.data = this.getUserData(this.id);
    }

    connectedCallback() {
        const template = document.createElement('template');
        template.innerHTML = `
        <div class="max-w-screen-xl w-full h-10 lg:h-20 mx-auto mb-8">
            <fisheye-logo></fisheye-logo>
        </div>
        <main id="content" class="max-w-screen-xl w-full mx-auto">
            <photographer-profile></photographer-profile>
            <medias-select></medias-select>
            <photographer-medias></photographer-medias>
            <photographer-infos></photographer-infos>
        </main>
        <contact-modal></contact-modal>
        <media-lightbox></media-lightbox>
    `;
        this.appendChild(template.content);
        this.render();
        // change the page title
        document.title = this.data.name + " - Fisheye";
    }

    /**
     * display an error if the user ID is invalid
     */
    render() {
        if (!this.data) {
            this.querySelector('photographer-profile').remove();
            this.querySelector("main").insertAdjacentHTML('afterBegin',
                "<p>L'ID que vous recherchez est invalide ou le compte a été supprimé.</p>");
            this.querySelector("main").insertAdjacentHTML('afterBegin',
                "<h3>Cet utilisateur n'existe pas 🕵️</h3>");
        }
    }

    /**
     * From an ID return a JS object with all the user's data from the JSON
     * @param {integer} id - id of the user
     * @returns {object} - all the user data
     */
    getUserData(id) {
        // return the photograpbeel Bradfordher in the JSON whose ID match the requested ID
        return data.photographers.find(user => user.id == id);
    }
}

// Import data from the JSON
import data from '../assets/data/FishEyeDataFR.json'