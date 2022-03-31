    import { photographerFactory } from "../factories/photographer.js";

    async function getPhotographers() {
        const photographers =
            fetch("/data/photographers.json")
            .then((data) => {
                return data.json();
            })
            .catch((err) => {
                console.log(err);
            });
        return photographers;
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