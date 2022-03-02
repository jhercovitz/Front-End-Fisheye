function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const p1 = document.createElement('p1');
        const p2 = document.createElement('p2');
        const p3 = document.createElement('p3');
        // const a = document.createElement('a');
        // a.href = "photographer.html";
        p1.textContent = [city, country];
        p2.textContent = tagline;
        p3.textContent = [price, "€/jour"];
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p1);
        article.appendChild(p2);
        article.appendChild(p3);
        // article.appendChild(a);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}