import { enableBodyScroll, disableBodyScroll } from "./body-scroll-lock.js"

/**
 * @property {HTMLElement} element
 * @property {string[]} images Chemin des images de la lightbox
 * @property {string[]} videos Chemin des video de la lightbox
 * @property {string} url Media actuellement affichée
 */

export class Lightbox {
    static init() {
        const links = Array.from(document.querySelectorAll('.img_and_video'));
        const gallery = links.map(link => link.getAttribute('src'))

        links.forEach(link => link.addEventListener('click', e => {
            e.preventDefault()
            document.querySelector('main').style.opacity = "0";
            document.querySelector('header').style.opacity = "0";
            new Lightbox(e.currentTarget.getAttribute('src'), gallery)
        }))
        links.forEach(link => link.addEventListener('keydown', e => {
            e.preventDefault()
            if (e.key === "Enter") {
                document.querySelector('main').style.opacity = "0";
                document.querySelector('header').style.opacity = "0";
                new Lightbox(e.currentTarget.getAttribute('src'), gallery)
            }

        }))
    }

    constructor(url, images) {
        this.element = this.buildDOM(url)
        this.images = images
            // this.videos = videos
            // this.title = title

        this.onKeyUp = this.onKeyUp.bind(this)
        document.body.appendChild(this.element)
        this.loadMedia(url)
        document.querySelector(".lightbox_close").focus();
        disableBodyScroll(this.element)
        document.addEventListener('keyup', this.onKeyUp)
    }

    loadMedia(url) {
        this.url = null
        if (url.endsWith(".jpg")) {
            let image = new Image();
            const container = this.element.querySelector('.lightbox_container')
            const loader = document.createElement('div')
            loader.classList.add("lightbox_loader")
            container.innerHTML = ''
            container.appendChild(loader)
            image.onload = () => {
                container.removeChild(loader)
                container.appendChild(image)
                this.url = url
            }
            image.src = url
        } else {
            const video = document.createElement("video")
            const container = this.element.querySelector('.lightbox_container')
            container.innerHTML = ''
            video.src = url
            video.setAttribute("controls", "true")
            container.appendChild(video)
            this.url = url;

        }
        const title = document.querySelector(`.img_and_video[src="${url}"]`).getAttribute('data-title');
        document.querySelector('.title').textContent = title;
    }

    /**
     * @param {keybordEvent} e 
     */
    onKeyUp(e) {
        if (e.key === "Escape") {
            this.close(e)
        } else if (e.key === "ArrowLeft") {
            this.prev(e)
        } else if (e.key === "ArrowRight") {
            this.next(e)
        }
    }

    /**
     * @param {MouseEvent/keyboardEvent} e 
     */
    close(e) {
        e.preventDefault()
        this.element.classList.add('fadeOut')
        enableBodyScroll(this.element)
        window.setTimeout(() => {
            document.querySelector('main').style.opacity = "1";
            document.querySelector('header').style.opacity = "1"
            this.element.parentElement.removeChild(this.element)
        }, 500)
        document.removeEventListener('keyup', this.onKeyUp)
    }

    /**
     * @param {MouseEvent/keyboardEvent} e 
     */
    next(e) {
        e.preventDefault()
        let i = this.images.findIndex(image => image === this.url)
        if (i === this.images.length - 1) {
            i = -1
        }
        this.loadMedia(this.images[i + 1])
    }

    /**
     * @param {MouseEvent/keyboardEvent} e 
     */
    prev(e) {
        e.preventDefault()
        let i = this.images.findIndex(image => image === this.url)
        if (i === 0) {
            i = this.images.length
        }
        this.loadMedia(this.images[i - 1])
    }

    buildDOM() {
        const dom = document.createElement('div')
        dom.classList.add('lightbox')
        dom.innerHTML = `<button class="lightbox_close">Fermer</button>
        <button class="lightbox_next">Suivant</button>
        <button class="lightbox_prev">Précédent</button>
        <div class="lightbox_container">
        </div>
        <div class="title"></div>`;
        dom.querySelector('.lightbox_close').addEventListener('click', this.close.bind(this))
        dom.querySelector('.lightbox_next').addEventListener('click', this.next.bind(this))
        dom.querySelector('.lightbox_prev').addEventListener('click', this.prev.bind(this))
        return dom;
    }
}