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