export class Photographer {
    constructor({ name, portrait, city, country, tagline }) {
        this.name = name;
        this.portrait = portrait;
        this.city = city;
        this.country = country;
        this.tagline = tagline;
        this.picture = `assets/FishEye_Photos/Sample Photos/Photographers ID Photos/${portrait}`;
    }

    getPhotographerInfoDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", this.picture);
        const h1 = document.createElement('h1');
        h1.textContent = this.name;
        const p1 = document.createElement('p');
        p1.classList.add("p1");
        const p2 = document.createElement('p');
        p2.classList.add("p2");
        p1.textContent = String(this.city) + "," + " " + String(this.country);
        p2.textContent = this.tagline;
        article.appendChild(h1);
        article.appendChild(p1);
        article.appendChild(p2);
        document.querySelector('.contact').appendChild(img);
        return (article);
    }
}


export class Media {
    constructor({ title, id, photographerId, image, likes, date, price, firstName, video }) {
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
        this.incrementLikes = this.incrementLikes.bind(this);
    }

    incrementLikes() {
        this.heart.classList.add("fa", "fa-solid", "fa-heart", "increment");
        this.likes++;
        this.p4.textContent = this.likes
        this.p4.appendChild(this.heart);
        const likeDomList = [...document.querySelectorAll("p.p4")];
        let sum = 0;
        likeDomList.forEach((likeDom) => {
            sum = sum + Number(likeDom.textContent);
        })
        document.querySelector(".like").textContent = sum;
    }

    getMediaInfoDOM() {
        const photographWorkDiv = document.querySelector(".photograph_work");
        this.heart = document.createElement('i');
        this.heart.classList.add("far", "fa-heart", "increment");
        const workDiv1 = document.createElement('div');
        workDiv1.classList.add("work");

        if (this.image) {
            const img = document.createElement('img');
            img.setAttribute("src", this.picture);
            img.setAttribute("alt", 'image')
            img.classList.add("img_and_video")
            img.setAttribute("tabindex", "0")
            workDiv1.appendChild(img);
        } else {
            const videoMedia = document.createElement('video');
            videoMedia.setAttribute("src", this.mp4);
            videoMedia.setAttribute("alt", 'video')
            videoMedia.classList.add("img_and_video")
            videoMedia.setAttribute("controls", "true")
            workDiv1.appendChild(videoMedia);
        }

        const p1 = document.createElement('p');
        p1.classList.add("p1");
        p1.textContent = this.title;
        this.p4 = document.createElement('p');
        this.p4.classList.add('p4');
        this.p4.textContent = this.likes;
        this.heart.setAttribute("tabindex", "0");
        this.p4.appendChild(this.heart);
        photographWorkDiv.appendChild(workDiv1);
        workDiv1.appendChild(p1);
        workDiv1.appendChild(this.p4);

        // //INCREMENTATION DES LIKES
        this.heart.addEventListener("click", this.incrementLikes)

        this.heart.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                this.incrementLikes()
            }
        });
        // voir removeEventListener
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