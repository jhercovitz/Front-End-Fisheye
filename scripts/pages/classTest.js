class media {
    constructor(id, title, image, likes, date) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.likes = likes;
        this.date = date;
        // const picture = `assets/FishEye_Photos/Sample Photos/Mimi/${image}`
    }

    getMediaInfoDOM() {
        //     const workDiv1 = document.createElement('div');
        //     workDiv1.classList.add("work");
        //     const img = document.createElement('img');
        //     img.setAttribute("src", picture);
        //     const p1 = document.createElement('p');
        //     p1.classList.add("p1");
        //     p1.textContent = title;
        //     const p4 = document.createElement('p');
        //     p4.classList.add('p4');
        //     p4.textContent = likes;
        //     p4.appendChild(heart);
        //     photographWorkDiv.appendChild(workDiv1);
        //     workDiv1.appendChild(img);
        //     workDiv1.appendChild(p1);
        //     workDiv1.appendChild(p4);
        //     return (photographWorkDiv);
        // }
        return `${this.id} ${this.title} ${this.image} ${this.likes} ${this.date}`;
    }
    console.log(media);
    // async function getMedia() {
    //     // Penser à remplacer par les données récupérées dans le json
    //     const media = [{
    //         "id": 95234343,
    //         "photographerId": 243,
    //         "title": "Rainbow Bird",
    //         "image": "Animals_Rainbow.jpg",
    //         "likes": 59,
    //         "date": "2019-07-02"
    //     }, ]
    //     return ({
    //         media: [...media]
    //     });
    // }

    // async function displayPhotographerWork(media) {
    //     media.forEach((media) => {
    //         const workModel = mediaFactory(media);
    //         const mediaInfoDOM = workModel.getMediaInfoDOM();
    //         main.appendChild(mediaInfoDOM);
    //     });
    // };

    // async function WorkInit() {
    //     // Récupère les datas des medias
    //     const { media } = await getMedia();
    //     displayPhotographerWork(media);
    // };