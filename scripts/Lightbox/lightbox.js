import { enableBodyScroll, disableBodyScroll } from "./lightbox/body-scroll-lock.js"

/**
 * @property {HTMLElement} element
 * @property {string[]} images Chemin des images de la lightbox
 * @property {string} url Image actuellement affichée
 */

class Lightbox {

    static init() {
        const links = Array.from(document.querySelectorAll('img'))
        const gallery = links.map(link => link.getAttribute('src'))

        links.forEach(link => link.addEventListener('click', e => {
            e.preventDefault()
            new Lightbox(e.currentTarget.getAttribute('src'), gallery)
        }))
    }

    /**
     * @param {string} url URL de l'image
     * @param {string[]} images Chemins des images de la lightbox 
     */
    constructor(url, images) {
        this.element = this.buildDOM(url)
        this.images = images
        this.loadImage(url)
        this.onKeyUp = this.onKeyUp.bind(this)
        document.body.appendChild(this.element)
        disableBodyScroll(this.element)
        document.addEventListener('keyup', this.onKeyUp)
    }

    /**
     * @param {string} URL de l'image 
     */
    loadImage(url) {
        this.url = null
        const image = new Image();
        const container = this.element.querySelector('lightbox_container')
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
    }


    /**
     * 
     * @param {keybordEvent} e 
     */
    onKeyUp(e) {
        if (e === "Escape") {
            this.close(e)
        } else if (e === "ArrowLeft") {
            this.prev(e)
        } else if (e === "ArrowRight") {
            this.next(e)
        }
    }

    /**
     * Ferme la lightbox
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
        let pos = this.images.findIndex(i => i === this.url)
        if (pos === this.images.length - 1) {
            pos = -1
        }
        this.loadImage(this.images[pos + 1])
    }

    /**
     * @param {MouseEvent/keyboardEvent} e 
     */
    prev(e) {
        e.preventDefault()
        let pos = this.images.findIndex(i => i === this.url)
        if (pos === 0) {
            pos = this.images.length
        }
        this.loadImage(this.images[pos - 1])
    }

    /**
     * @param {string} URL de l'image 
     * @param {HTMLElement}
     */
    buildDOM(url) {
        const dom = document.createElement('div')
        dom.classList.add('lightbox')
        dom.innerHTML = `<button class="lightbox_close">Fermer</button>
        <button class="lightbox_next">Suivant</button>
        <button class="lightbox_prev">Précédent</button>
        <div class="lightbox_container">
        </div>`;
        dom.querySelector('lightbox_close').addEventListener('click', this.close.bind(this))
        return dom;
        dom.querySelector('lightbox_next').addEventListener('click', this.next.bind(this))
        return dom;
        dom.querySelector('lightbox_prev').addEventListener('click', this.prev.bind(this))
        return dom;
    }
}

Lightbox.init();