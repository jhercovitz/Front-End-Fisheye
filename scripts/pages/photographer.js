import { displayModal, closeModal } from "../utils/contactForm.js";

const input = document.querySelector("form");
const chevronDown = document.getElementById("chevronDown");
const chevronUp = document.getElementById("chevronUp");
const selectFiltre = document.querySelector('.select_filtre');
const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");
const p3 = document.getElementById("p3");
const whiteLine1 = document.getElementById("whiteLine1");
const whiteLine2 = document.getElementById("whiteLine2");
const photographWorkDiv = document.querySelector(".photograph_work");
const main = document.querySelector('main');


// AFFICHAGE DES INFOS PHOTOGRAPHE
function photographerFactory(data) {
    const { name, portrait, city, country, tagline } = data;
    const picture = `assets/photographers/${portrait}`;

    function getPhotographInfoDOM() {
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
    return { name, picture, getPhotographInfoDOM };
}


async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const photographers = [{
            "name": "Mimi Keel",
            "id": 243,
            "city": "London",
            "country": "UK",
            "tagline": "Voir le beau dans le quotidien",
            "price": 400,
            "portrait": "MimiKeel.jpg",
        }, ]
        // et bien retourner le tableau photographers seulement une fois
    return ({
        photographers: [...photographers, ]
    });
}

async function displayData(photographers) {
    const header = document.querySelector('.photograph-header');

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const PhotographInfoDOM = photographerModel.getPhotographInfoDOM();
        header.appendChild(PhotographInfoDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();


// AFFICHAGE DU TRAVAIL DU PHOTOGRAPHE
function contain() {
    const work = `assets/FishEye_Photos/Sample Photos/Mimi/Animals_Rainbow.jpg`;

    function getPhotographWork() {
        const img = document.createElement('img');
        img.setAttribute("src", work);
        const p1 = document.createElement('p');
        p1.classList.add("p1");
        p1.textContent = "Arc-en-ciel ";
        // const heart = document.createElement('i');
        // heart.classList.add("fa-solid fa-heart");
        photographWorkDiv.appendChild(img);
        photographWorkDiv.appendChild(p1);
        // photographWorkDiv.appendChild(heart);
        return (photographWorkDiv);
    }
    return { work, getPhotographWork };
}

async function displayPhotographerWork(photographers) {

    photographers.forEach((photographer) => {
        const photographerModel = contain();
        const PhotographWork = photographerModel.getPhotographWork();
        main.appendChild(PhotographWork);
    });
};

async function WorkInit() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayPhotographerWork(photographers);
};

WorkInit();



// OUVERTURE ET FERMETURE DE LA MODALE
const button = document.getElementById("button");
button.addEventListener("click", function() {
    document.querySelector('header').style.opacity = "0.6";
    main.style.opacity = "0.6";
    document.getElementById('button').style.display = "none";
    document.querySelector('.select_filtre').style.marginLeft = "0"
    displayModal();
});

const close = document.getElementById("close");
close.addEventListener("click", function() {
    document.querySelector('header').style.opacity = "1";
    main.style.opacity = "1";
    document.getElementById('button').style.display = "block";
    document.querySelector('.select_filtre').style.marginLeft = "90px"
    closeModal();
});

// CONSOLE.LOG DES INPUTS
input.addEventListener("input", function(e) {
    const userInput = e.target.value;
    console.log(userInput);
});

//INCLURE LE NOM DU PHOTOGRAPHE DANS LE FORM
// ne pas oublier de remplacer le nom
function displayName() {
    let photographerName = "";
    photographerName =
        photographerName +
        `<h2 id="name">Mimi Keel<h2>`;
    document.getElementById("modalHeader").innerHTML += photographerName;
}
displayName();


// OUVERTURE DU DROPDOWN
chevronDown.addEventListener("click", function() {
    selectFiltre.style.height = "170px";
    p1.style.display = "block";
    p2.style.display = "block";
    p3.style.marginTop = "39px";
    whiteLine1.style.display = "block";
    whiteLine2.style.display = "block";
    chevronDown.style.display = "none";
    chevronUp.style.display = "inline";
})

// FERMETURE DROPDOWN
chevronUp.addEventListener("click", function() {
    selectFiltre.style.height = "69px";
    p1.style.display = "none";
    p2.style.display = "none";
    p3.style.marginTop = "18px";
    whiteLine1.style.display = "none";
    whiteLine2.style.display = "none";
    chevronDown.style.display = "inline";
    chevronUp.style.display = "none";
})