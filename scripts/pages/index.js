    // import { photographerFactory } from "/factories/photographer.js";

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
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };

    init();


    /////////// FETCH PLUS TARD  
    // const photographers = [];
    // fetch('/data/photographers.json').then(response => {
    //     return response.json();
    // }).then(data => {
    //     // Work with JSON data here
    //     console.log(data);
    // }).catch(err => {
    //     this.dataError = true;
    // });