    import { photographerFactory } from "../factories/photographer.js";

    // async function getPhotographers() {
    //     // Penser à remplacer par les données récupérées dans le json
    //     const photographers = [{
    //                 "name": "Mimi Keel",
    //                 "id": 243,
    //                 "city": "London",
    //                 "country": "UK",
    //                 "tagline": "Voir le beau dans le quotidien",
    //                 "price": 400,
    //                 "portrait": "MimiKeel.jpg",
    //             },
    //             {
    //                 "name": "Ellie-Rose Wilkens",
    //                 "id": 930,
    //                 "city": "Paris",
    //                 "country": "France",
    //                 "tagline": "Capturer des compositions complexes",
    //                 "price": 250,
    //                 "portrait": "EllieRoseWilkens.jpg"
    //             },
    //         ]
    //         // et bien retourner le tableau photographers seulement une fois
    //     return ({
    //         photographers: [...photographers ]
    //     })
    // }

    async function getPhotographers() {
        const photographers =
            fetch("/data/photographers.json")
            .then(function(response) {
                return response.json();
            })
            .then(function(photographers) {
                displayData(photographers);
            })
            .catch(function(err) {
                console.log(err);
            });
        return photographers
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



    // function displayData(photographers) {
    //     const photographersSection = document.querySelector(".photographer_section");
    //     for (let i = 0; i < photographers.length; i++) {
    //         const div = document.createElement("div");
    //         div.innerHTML += photographers[i].name;
    //         div.innerHTML += photographers[i].city + ' ,' + photographers[i].country;
    //         div.innerHTML += photographers[i].tagline;
    //         div.innerHTML += photographers[i].portrait;
    //         photographersSection.appendChild(div);
    //     }
    // }