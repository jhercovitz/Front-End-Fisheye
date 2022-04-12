import { displayModal, closeModal } from "../utils/contactForm.js";
// import Media from "./classTest.js";

const input = document.querySelector("form");
const chevronDown = document.getElementById("chevronDown");
const chevronUp = document.getElementById("chevronUp");
const selectFiltre = document.querySelector('.select_filtre');
const idP1 = document.getElementById("p1");
const idP2 = document.getElementById("p2");
const idP3 = document.getElementById("p3");
const whiteLine1 = document.getElementById("whiteLine1");
const whiteLine2 = document.getElementById("whiteLine2");
const photographWorkDiv = document.querySelector(".photograph_work");
const main = document.querySelector('main');

// RECUPERATION DE L'ID DU PHOTOGRAPHE 
const url = new URL(window.location);
const params = new URLSearchParams(url.search);
const photographerId = Number(params.get("id"));

// RECUPERATION DES DONNEES DU FICHIER JSON
async function getData() {
    const data =
        fetch("/data/photographers.json")
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
    return data
}


// AFFICHAGE DES INFOS PHOTOGRAPHE
function photographerFactory(data) {
    const { name, portrait, city, country, tagline } = data;
    const picture = `assets/FishEye_Photos/Sample Photos/Photographers ID Photos/${portrait}`;

    function getPhotographerInfoDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        const h1 = document.createElement('h1');
        h1.textContent = name;
        const p1 = document.createElement('p');
        p1.classList.add("p1");
        const p2 = document.createElement('p');
        p2.classList.add("p2");
        p1.textContent = String(city) + "," + " " + String(country);
        p2.textContent = tagline;
        article.appendChild(h1);
        article.appendChild(p1);
        article.appendChild(p2);
        document.querySelector('.contact').appendChild(img);
        return (article);
    }
    return { name, picture, getPhotographerInfoDOM };
}

async function displayData(photographer) {
    const header = document.querySelector('.photograph-header');
    const photographerModel = photographerFactory(photographer);
    const photographerInfoDOM = photographerModel.getPhotographerInfoDOM();
    header.appendChild(photographerInfoDOM);
};

async function init() {
    // photographer
    const { photographers, media } = await getData();
    const currentPhotographer = photographers.find((photographer) => photographer.id === photographerId);
    displayData(currentPhotographer);

    // RECUPERER QUE LE PRENOM DU PHOTOGRAPHE
    const splitName = currentPhotographer.name.split(' ');
    const firstName = splitName[0];

    // media
    const currentMedias = media.filter(
        (media) => media.photographerId === photographerId).map(function(media) {
        return {...media, firstName: firstName }
    });
    displayPhotographerWork(currentMedias);

    //INCLURE LE NOM DU PHOTOGRAPHE DANS LE FORM
    function displayNameModal(data) {
        const { name } = data;

        let photographerName = "";
        photographerName =
            photographerName +
            `<h2 id="name">${name}<h2>`;
        document.getElementById("modalHeader").innerHTML += photographerName;
    }
    displayNameModal(currentPhotographer);
};


// AFFICHAGE DES MEDIAS
function mediaFactory(data) {
    let { title, image, likes, video, firstName } = data;
    const picture = `assets/FishEye_Photos/Sample Photos/${firstName}/${image}`;
    const mp4 = `assets/FishEye_Photos/Sample Photos/${firstName}/${video}`;

    const videoMedia = document.createElement('video');

    function getMediaInfoDOM() {
        const heart = document.createElement('i');
        heart.classList.add("far", "fa-heart", "increment");
        const workDiv1 = document.createElement('div');
        workDiv1.classList.add("work");

        const splitImage = picture.split("/");
        const splitVideo = mp4.split("/")
        if (splitImage[4] != undefined) {
            const img = document.createElement('img');
            img.setAttribute("src", picture);
            workDiv1.appendChild(img);
        } else {
            photographWorkDiv.removeChild(workDiv1);
        }
        // if (splitVideo[4] != undefined) {
        //     videoMedia.setAttribute("src", mp4);
        //     videoMedia.setAttribute("controls", "true")
        //     workDiv1.appendChild(videoMedia);
        // } else {
        //     workDiv1.removeChild(videoMedia)
        // }

        const p1 = document.createElement('p');
        p1.classList.add("p1");
        p1.textContent = title;
        const p4 = document.createElement('p');
        p4.classList.add('p4');
        p4.textContent = likes;
        p4.appendChild(heart);
        photographWorkDiv.appendChild(workDiv1);
        workDiv1.appendChild(p1);
        workDiv1.appendChild(p4);

        //INCREMENTATION DES LIKES
        heart.addEventListener("click", (e) => {
            e.stopPropagation();
            heart.classList.add("fa", "fa-solid", "fa-heart", "increment");
            likes++;
            p4.textContent = likes
            p4.appendChild(heart);
            likesTotalCount++;
            document.querySelector(".like").textContent = likesTotalCount;
            console.log(likesTotalCount)
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

    return { title, image, video, likes, getMediaInfoDOM };
}

async function displayPhotographerWork(media) {
    media.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaInfoDOM = mediaModel.getMediaInfoDOM();
        main.appendChild(mediaInfoDOM);
    });
};


// // CONTENU DU TAG
// function tag(data) {
const likes = []
let likesTotalCount = 0;
for (let i = 0; i < likes.length; i++) {
    likesTotalCount += likes[i]
    console.log(likesTotalCount)
}
const tagContain =
    `<p class="like">${likesTotalCount}</p>
<i class="fa fa-solid fa-heart"></i>
<p class="p5">300€ / jour</p>`;
document.querySelector('.tag').innerHTML = tagContain;
// }


// OUVERTURE DU DROPDOWN
// voir mettre des buttons
chevronDown.addEventListener("click", function() {
    selectFiltre.style.height = "170px";
    idP1.style.display = "block";
    idP2.style.display = "block";
    idP3.style.marginTop = "30px";
    whiteLine1.style.display = "block";
    whiteLine2.style.display = "block";
    chevronDown.style.display = "none";
    chevronUp.style.display = "inline";
})

// FERMETURE DROPDOWN
chevronUp.addEventListener("click", function() {
    selectFiltre.style.height = "69px";
    idP1.style.display = "none";
    idP2.style.display = "none";
    idP3.style.marginTop = "18px";
    whiteLine1.style.display = "none";
    whiteLine2.style.display = "none";
    chevronDown.style.display = "inline";
    chevronUp.style.display = "none";
})


// OUVERTURE ET FERMETURE DE LA MODALE
// voir s'il faut changer de fichier 
const button = document.getElementById("button");
button.addEventListener("click", function() {
    document.querySelector('header').style.opacity = "0.6";
    main.style.opacity = "0.6";
    document.querySelector('.select_filtre').style.marginLeft = "0"
    displayModal();
});

const close = document.getElementById("close");
close.addEventListener("click", function() {
    document.querySelector('header').style.opacity = "1";
    main.style.opacity = "1";
    document.querySelector('.select_filtre').style.marginLeft = "90px";
    closeModal();
});

// FERMETURE DU MESSAGE D'ENVOI
const closeConfirm = document.getElementById('close_confirm');
closeConfirm.addEventListener("click", () => {
    closeModal();
    document.querySelector('header').style.opacity = "1";
    main.style.opacity = "1";
    document.getElementById('myForm').style.display = "block"; // ré-ouvre le formulaire au clic
    document.getElementById('modalHeader').style.display = "flex";
    document.getElementById('confirm_submit').style.display = "none"; // empeche la ré-ouverture automatique du message de confirmation
})

// CONSOLE.LOG DES INPUTS
input.addEventListener("input", function(e) {
    const userInput = e.target.value;
    console.log(userInput);
});




init();