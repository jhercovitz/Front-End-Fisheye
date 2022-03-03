import { displayModal, closeModal } from "../utils/contactForm.js"

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



const button = document.getElementById("button");
button.addEventListener("click", function() {
    displayModal();

});

const close = document.getElementById("close");
close.addEventListener("click", function() {
    closeModal();

});