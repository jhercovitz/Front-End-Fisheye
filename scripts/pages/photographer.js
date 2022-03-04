import { displayModal, closeModal } from "../utils/contactForm.js"

const input = document.querySelector("form");
const chevronDown = document.getElementById("chevronDown");
const chevronUp = document.getElementById("chevronUp");
const selectFiltre = document.querySelector('.select_filtre');
const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");
const whiteLine1 = document.getElementById("whiteLine1");
const whiteLine2 = document.getElementById("whiteLine2");


// async function init() {
//     // Récupère les datas des photographes
//     const { photographers } = await getPhotographers();
//     displayData(photographers);
// };

// init();

function photographerFactory(data) {
    const { name, portrait, city, country, tagline } = data;
    const picture = `assets/photographers/${portrait}`;


    function getPhotographInfoDOM() {
        const header = document.getElementsByClassName('photograph-header');
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        const h1 = document.createElement('h1');
        h1.textContent = name;
        const p1 = document.createElement('p1');
        const p2 = document.createElement('p2');
        p1.textContent = [city, country];
        p2.textContent = tagline;
        header.appendChild(img);
        header.appendChild(h1);
        header.appendChild(p1);
        header.appendChild(p2);
        return (header);
    }
    return { name, picture, getPhotographInfoDOM }
}
// const pho = photographerFactory();
// pho.getPhotographInfoDOM();

// async function displayData(photographers) {
//     const photographHeader = document.querySelector(".photograph-header");

//     photographers.forEach((photographer) => {
//         const photographerModel = photographerFactory(photographer);
//         const getPhotographerInfoDOM = photographerModel.getPhotographInfoDOM();
//         photographHeader.appendChild(getPhotographInfoDOM);
//     });
// };


//     function photographerHeader() {
//         let photographerCard = ``;
//         photographerCard =
//             photographerCard +
//             `<h1>${name}</h1>
//             <p class="p1">${city, country}</p>
//             <p class="p2">${tagline}</p>
//             <img>${picture}</img>`;
//         document.getElementsByClassName('photograph-header').innerHTML += photographerCard;
//     }
//     photographerHeader();
// }

function contain() {
    const work = `assets/FishEye_Photos/Sample Photos/Mimi/Animals_Rainbow.jpg`;

    function getPhotographWork() {
        const card = document.createElement('div');
        const img = document.createElement('img');
        img.setAttribute("src", work)
        const p1 = document.createElement('p1');
        p1.textContent = "Arc-en-ciel ";
        card.appendChild(img);
        card.appendChild(p1);
        return (card);
    }
    return { work, getPhotographWork }
}


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
    whiteLine1.style.display = "none";
    whiteLine2.style.display = "none";
    chevronDown.style.display = "inline";
    chevronUp.style.display = "none";
})