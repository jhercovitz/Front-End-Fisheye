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
const heart = document.createElement('i');
heart.classList.add("fa", "fa-solid", "fa-heart", "increment");



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


// AFFICHAGE DU TRAVAIL DU PHOTOGRAPHE
function contain() {
    let work = `assets/FishEye_Photos/Sample Photos/Mimi/Animals_Rainbow.jpg`;
    const work2 = `assets/FishEye_Photos/Sample Photos/Mimi/Event_BenevidesWedding.jpg`;
    const work3 = `assets/FishEye_Photos/Sample Photos/Mimi/Event_PintoWedding.jpg`;
    const work4 = `assets/FishEye_Photos/Sample Photos/Mimi/Animals_Wild_Horses_in_the_mountains.mp4`;

    function getPhotographWork() {
        const workDiv1 = document.createElement('div');
        workDiv1.classList.add("work");
        const workDiv2 = document.createElement('div');
        workDiv2.classList.add("work");
        const workDiv3 = document.createElement('div');
        workDiv3.classList.add("work");
        const workDiv4 = document.createElement('div');
        workDiv4.classList.add("work");
        const img = document.createElement('img');
        img.setAttribute("src", work);
        const p1 = document.createElement('p');
        p1.classList.add("p1");
        p1.textContent = "Arc-en-ciel";
        const img2 = document.createElement('img');
        img2.setAttribute("src", work2);
        const p2 = document.createElement('p');
        p2.classList.add("p1");
        p2.textContent = "Picture";
        const img3 = document.createElement('img');
        img3.setAttribute("src", work3);
        const p3 = document.createElement('p');
        p3.classList.add("p1");
        p3.textContent = "Picture";
        const video = document.createElement('video');
        video.setAttribute("src", work4);
        video.controls = true;
        const p5 = document.createElement('p');
        p5.classList.add("p1");
        p5.textContent = "Video";
        const p4 = document.createElement('p');
        p4.classList.add('p4');
        p4.textContent = ("12");
        p4.appendChild(heart);
        photographWorkDiv.appendChild(workDiv1);
        photographWorkDiv.appendChild(workDiv2);
        photographWorkDiv.appendChild(workDiv3);
        photographWorkDiv.appendChild(workDiv4);
        workDiv1.appendChild(img);
        workDiv1.appendChild(p1);
        workDiv1.appendChild(p4);
        workDiv2.appendChild(img2);
        workDiv2.appendChild(p2);
        // workDiv2.appendChild(p4);
        workDiv3.appendChild(img3);
        workDiv3.appendChild(p3);
        // workDiv3.appendChild(p4);
        workDiv4.appendChild(video)
        workDiv4.appendChild(p5);
        // workDiv4.appendChild(p4);
        return (photographWorkDiv);
    }
    // TRI DES ELEMENTS 
    // voir créer une class avec currentIndex
    document.getElementById("p2").addEventListener("click", function() {
        let workSorted = [work, work2]; //, work3, work4
        workSorted.sort(function(a, b) {
            const textA = a.textContent, // probleme avec toLowerCase
                textB = b.textContent;
            if (textA < textB)
                return -1;
            if (textA > textB)
                return 1;
            console.log(workSorted)
            return 0;
        });
    })
    return { work, work2, work3, work4, getPhotographWork };
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

//INCLURE LE NOM DU PHOTOGRAPHE DANS LE FORM
// ne pas oublier de remplacer le nom
function displayNameModal() {
    let photographerName = "";
    photographerName =
        photographerName +
        `<h2 id="name">Mimi Keel<h2>`;
    document.getElementById("modalHeader").innerHTML += photographerName;
}


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




// CONTENU DU TAG
let count = 297081;
const tagContain =
    `<p class="like">${count}</p>
    <i class="fa fa-solid fa-heart"></i>
    <p class="p5">300€ / jour</p>`;
document.querySelector('.tag').innerHTML += tagContain;

//INCREMENTATION DES LIKES
heart.addEventListener("click", function() {
    count++;
    document.querySelector(".like").innerHTML = count;
})


// OUVERTURE DE LA LIGHTBOX




init();
WorkInit();
displayNameModal();