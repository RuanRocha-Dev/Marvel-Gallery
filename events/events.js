let counterEvents = 0;
let itensAddsEvents = '';

window.onload = () => {
    getFirstResultsEvents();
}

let btnSearchEvents = document.querySelector('.containerSearchEvents button');
let btnPlusEvents = document.querySelector('#btnPlusEvents');

function getFirstResultsEvents (nameEvent = '') {  //function that fetches the next 12 results of the Events in general
    const name = nameEvent != '' ? `nameStartsWith=${nameEvent}&` : ''; 
    let params = `events?${name}limit=12&offset=${counterEvents}`;
    const containerEvents = document.querySelector('.containerEvents');

    reqGeneric(params).then((resp) => {
        const results = resp.data.results;

        if(results.length <= 0 && counterEvents <= 12) {
            containerEvents.innerHTML = `<h1> Nenhum Resultado Encontrado </h1>`;
            btnSearchEvents.disabled = false;
            btnPlusEvents.disabled = false;
            btnPlusEvents.classList.add('d-none');
            return false;
        }
        
        results.forEach(e => {

            let srcImage = !e.thumbnail.path.includes('not_available') ? `${e.thumbnail.path}.${e.thumbnail.extension}` : '../imgs/img-default.jpg';

            const spanTitle = document.createElement('span');
            spanTitle.innerHTML = e.title;

            const containerTitleEvents = document.createElement('div');
            containerTitleEvents.classList.add('containerTitleEvents');
            containerTitleEvents.title = e?.title;
            containerTitleEvents.appendChild(spanTitle);

            const image = document.createElement('img');
            image.classList.add('backgroundImg');
            image.src = srcImage;
            image.onload = () => { removeClass(this) }

            const containerImgEvents = document.createElement('div');
            containerImgEvents.classList.add('containerImgEvents');
            containerImgEvents.appendChild(image);

            const cardEvents = document.createElement('div');
            cardEvents.classList.add('cardEvents', 'animate__animated', 'animate__bounceIn');
            cardEvents.onclick = () => {
                showInformation(srcImage, e?.title, e?.description, [...e?.comics?.items], [...e?.characters?.items]);
            };

            cardEvents.appendChild(containerImgEvents);
            cardEvents.appendChild(containerTitleEvents);
            
            containerEvents.appendChild(cardEvents);
        })

        btnSearchEvents.disabled = false;
        btnPlusEvents.disabled = false;

        if(results.length < 12 ) {
            btnPlusEvents.classList.add('d-none');
            return false;
        }

        btnPlusEvents.classList.remove('d-none');
    })

    counterEvents = counterEvents + 12;
}

function removeClass (img) {
    img?.classList?.remove('backgroundImg');
}

function showInformation (srcImg, titleEvent, descriptionEvent, arrayComics, arrayCharacteres) {  // creates a modal to show the details of the clicked Event        closeModalEvents
    const containerModalEvent = document.createElement('div');
    containerModalEvent.classList.add('containerModalEvent');

    const containerEvents = document.querySelectorAll('.containerEvents div');
    containerEvents.forEach(el => {
        el.style = 'pointer-events: none';
    })

    containerModalEvent.innerHTML = `   <div class="containerImgAndtitle">   
                                            <div class="containerTitle">
                                                <span> ${titleEvent} </span>
                                            </div>
                                            <div class="containerImgEvent">
                                                <img src="${srcImg}">
                                            </div>
                                            <div class="containerDescriptionEvent">
                                                <p> ${descriptionEvent} </p>
                                            </div>
                                        </div>
                                        <div class="containerInfosEventsAndCharacters">
                                            <div class="containerEventEvent">
                                                <h3> Quadrinhos </h3>
                                                <ul>
                                                    ${getArrayEvents(arrayComics, null)}
                                                </ul>
                                            </div>
                                            <div class="containerCharactersIncludes">
                                                <h3> Personagens </h3>
                                                <ul>
                                                    ${getArrayEvents(null, arrayCharacteres)}
                                                </ul>
                                            </div>
                                        </div>
                                        <span onclick="closeModalEvents(this.closest('.containerModalEvent'))"> X </span>`;

    containerModalEvent.classList.add('animate__animated', 'animate__zoomIn');
    document.body.appendChild(containerModalEvent);
}

function getArrayEvents (arrayComicsEvent, arrayCharacteresEvents) {
    let itensComics = '';
    let itenscharacteres = '';

    
    if(arrayComicsEvent != null || arrayComicsEvent != undefined) {
        if(arrayComicsEvent.length <= 0) {
            return '<li> Nenhum evento encontrado </li>';
        }
        arrayComicsEvent.forEach(el => {
            itensComics += `<li> ${el.name} </li>`;
        })

        return itensComics;
    }

    if(arrayCharacteresEvents != null || arrayCharacteresEvents != undefined) {
        if(arrayCharacteresEvents.length <= 0) {
            return '<li> Nenhum personagem encontrado(a) </li>';
        }

        arrayCharacteresEvents.forEach(el => {
            itenscharacteres += `<li> ${el.name} </li>`;
        })

        return itenscharacteres;
    }
}

function closeModalEvents (elementRemove) {
    const containerEvents = document.querySelectorAll('.containerEvents div');
    containerEvents.forEach(el => {
        el.style = 'pointer-events: all';
    })

    elementRemove.classList.remove('animate__zoomIn')
    elementRemove.classList.add('animate__zoomOut')

    elementRemove.onanimationend = () => {
        elementRemove.remove();
    }
}

const containerEvents = document.querySelector('.containerEvents');
const inputSearchEvents = document.querySelector('.containerSearchEvents input');

btnPlusEvents.addEventListener('click', () => {
    btnSearchEvents.disabled = true;
    btnPlusEvents.disabled = true;

    getFirstResultsEvents(inputSearchEvents.value);
})


function searchEvents () {
    counterEvents = 0;

    btnSearchEvents.disabled = true;
    btnPlusEvents.disabled = true;

    containerEvents.innerHTML = '';
    getFirstResultsEvents(inputSearchEvents.value);
}
