import { displayModal, closeModal, focusInModal } from "../utils/contactForm.js";
import { Photographer, Media } from "/scripts/utils/class.js";
import { Lightbox } from "../Lightbox/lightbox.js";

const input = document.querySelector("form");
const main = document.querySelector('main');
let likesTotalCount = 0;

let mediaList = [];



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
async function displayData(photographer) {
    const header = document.querySelector('.photograph-header');
    const photographerModel = new Photographer(photographer)
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
    // sortMediaByDefault(currentMedias);
    displayPhotographerWork(currentMedias);
    sortMediaByLikes(mediaList);
    sortMediaByDate(mediaList);
    sortMediaByTitle(mediaList);
    Lightbox.init();


    // AFFICHAGE DU CONTENU TAG
    for (let i = 0; i < currentMedias.length; i++) {
        likesTotalCount += currentMedias[i].likes;
    }
    displayTotalLike(likesTotalCount)
    displayPrice(currentPhotographer.price)

    displayNameModal(currentPhotographer);
};


// AFFICHAGE DES MEDIAS
async function displayPhotographerWork(media) {
    document.querySelector(".photograph_work").innerHTML = "";
    media.forEach((media) => {
        const mediaModel = new Media(media)
        mediaList.push(mediaModel);
        const mediaInfoDOM = mediaModel.getMediaInfoDOM();
        main.appendChild(mediaInfoDOM);
    });
};


// TRI DES MEDIAS
function sortMediaByDefault(data) {
    const sortByLikes = data;
    for (let i = 0; i < sortByLikes.length; i++) {
        const likes = sortByLikes[i].likes
        sortByLikes.sort((a, b) => a.likes - b.likes);
    }
}

function sortMediaByLikes(data) {
    const sortByLikes = data;
    document.getElementById("filtres").addEventListener("change", (e) => {
        if (e.target.value === "popularité") {
            for (let i = 0; i < sortByLikes.length; i++) {
                const likes = sortByLikes[i].likes;
                sortByLikes.sort((a, b) => a.likes - b.likes);
            }
        }
        displayPhotographerWork(data);
    })
}

function sortMediaByDate(data) {
    const sortByDate = data
    document.querySelector("select").addEventListener("change", (e) => {
        if (e.target.value === "date") {
            for (let i = 0; i < sortByDate.length; i++) {
                const date = sortByDate[i].date;
                sortByDate.sort((a, b) => a.date.localeCompare(b.date));
            }
        }
        displayPhotographerWork(data);
    })
}

function sortMediaByTitle(data) {
    const sortByTitle = data;
    document.getElementById("filtres").addEventListener("change", (e) => {
        if (e.target.value === "titre") {
            for (let i = 0; i < sortByTitle.length; i++) {
                const title = sortByTitle[i].title;
                sortByTitle.sort((a, b) => a.title.localeCompare(b.title));
            }
        }
        displayPhotographerWork(data);
        Lightbox.init();
    })
}


// CONTENU DU TAG
function displayTotalLike(total) {
    const tagContain =
        `<p class="like">${total}</p>
<i class="fa fa-solid fa-heart"></i> `
    document.querySelector('.tag').innerHTML = tagContain;
}

function displayPrice(price) {
    const tagContain =
        `<p class="p5">${price}€ / jour</p>`;
    document.querySelector('.tag').innerHTML += tagContain;
}


// OUVERTURE ET FERMETURE DE LA MODALE
const modal = document.getElementById("contact_modal");

const button = document.getElementById("button");
button.addEventListener("click", () => {
    document.querySelector('header').style.opacity = "0.6";
    main.style.opacity = "0.6";
    displayModal();
});

const close = document.getElementById("close");
close.addEventListener("click", () => {
    document.querySelector('header').style.opacity = "1";
    main.style.opacity = "1";
    closeModal();
});

window.addEventListener("keydown", (e) => {
    if (e.key === 'Escape') {
        document.querySelector('header').style.opacity = "1";
        main.style.opacity = "1";
        closeModal();
    }
    if (e.key === 'Tab' && modal !== null) {
        focusInModal(e)
    }
});


//INCLURE LE NOM DU PHOTOGRAPHE DANS LE FORM
function displayNameModal(data) {
    const { name } = data;
    let photographerName = "";
    photographerName =
        photographerName +
        `<h2 id="name">${name}<h2>`;
    document.getElementById("modalHeader").innerHTML += photographerName;
}

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