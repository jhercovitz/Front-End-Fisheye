import { displayModal, closeModal } from "../utils/contactForm.js";

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
    let work = `assets/FishEye_Photos/Sample Photos/Mimi/Animals_Rainbow.jpg`;
    const work2 = `assets/FishEye_Photos/Sample Photos/Mimi/Event_BenevidesWedding.jpg`;
    const work3 = `assets/FishEye_Photos/Sample Photos/Mimi/Event_PintoWedding.jpg`;
    const work4 = `assets/FishEye_Photos/Sample Photos/Mimi/Event_SeasideWedding.jpg`;
    const work5 = `assets/FishEye_Photos/Sample Photos/Mimi/Portrait_Background.jpg`;
    const work6 = `assets/FishEye_Photos/Sample Photos/Mimi/Portrait_Wednesday.jpg`;
    const work7 = `assets/FishEye_Photos/Sample Photos/Mimi/Travel_HillsideColor.jpg`;
    const work8 = `assets/FishEye_Photos/Sample Photos/Mimi/Travel_Lonesome.jpg`;
    const work9 = `assets/FishEye_Photos/Sample Photos/Mimi/Animals_Wild_Horses_in_the_mountains.mp4`;
    const icon = `fa-solid fa-heart`;

    function getPhotographWork() {
        const workDiv1 = document.createElement('div');
        workDiv1.classList.add("work");
        const workDiv2 = document.createElement('div');
        workDiv2.classList.add("work");
        const workDiv3 = document.createElement('div');
        workDiv3.classList.add("work");
        const img = document.createElement('img');
        img.setAttribute("src", work);
        const img2 = document.createElement('img');
        img2.setAttribute("src", work2);
        const img3 = document.createElement('img');
        img3.setAttribute("src", work3);
        const p1 = document.createElement('p');
        p1.classList.add("p1");
        p1.textContent = "Arc-en-ciel";
        const p2 = document.createElement('p');
        p2.classList.add("p1");
        p2.textContent = "Picture";
        const p3 = document.createElement('p');
        p3.classList.add("p1");
        p3.textContent = "Picture";
        const p4 = document.createElement('p');
        p4.classList.add('p4');
        p4.textContent = ("12");
        const heart = document.createElement('i');
        heart.classList.add("fa", "fa-solid", "fa-heart");
        p4.appendChild(heart);
        photographWorkDiv.appendChild(workDiv1);
        photographWorkDiv.appendChild(workDiv2);
        photographWorkDiv.appendChild(workDiv3);
        workDiv1.appendChild(img);
        workDiv1.appendChild(p1);
        workDiv1.appendChild(p4);
        workDiv2.appendChild(img2);
        workDiv2.appendChild(p2);
        // workDiv2.appendChild(p4);
        workDiv3.appendChild(img3);
        workDiv3.appendChild(p3);
        // workDiv3.appendChild(p4);


        return (photographWorkDiv);
    }
    return { work, work2, work3, getPhotographWork };
}

async function displayPhotographerWork(photographers) {

    photographers.forEach((photographer) => {
        const workModel = contain();
        const PhotographWork = workModel.getPhotographWork();
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
    document.querySelector('.select_filtre').style.marginLeft = "0"
    displayModal();
});

const close = document.getElementById("close");
close.addEventListener("click", function() {
    document.querySelector('header').style.opacity = "1";
    main.style.opacity = "1";
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


const tagContain =
    `<p class="p5">297 081 <i class="fa fa-solid fa-heart"></i></p> 
    <p class="p5">300€ / jour</p>`;
document.querySelector('.tag').innerHTML += tagContain;
//INCREMENTATION DES LIKES
document.querySelector(".fa").addEventListener("click", function() {

})