export class ImageMedia {
    /**
     * @param {string} name
     * @param {number} id
     * @param {number} photographerId
     * @param {} image
     * @param {string} tagline
     * @param {number} likes
     * @param {date} date
     * @param {number} price
     */

    constructor(name, id, photographerId, image, tags, likes, date, price) {
        this.name = name
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
        document.getElementById('picture-photographer').innerHTML = `
      <div class="picture-photographer_presentation">
        <div class="wrapper">
        <img class="img-page" src="/img/${this.image}" alt="">
        </div>
        <div class="text-presentation">
          <p>${this.name}</p>
          <div class="price-and-count">
              <p>${this.price}€</p>
              <p class="paddeur">${this.likes} ❤</p>
          </div>
      </div>
  </div>
        `
    }
}