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

    constructor({ title, id, photographerId, image, likes, date, price }) {
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

export class TestMedia {
    constructor(title, id, photographerId, image, likes, date, price, firstName, video) {
        this.title = title
        this.id = id
        this.photographerId = photographerId
        this.image = image
        this.video = video
        this.likes = likes
        this.date = date
        this.price = price
        this.firstName = firstName;
        this.picture = `assets/FishEye_Photos/Sample Photos/${firstName}/${image}`;
        this.mp4 = `assets/FishEye_Photos/Sample Photos/${firstName}/${video}`;
    }




    getMediaInfoDOM() {
        const heart = document.createElement('i');
        heart.classList.add("far", "fa-heart", "increment");
        const workDiv1 = document.createElement('div');
        workDiv1.classList.add("work");

        // const splitImage = image.split(".");
        // const splitVideo = mp4.split("/")
        if (this.image) {
            const img = document.createElement('img');
            img.setAttribute("src", this.picture);
            workDiv1.appendChild(img);
        } else {
            const videoMedia = document.createElement('video');
            videoMedia.setAttribute("src", this.mp4);
            videoMedia.setAttribute("controls", "true")
            workDiv1.appendChild(videoMedia);
        }

        const p1 = document.createElement('p');
        p1.classList.add("p1");
        p1.textContent = this.title;
        const p4 = document.createElement('p');
        p4.classList.add('p4');
        p4.textContent = this.likes;
        p4.appendChild(heart);
        photographWorkDiv.appendChild(workDiv1);
        workDiv1.appendChild(p1);
        workDiv1.appendChild(p4);

        //INCREMENTATION DES LIKES
        heart.addEventListener("click", (e) => {
            e.stopPropagation();
            heart.classList.add("fa", "fa-solid", "fa-heart", "increment");
            this.likes++;
            p4.textContent = this.likes
            p4.appendChild(heart);
            // likesTotalCount++;
            // document.querySelector(".like").textContent = likesTotalCount;
            // console.log(likesTotalCount)
        });
        //DECREMENTATION DES LIKES
        // heart.addEventListener("click", () => {
        //     heart.classList.add("far", "fa-heart", "decrement");
        //     likes--;
        //     p4.innerHTML = likes
        //     p4.appendChild(heart);
        //     likesTotalCount--;
        //     document.querySelector(".like").innerHTML = likesTotalCount;

        //     console.log(likesTotalCount)
        // });
        return (photographWorkDiv);
    }

}