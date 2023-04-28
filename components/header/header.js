let nameHero = '';
let srcImgHero = '';

let divContainerInfosHero = '';
let spanLogo = '';

const infosHeroFavorite = JSON.parse(localStorage.getItem('heroSelected'));
nameHero = infosHeroFavorite.nameHero;
srcImgHero = infosHeroFavorite.srcImgHero;

class Header extends HTMLElement {
    constructor () {
        super();

        const shadowHeader = this.attachShadow({mode: 'open'});

        spanLogo = document.createElement('span');
        spanLogo.classList.add('icon--svg', 'icon--svg', 'mvl-animated-logo', 'logoMarvel');
        spanLogo.setAttribute('aria-hidden', 'true');
        spanLogo.innerHTML = `  <svg width="130" height="52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <rect fill="#EC1D24" width="100%" height="100%"></rect>
                                    <path fill="#FEFEFE" d="M126.222 40.059v7.906H111.58V4h7.885v36.059h6.757zm-62.564-14.5c-.61.294-1.248.44-1.87.442v-14.14h.04c.622-.005 5.264.184 5.264 6.993 0 3.559-1.58 5.804-3.434 6.705zM40.55 34.24l2.183-18.799 2.265 18.799H40.55zm69.655-22.215V4.007H87.879l-3.675 26.779-3.63-26.78h-8.052l.901 7.15c-.928-1.832-4.224-7.15-11.48-7.15-.047-.002-8.06 0-8.06 0l-.031 39.032-5.868-39.031-10.545-.005-6.072 40.44.002-40.435H21.278L17.64 26.724 14.096 4.006H4v43.966h7.95V26.78l3.618 21.192h4.226l3.565-21.192v21.192h15.327l.928-6.762h6.17l.927 6.762 15.047.008h.01v-.008h.02V33.702l1.845-.27 3.817 14.55h7.784l-.002-.01h.022l-5.011-17.048c2.538-1.88 5.406-6.644 4.643-11.203v-.002C74.894 19.777 79.615 48 79.615 48l9.256-.027 6.327-39.85v39.85h15.007v-7.908h-7.124v-10.08h7.124v-8.03h-7.124v-9.931h7.124z"></path>
                                    <path fill="#EC1D24" d="M0 0h30v52H0z"></path>
                                    <path fill="#FEFEFE" d="M31.5 48V4H21.291l-3.64 22.735L14.102 4H4v44h8V26.792L15.577 48h4.229l3.568-21.208V48z"></path>
                                </svg>`;


        const imgHero = document.createElement('img');
        imgHero.setAttribute('src', srcImgHero);
        imgHero.setAttribute('id', 'imageHero2');
        
        const spanNameHero = document.createElement('span');
        spanNameHero.innerHTML = nameHero;
        spanNameHero.style = 'color: var(--fontColor)';

        divContainerInfosHero = document.createElement('a');
        divContainerInfosHero.classList.add('containerHeroFavorite');
        divContainerInfosHero.href = '../home/home.html';
        divContainerInfosHero.appendChild(spanNameHero);
        divContainerInfosHero.appendChild(imgHero); 

        const style = document.createElement('style');
        style.innerHTML = ` header {
                                width: 100%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                position: relative;
                                background-color: var(--backgroundBody)
                            }

                            header #imageHero2 {
                                width: auto;
                                height: 95%;
                                border-radius: 5px;
                                object-fit: contain;
                            }

                            .menuIconHamgurguer {
                                display: flex;
                                flex-direction: column;
                                justify-content: space-between;
                                height: 18px;
                                cursor: pointer;
                                position: absolute;
                                top: 2vh;
                                left: 1vw;
                                cursor: pointer;
                                z-index: 999;
                            }
                            
                            .menuLine {
                                width: 20px;
                                height: 2px;
                                background-color: #333;
                            }

                            .containerHeroFavorite {
                                height: 100%;
                                right: 0;
                                margin-right: 1vw;
                                display: flex;
                                flex-direction: row;
                                flex-wrap: nowrap;
                                align-items: center;
                                justify-content: space-around;
                                position: absolute;
                                z-index: 10;
                            }
                            
                            .containerHeroFavorite span {
                                margin-right: 2vw;
                            }
                            
                            @media (max-width: 768px) {
                                header {
                                    justify-content: flex-start;
                                }
                            
                                header > span {
                                    margin-left: 25px;
                                }
                            }`;

        const menuLine1 = document.createElement('div');
        menuLine1.classList.add('menuLine');
        const menuLine2 = document.createElement('div');
        menuLine2.classList.add('menuLine');
        const menuLine3 = document.createElement('div');
        menuLine3.classList.add('menuLine');
        

        const divMenuHamburguer = document.createElement('div');
        divMenuHamburguer.classList.add('menuIconHamgurguer');
        divMenuHamburguer.appendChild(menuLine1)
        divMenuHamburguer.appendChild(menuLine2)
        divMenuHamburguer.appendChild(menuLine3)

        
        const header = document.createElement('header');
        header.classList.add('headerGeneric');
        header.appendChild(divMenuHamburguer);
        header.appendChild(spanLogo);
        header.appendChild(divContainerInfosHero);

        shadowHeader.appendChild(header);
        shadowHeader.appendChild(style);

        resizeHeader();
    }
}

customElements.define('header-generic', Header);

function resizeHeader () {
    window.onresize = () => {
        const rect1 = spanLogo.getBoundingClientRect();
        const rect2 = divContainerInfosHero.getBoundingClientRect();
    
        if(rect1.right >= rect2.left) {
            spanLogo.style = 'visibility: hidden';
        } else {
            spanLogo.style = '';
        }
    }

    const rect1 = spanLogo.getBoundingClientRect();
    const rect2 = divContainerInfosHero.getBoundingClientRect();

    if(rect1.right >= rect2.left) {
        spanLogo.style = 'visibility: hidden';
    } else {
        spanLogo.style = '';
    }
}
