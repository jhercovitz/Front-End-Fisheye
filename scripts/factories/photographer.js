export function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `/assets/photographers/${portrait}`;
    // const myUrl = new URL("photographer.html");
    // myUrl.searchParams.append (id = "243")

    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const p1 = document.createElement('p');
        p1.classList.add("p1")
        const p2 = document.createElement('p');
        p2.classList.add("p2")
        const p3 = document.createElement('p');
        p3.classList.add("p3")
        const a = document.createElement('a');
        a.href = "photographer.html";
        // a.href = "photographer.html?id=${photographer.id}"
        p1.textContent = String(city) + "," + " " + String(country);
        p2.textContent = tagline;
        p3.textContent = String(price) + "€/jour";
        a.appendChild(img);
        a.appendChild(h2);
        a.appendChild(p1);
        a.appendChild(p2);
        a.appendChild(p3);
        article.appendChild(a);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}