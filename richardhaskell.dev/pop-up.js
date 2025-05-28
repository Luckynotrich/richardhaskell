export class Popup extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
        <style>
            .Popup{
            background-color:rgb(116, 152, 190);
            color: black;
            border-radius: 5px;
            padding:.5rem;
            z-index: 10;
            }
            </style>
            <div class="Popup">
            <p>FutureOnReview.com is currently disabled due to time constraints and hosting capacity. However, the code is available on GitHub <a href="https://github.com/Luckynotrich/ur-backend" target="_blank">ur-backend</a> <a href="https://github.com/Luckynotrich/upon-review" target="_blank">upon-review</a> and  viewing access can be provided upon request. Please contact me for more details.</p>
            </div>
        `
    }
}
customElements.define('pop-up', Popup)