class ValentineHearts extends HTMLElement {
    #shadowRoot;

    constructor() {
        super();
        this.#createShadowRoot();
    }

    #createShadowRoot() {
        this.#shadowRoot = this.attachShadow({ mode: 'open' });
        this.#shadowRoot.innerHTML = `
            <style>
                :host {
                    --heart-size: 1em;
                    --heart-color: red;
                    --heart-speed: 30s;

                    pointer-events: none;
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10000;
                    overflow: hidden;
                }

                heart {
                    opacity: 0;
                    display: block;
                    width: var(--heart-size);
                    height: var(--heart-size);
                    position: absolute;
                    left: calc(var(--heart-x-offset) - 4%);
                    background: var(--heart-color);
                    transform: rotate(45deg) scale(0);
                    transition: top var(--heart-speed) linear,
                                opacity 1s ease-in-out,
                                transform 1s ease-in-out;
                    animation-duration: 6s;
                    animation-iteration-count: infinite;
                    will-change: top, left, opacity, transform;
                }

                heart::before {
                    content: ' ';
                    display: block;
                    width: var(--heart-size);
                    height: var(--heart-size);
                    border-radius: calc(var(--heart-size) / 2);
                    position: absolute;
                    top: 0;
                    left: calc(var(--heart-size) * -0.5);
                    background: var(--heart-color);
                }

                heart::after {
                    content: ' ';
                    display: block;
                    width: var(--heart-size);
                    height: var(--heart-size);
                    border-radius: calc(var(--heart-size) / 2);
                    position: absolute;
                    top: calc(var(--heart-size) * -0.5);
                    left: 0;
                    background: var(--heart-color);
                }

                @keyframes sway {
                    0% {
                        left: calc(var(--heart-x-offset) - 4%);
                    }

                    50% {
                        left: calc(var(--heart-x-offset) + 4%);
                    }

                    100% {
                        left: calc(var(--heart-x-offset) - 4%);
                    }
                }
            </style>
        `;
    }

    connectedCallback() {
        setInterval(() => this.#spawnHeart(), 1000);

        for (let i = 0; i < 20; i++) {
            this.#spawnHeart(Math.round(Math.random() * 100));
        }

        this.addEventListener('resize', () => this.#resize());
        this.#resize();
    }

    #resize() {
        this.style.width = `${window.clientWidth}px`;
        this.style.height = `${document.body.clientHeight}px`;
    }

    #spawnHeart(top) {
        const heart = document.createElement('heart');

        heart.style.top = `${top || Math.round(Math.random() * 25 + 75)}%`;
        heart.style.setProperty('--heart-x-offset', `${Math.random() * 100}%`);

        const brightness = Math.random();
        heart.style.setProperty(
            '--heart-color',
            `rgb(255, ${Math.round(brightness * 150)}, ${Math.round(brightness * 50)})`
        );

        this.#shadowRoot.appendChild(heart);

        setTimeout(() => {
            heart.style.animationName = 'sway';
        }, Math.random() * 3000);

        setTimeout(() => {
            heart.style.top = '-2%';
            heart.style.opacity = 0.5;
            heart.style.transform = `rotate(45deg) scale(${Math.random() * 0.4 + 0.8})`;

            function removeHeart(event) {
                if (event.propertyName === 'top') {
                    heart.parentNode.removeChild(heart);
                    heart.removeEventListener('transitionend', removeHeart);
                }
            }

            heart.addEventListener('transitionend', removeHeart);
        }, 100);
    }
}

customElements.define('valentine-hearts', ValentineHearts);
