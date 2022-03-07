import { displayModal, closeModal } from "../utils/contactForm.js"

const input = document.querySelector("form");
const chevronDown = document.getElementById("chevronDown");
const chevronUp = document.getElementById("chevronUp");
const selectFiltre = document.querySelector('.select_filtre');
const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");
const p3 = document.getElementById("p3");
const whiteLine1 = document.getElementById("whiteLine1");
const whiteLine2 = document.getElementById("whiteLine2");



function photographerFactory(data) {
    const { name, portrait, city, country, tagline } = data;
    const picture = `assets/photographers/${portrait}`;


    function getPhotographInfoDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        const h1 = document.createElement('h1');
        h1.textContent = name;
        const p1 = document.createElement('p');
        p1.classList.add("p1")
        const p2 = document.createElement('p');
        p2.classList.add("p2")
        p1.textContent = String(city) + "," + " " + String(country);
        p2.textContent = tagline;
        article.appendChild(img);
        article.appendChild(h1);
        article.appendChild(p1);
        article.appendChild(p2);
        return (article);
    }
    return { name, picture, getPhotographInfoDOM }
}


// function contain() {
//     const work = `assets/FishEye_Photos/Sample Photos/Mimi/Animals_Rainbow.jpg`;

//     function getPhotographWork() {
//         const card = document.createElement('div');
//         const img = document.createElement('img');
//         img.setAttribute("src", work)
//         const p1 = document.createElement('p1');
//         p1.textContent = "Arc-en-ciel ";
//         card.appendChild(img);
//         card.appendChild(p1);
//         return (card);
//     }
//     return { work, getPhotographWork }
// }


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
            },
            {
                "name": "Ellie-Rose Wilkens",
                "id": 930,
                "city": "Paris",
                "country": "France",
                "tagline": "Capturer des compositions complexes",
                "price": 250,
                "portrait": "EllieRoseWilkens.jpg"
            },
        ]
        // et bien retourner le tableau photographers seulement une fois
    return ({
        photographers: [...photographers, ]
    })
}

async function displayData(photographers) {
    const header = document.getElementsByClassName('photograph-header');

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getPhotographInfoDOM();
        header.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();

// OUVERTURE ET FERMETURE DE LA MODALE
const button = document.getElementById("button");
button.addEventListener("click", function() {
    displayModal();
});

const close = document.getElementById("close");
close.addEventListener("click", function() {
    closeModal();
});

// CONSOLE.LOG DES INPUTS
input.addEventListener("input", function(e) {
    const userInput = e.target.value;
    console.log(userInput);
});


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