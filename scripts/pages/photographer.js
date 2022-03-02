function photographerFactory(data) {
    const { name, portrait, city, country, tagline } = data;
    const picture = `assets/photographers/${portrait}`;


    function getPhotographerInfoDOM() {
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
    return { name, picture, getPhotographerInfoDOM }
}

// async function displayData(photographers) {
//     const photographHeader = document.querySelector(".photograph-header");

//     photographers.forEach((photographer) => {
//         const photographerModel = photographerFactory(photographer);
//         const getPhotographerInfoDOM = photographerModel.getPhotographerInfoDOM();
//         photographHeader.appendChild(getPhotographerInfoDOM);
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