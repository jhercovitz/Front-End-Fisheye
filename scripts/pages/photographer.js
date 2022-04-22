import { displayModal, closeModal } from "../utils/contactForm.js";
import { Photographer, Media } from "/scripts/utils/class.js";
import { Lightbox } from "../Lightbox/lightbox.js";

const input = document.querySelector("form");
const idP1 = document.getElementById("p1");
const idP2 = document.getElementById("p2");
const idP3 = document.getElementById("p3");
const main = document.querySelector('main');
let likesTotalCount = 0;



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
    sortMedia(currentMedias);

    displayPhotographerWork(currentMedias);
    sortMediaByDate(currentMedias);
    sortMediaByTitle(currentMedias);
    sortMediaByLikes(currentMedias);
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
        const mediaInfoDOM = mediaModel.getMediaInfoDOM();
        main.appendChild(mediaInfoDOM);
    });
};


// TRI DES MEDIAS
function sortMedia(data) {
    const sortByLikes = data;
    for (let i = 0; i < sortByLikes.length; i++) {
        const likes = sortByLikes[i].likes
        sortByLikes.sort((a, b) => a.likes - b.likes);
    }
}

function sortMediaByLikes(data) {
    const sortByLikes = data;
    document.getElementById('p3').addEventListener("change", () => {
        for (let i = 0; i < sortByLikes.length; i++) {
            const likes = sortByLikes[i].likes;
            sortByLikes.sort((a, b) => a.likes - b.likes);
        }
        displayPhotographerWork(data);
    })
}

function sortMediaByTitle(data) {
    const sortByTitle = data;
    document.getElementById('p2').addEventListener("change", () => {
        for (let i = 0; i < sortByTitle.length; i++) {
            const title = sortByTitle[i].title;
            sortByTitle.sort((a, b) => a.title.localeCompare(b.title));
        }
        displayPhotographerWork(data);
    })
}


function sortMediaByDate(data) {
    const sortByDate = data
    document.getElementById('p1').addEventListener("change", () => {
        for (let i = 0; i < sortByDate.length; i++) {
            const date = sortByDate[i].date;
            sortByDate.sort((a, b) => a.date.localeCompare(b.date));
        }
        displayPhotographerWork(data);
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


// OUVERTURE DU DROPDOWN
var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
        /* For each option in the original select element,
        create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function(e) {
            /* When an item is clicked, update the original select box,
            and the selected item: */
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
        /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
        document.querySelector(".select-selected").style.borderRadius = "5px 5px 0 0";
    });
}

function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
            document.querySelector(".select-selected").style.borderRadius = "5px";
        }
    }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);


init();