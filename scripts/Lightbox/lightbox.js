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
        console.log("links", links)
        const gallery = links.map(link => link.getAttribute('src'))

        links.forEach(link => link.addEventListener('click', e => {
            e.preventDefault()
            new Lightbox(e.currentTarget.getAttribute('src'), gallery)
        }))
    }

    constructor(url, images, videos) {
        this.element = this.buildDOM(url)
        this.images = images
        this.videos = videos
        this.loadMedia(url)
        this.onKeyUp = this.onKeyUp.bind(this)
        document.body.appendChild(this.element)
        disableBodyScroll(this.element)
        document.addEventListener('keyup', this.onKeyUp)
    }

    loadMedia(url) {
        this.url = null
        if (this.images) {
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
            console.log("image....", url)

        } else if (this.image === this.videos) {
            const video = document.createElement("video")
            console.log('const video', video)
            const container = this.element.querySelector('.lightbox_container')
            const loader = document.createElement('div')
            loader.classList.add("lightbox_loader")
            container.innerHTML = ''
            container.appendChild(loader)
            video.onload = () => {
                container.removeChild(loader)
                container.appendChild(image)
                this.url = url
            }
            video.src = url
            console.log("video.....", url)

        }
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

    buildDOM(url) {
        const dom = document.createElement('div')
        dom.classList.add('lightbox')
        dom.innerHTML = `<button class="lightbox_close">Fermer</button>
        <button class="lightbox_next">Suivant</button>
        <button class="lightbox_prev">Précédent</button>
        <div class="lightbox_container">
        </div>`;
        dom.querySelector('.lightbox_close').addEventListener('click', this.close.bind(this))
        dom.querySelector('.lightbox_next').addEventListener('click', this.next.bind(this))
        dom.querySelector('.lightbox_prev').addEventListener('click', this.prev.bind(this))
        return dom;
    }
}