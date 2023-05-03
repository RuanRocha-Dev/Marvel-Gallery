class Menu extends HTMLElement {
    constructor () {
        super();

        const shadow = this.attachShadow({mode: 'open'});

        const li1 = document.createElement('a');
        li1.innerHTML = 'Personagens';
        li1.href = '../characters/characters.html';
        const li2 = document.createElement('a');
        li2.innerHTML = 'Quadrinhos';
        li2.href = '../comics/comics.html';
        const li3 = document.createElement('a');
        li3.innerHTML = 'Criadores';
        li3.href = '../creators/creators.html';
        const li4 = document.createElement('a');
        li4.innerHTML = 'Eventos';
        li4.href = '../events/events.html';
        const li5 = document.createElement('a');
        li5.innerHTML = 'Séries';
        li5.href = '#';
        const li6 = document.createElement('a');
        li6.innerHTML = 'Histórias';
        li6.href = '#';
        const li7 = document.createElement('a');
        li7.innerHTML = 'Sair';
        li7.href = '../index.html';
        li7.onclick = () => {
            localStorage.removeItem('heroSelected');
            localStorage.removeItem('srcImgHeroSelected');
        }

        const style = document.createElement('style');
        style.innerHTML = ` .menu {
                                display: flex;
                                flex-direction: column;
                                align-items: baseline;
                                justify-content: center;
                                position: absolute;
                                padding: 0;
                                padding-top: 5vh;
                                top: 0;
                                left: 0;
                                width: 12vw;
                                border-radius: 0 0 25px 0;
                                background-color: rgba(0 0 0 / 52%);
                                color: var(--fontColor);
                                box-sizing: border-box;
                                margin: 0;
                                transition: all .4s ease-out;
                                list-style: none;
                                padding-left: 2vw;
                            }

                            .menuToggle {
                                margin-left: -12vw;
                            }
                            
                            .menu ul {
                                list-style: none;
                                padding: 0;
                                margin: 0;
                            }
                            
                            .menu a {
                                padding: 3vh 0vh;
                                cursor: pointer;
                                letter-spacing: 2px;
                                text-shadow: var(--textShadow);
                            }

                            .menu a:hover {
                                background: rgb(236,29,36);
                                -webkit-background-clip: text;
                                -webkit-text-fill-color: transparent;
                                background-clip: text;
                                background-size: 100% 200%;
                                transition: background-position 0.5s ease;
                            }
                            
                            .menu a {
                                color: #fff;
                                text-decoration: none;
                            }
                            
                            @media screen and (max-width: 768px) {
                                .menu {
                                    width: 80%;
                                    height: 100%;
                                    padding: 10px;
                                    position: fixed;
                                    z-index: 99;
                                    font-size: 1.5em;
                                    padding-left: 15vw;
                                    margin-left: -80%;
                                }
                                
                                .menu ul {
                                    display: flex;
                                    flex-direction: row;
                                    justify-content: space-between;
                                }
                                
                                .menu a {
                                    margin: 0;
                                }

                                .menuToggle {
                                    margin-left: 0%;
                                }
                            }`;

        const ul = document.createElement('ul');
        ul.classList.add('menu');
        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li3);
        ul.appendChild(li4);
        ul.appendChild(li5);
        ul.appendChild(li6);
        ul.appendChild(li7);

        shadow.appendChild(ul);
        shadow.appendChild(style);
    }
}

customElements.define('menu-generic', Menu);


const headerGeneric = document.querySelector('header-generic');
const hamburguer = headerGeneric.shadowRoot.querySelector('.menuIconHamgurguer');

const menuGeneric = document.querySelector('menu-generic');
const menu = menuGeneric.shadowRoot.querySelector('.menu');

hamburguer.addEventListener('click', () => {
    menu.classList.toggle('menuToggle');  // the code so far makes the function of opening and closing the side menu
})


const menuItem = menu.querySelector(`a[href="..${window.location.pathname}"]`);
menuItem.style.color = 'red';

