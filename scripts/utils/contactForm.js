const form = document.getElementById("myForm");
const confirmMessage = document.getElementById('confirm_submit');
const formData = document.querySelectorAll(".formData");
const modal = document.getElementById("contact_modal");
// const focusableSelector = 'img, input, button';
// let focusables = [];
// let previouslyFocusedElement = null;
const main = document.querySelector('main');
const close = document.getElementById("close");
const button = document.getElementById("button");




export function displayModal(e) {
    e.preventDefault();
    // focusables = Array.from(modal.querySelectorAll(focusableSelector));
    // document.querySelector = document.querySelector(':focus')
    // focusables[0].focus();
    // console.log(focusables[0])
    modal.style.display = "flex";
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    document.querySelector('header').style.opacity = "0.6";
    main.style.opacity = "0.6";
    close.focus();
}

export function closeModal(e) {
    e.preventDefault();
    // if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
    // console.log(previouslyFocusedElement) ///// est toujours null
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    document.querySelector('header').style.opacity = "1";
    main.style.opacity = "1";
    button.focus();
}

// export const focusInModal = function(e) {
//     e.preventDefault()
//     let index = focusables.findIndex(f => f === modal.querySelector(':focus'));
//     if (e.ShiftKey === true) {
//         index--
//     } else {
//         index++
//     }
//     if (index >= focusables.length) {
//         index = 0
//     }
//     if (index < 0) {
//         index = focusables.length - 1
//     }
//     close.focus()
// }


document.forms[0].addEventListener("submit", function(e) {
    e.preventDefault();
    const isFirstNameValid = checkFirstName(document.getElementById('first').value) // vérifie la valeur saisie par l'utlisateur
    const isLastNameValid = checkLastName(document.getElementById('last').value)
    const isEmailValid = checkEmail(document.getElementById('email').value)
    const isMessageValid = checkMessage(document.getElementById('message').value)

    // on valide que tous les champs soient ok pour envoyer le formulaire
    if (isFirstNameValid && isLastNameValid && isEmailValid && isMessageValid) {
        form.style.display = "none";
        document.getElementById('modalHeader').style.display = "none";
        document.querySelector('header').style.opacity = "0.6";
        document.getElementById("close").style.display = "none";
        main.style.opacity = "0.6";
        form.reset(); // la croix n'est  plus la
        confirmMessage.style.display = "flex";
    }
});


//MESSAGES D'ERREUR
function minTwoChar(input) { // au moins deux charactères doivent être saisies
    if (input.length < 2) {
        return false
    }
    return true
}

function checkFirstName(input) { // l'utilisateur doit remplir ce champ
    const firstNameError = formData[0];
    if (!minTwoChar(input)) {
        firstNameError.setAttribute('data-error', 'Veuillez entrer 2 caractères ou plus pour ce champ');
        firstNameError.setAttribute('data-error-visible', 'true'); // affiche le message d'erreur
        return false;
    } else {
        firstNameError.setAttribute('data-error-visible', 'false'); // masque le message d'erreur 
        return true;
    }
}

function checkLastName(input) { // l'utilisateur doit remplir ce champ
    const lastNameError = formData[1];
    if (minTwoChar(input) === false) {
        lastNameError.setAttribute('data-error', 'Veuillez entrer 2 caractères ou plus pour ce champ');
        lastNameError.setAttribute('data-error-visible', 'true');
        return false;
    } else {
        lastNameError.setAttribute('data-error-visible', 'false');
        return true;
    }
}

function checkEmail(input) { // l'utilisateur doit entrer une adresse mail valide
    const emailError = formData[2];
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,64})+$/.test(input)) {
        emailError.setAttribute('data-error', 'l\'email n\'est pas valide');
        emailError.setAttribute('data-error-visible', 'true');
        return false
    } else {
        emailError.setAttribute('data-error-visible', 'false');
        return true;
    }
}

function checkMessage(input) { // l'utilisateur doit remplir ce champ
    const messageError = formData[3];
    if (minTwoChar(input) === false) {
        messageError.setAttribute('data-error', 'Veuillez entrer 2 caractères ou plus pour ce champ');
        messageError.setAttribute('data-error-visible', 'true');
        return false;
    } else {
        messageError.setAttribute('data-error-visible', 'false');
        return true;
    }
}