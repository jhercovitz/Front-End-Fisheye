import { displayModal, closeModal } from "../utils/contactForm.js";
import { Photographer, Media } from "./class.js";

const input = document.querySelector("form");
const chevronDown = document.getElementById("chevronDown");
const chevronUp = document.getElementById("chevronUp");
const selectFiltre = document.querySelector('.select_filtre');
const idP1 = document.getElementById("p1");
const idP2 = document.getElementById("p2");
const idP3 = document.getElementById("p3");
const whiteLine1 = document.getElementById("whiteLine1");
const whiteLine2 = document.getElementById("whiteLine2");
const main = document.querySelector('main');
let likesTotalCount = 0;
let photographerPrice = 0;


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
    displayPhotographerWork(currentMedias);
    // launchSortMedias(currentMedias);


    // CONTENU DU TAG
    for (let i = 0; i < currentMedias.length; i++) {
        likesTotalCount += currentMedias[i].likes;
    }
    displayTotalLike(likesTotalCount)

    for (let i = 0; i < currentPhotographer.length; i++) {
        console.log('current', currentPhotographer)
        photographerPrice += currentPhotographer[i].this.price;
    }
    displayPrice(photographerPrice)

    displayNameModal(currentPhotographer);
};


// AFFICHAGE DES MEDIAS
async function displayPhotographerWork(media) {
    sortMedia(media);
    sortMediaByDate(media);
    sortMediaByTitle(media);
    sortMediaByLikes(media);
    media.forEach((media) => {
        const mediaModel = new Media(media)
        const mediaInfoDOM = mediaModel.getMediaInfoDOM();
        main.appendChild(mediaInfoDOM);
    });
};


// OUVERTURE DU DROPDOWN
// voir mettre des buttons
chevronDown.addEventListener("click", () => {
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
chevronUp.addEventListener("click", () => {
    selectFiltre.style.height = "69px";
    idP1.style.display = "none";
    idP2.style.display = "none";
    idP3.style.marginTop = "18px";
    whiteLine1.style.display = "none";
    whiteLine2.style.display = "none";
    chevronDown.style.display = "inline";
    chevronUp.style.display = "none";
})


// TRI DES MEDIAS
function sortMedia(data) {
    const sortByLikes = data;
    for (let i = 0; i < sortByLikes.length; i++) {
        const likes = sortByLikes[i].likes
        sortByLikes.sort((a, b) => a.likes - b.likes);
        console.log("likes", likes)
    }
}

function sortMediaByLikes(data) {
    const sortByLikes = data;
    document.getElementById('p3').addEventListener("click", () => {
        for (let i = 0; i < sortByLikes.length; i++) {
            const likes = sortByLikes[i].likes;
            sortByLikes.sort((a, b) => a.likes - b.likes);
            console.log("likes event", likes)
        }
    })
}

function sortMediaByTitle(data) {
    const sortByTitle = data;
    document.getElementById('p2').addEventListener("click", () => {
        for (let i = 0; i < sortByTitle.length; i++) {
            const title = sortByTitle[i].title;
            sortByTitle.sort((a, b) => a.title.localeCompare(b.title));
            console.log("title", title)
        }
    })
}

function sortMediaByDate(data) {
    const sortByDate = data
    document.getElementById('p1').addEventListener("click", () => {
        for (let i = 0; i < sortByDate.length; i++) {
            const date = sortByDate[i].date;
            sortByDate.sort((a, b) => a.date.localeCompare(b.date));
            console.log("date", date)
        }
    })
}

// function launchSortMedias(data) {
//     const select = document.querySelector(".filtre");
//     select.addEventListener("click", (e) => {
//         if (e.target.value === "Popularité") {
//             sortMediaByLikes(data);
//             console.log(currentMedias)
//         }
//         if (e.target.value === "Date") {
//             sortMediaByDate(data);
//         }
//         if (e.target.value === "Titre") {
//             sortMediaByTitle(data);
//         } else {
//             sortMedia(data)
//         }
//     })
// }


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
// voir s'il faut changer de fichier 
const button = document.getElementById("button");
button.addEventListener("click", () => {
    document.querySelector('header').style.opacity = "0.6";
    main.style.opacity = "0.6";
    document.querySelector('.select_filtre').style.marginLeft = "0"
    displayModal();
});

const close = document.getElementById("close");
close.addEventListener("click", () => {
    document.querySelector('header').style.opacity = "1";
    main.style.opacity = "1";
    document.querySelector('.select_filtre').style.marginLeft = "90px";
    closeModal();
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