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
    constructor({ title, id, photographerId, image, likes, date, price, firstName, video, likesTotalCount }) {
        this.title = title
        this.id = id
        this.photographerId = photographerId
        this.image = image
        this.video = video
        this.likes = likes
        this.date = date
        this.price = price
        this.firstName = firstName;
        this.likesTotalCount = likesTotalCount;
        this.picture = `assets/FishEye_Photos/Sample Photos/${firstName}/${image}`;
        this.mp4 = `assets/FishEye_Photos/Sample Photos/${firstName}/${video}`;
    }

    getMediaInfoDOM() {
        const photographWorkDiv = document.querySelector(".photograph_work");
        const heart = document.createElement('i');
        heart.classList.add("far", "fa-heart", "increment");
        const workDiv1 = document.createElement('div');
        workDiv1.classList.add("work");

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

        // //INCREMENTATION DES LIKES
        heart.addEventListener("click", () => {
            heart.classList.add("fa", "fa-solid", "fa-heart", "increment");
            this.likes++;
            p4.textContent = this.likes
            p4.appendChild(heart);
            this.likesTotalCount++;
            document.querySelector(".like").textContent = this.likesTotalCount;
            // probleme avec likesTotalCount(NaN)
            console.log(this.likesTotalCount)
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