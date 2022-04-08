export class Media {
    /**
     * @param {string} name
     * @param {number} id
     * @param {number} photographerId
     * @param {image} image
     * @param {video} video
     * @param {number} likes
     * @param {date} date
     * @param {number} price
     */

    constructor(title, id, photographerId, image, likes, date, price) {
        this.title = title
        this.id = id
        this.photographerId = photographerId
        this.image = image
        this.video = video
        this.likes = likes
        this.date = date
        this.price = price
    }

    createImageHTML() {
        document.getElementById('photograph_work').innerHTML = `
      <div class="work">
        <img class="img-page" src="/img/${this.image}" alt="">
          <p class="p1">${this.title}</p>
              <p class="paddeur">${this.likes} ❤</p>
      </div>
        `
    }



    createVideoHTML() {
        document.getElementById('photograph_work').innerHTML = `
  <div class="work">
    <img class="img-page" src="/video/${this.video}" alt="">
      <p class="p1">${this.title}</p>
          <p class="paddeur">${this.likes} ❤</p>
  </div>
    `
    }
}