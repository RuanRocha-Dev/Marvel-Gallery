let counterCreators = 0;
let itensAddsCreators = '';

window.onload = () => {
    getFirstResultsCreators();
}

let btnSearchCreators = document.querySelector('.containerSearchCreators button');
let btnPlusCreators = document.querySelector('#btnPlusCreators');

function getFirstResultsCreators (nameCreator = '') {  //function that fetches the next 12 results of the Creators in general
    const name = nameCreator != '' ? `nameStartsWith=${nameCreator}&` : ''; 
    let params = `creators?${name}limit=12&offset=${counterCreators}`;
    const containerCreators = document.querySelector('.containerCreators');

    reqGeneric(params).then((resp) => {
        const results = resp.data.results;

        if(results.length <= 0 && counterCreators <= 12) {
            containerCreators.innerHTML = `<h1> Nenhum Resultado Encontrado </h1>`;
            btnSearchCreators.disabled = false;
            btnPlusCreators.disabled = false;
            btnPlusCreators.classList.add('d-none');
            return false;
        }
        
        results.forEach(e => {

            let srcImage = !e.thumbnail.path.includes('not_available') ? `${e.thumbnail.path}.${e.thumbnail.extension}` : '../imgs/img-default.jpg';
            
            itensAddsCreators += `  <div class="cardCreators animate__animated animate__backInDown" onclick='showInformation("${srcImage.replace(/['"]+/g, '')}", "${e?.fullName?.replace(/['"]+/g, '')}", ${JSON.stringify(e?.comics?.items)}, ${JSON.stringify(e?.events?.items)}, ${JSON.stringify(e?.series?.items)}, ${JSON.stringify(e?.stories?.items)} )'>
                                    <div class="containerImgCreators">
                                        <img class="backgroundImg" src="${srcImage}" onload="removeClass(this)">
                                    </div>
                                    <div class="containerTitleCreators" title="${e.fullName}">
                                        <span> ${e.fullName} </span>
                                    </div>
                                </div>`;
        })
        
        containerCreators.insertAdjacentHTML("beforeend", itensAddsCreators);
        itensAddsCreators = '';

        btnSearchCreators.disabled = false;
        btnPlusCreators.disabled = false;

        if(results.length < 12 ) {
            btnPlusCreators.classList.add('d-none');
            return false;
        }

        btnPlusCreators.classList.remove('d-none');
    })

    counterCreators = counterCreators + 12;
}

function removeClass (img) {
    img.classList.remove('backgroundImg');
}

function showInformation (srcImg, nameCreator, arrayComicsCreator, arrayEventsCreators, arraySeriesCreators, arrayStoriesCreators) {  // creates a modal to show the details of the clicked creator        closeModalCreators
    const containerModalCreator = document.createElement('div');
    containerModalCreator.classList.add('containerModalCreator');

    const containerCreators = document.querySelectorAll('.containerCreators div');
    containerCreators.forEach(el => {
        el.style = 'pointer-events: none';
    })

    containerModalCreator.innerHTML = `   <div class="containerImgAndtitle">   
                                            <div class="containerImgCreator">
                                                <img src="${srcImg}">
                                            </div>
                                            <div class="containerTitle">
                                                <span> ${nameCreator} </span>
                                            </div>
                                        </div>
                                        <div class="containerInfosCreatorsAndCharacters">
                                            <div class="containerCreatorCreator">
                                                <h3> Quadrinhos </h3>
                                                <ul>
                                                    ${getCharacterAndCreatorsInCreator(arrayComicsCreator, null, null, null)}
                                                </ul>
                                            </div>
                                            <div class="containerCharactersIncludes">
                                                <h3> Eventos </h3>
                                                <ul>
                                                    ${getCharacterAndCreatorsInCreator(null, arrayEventsCreators, null, null)}
                                                </ul>
                                            </div>
                                            <div class="containerSeriesCreators">
                                                <h3> Series </h3>
                                                <ul>
                                                    ${getCharacterAndCreatorsInCreator(null, null, arraySeriesCreators, null)}
                                                </ul>
                                            </div>
                                            <div class="containerStoriesCreators">
                                                <h3> Histórias </h3>
                                                <ul>
                                                    ${getCharacterAndCreatorsInCreator(null, null, null, arrayStoriesCreators)}
                                                </ul>
                                            </div>
                                        </div>
                                        <span onclick="closeModalCreators(this.closest('.containerModalCreator'))"> X </span>`;

    containerModalCreator.classList.add('animate__animated', 'animate__zoomIn');
    document.body.appendChild(containerModalCreator);
}

function getCharacterAndCreatorsInCreator (arrayComicsCreator, arrayEventsCreators, arraySeriesCreators, arrayStoriesCreators) {
    let itensComics = '';
    let itensEvents = '';
    let itensSeries = '';
    let itensStories = '';

    if(arrayComicsCreator != null || arrayComicsCreator != undefined) {
        if(arrayComicsCreator.length <= 0) {
            return '<li> Nenhum quadinho encontrado </li>';
        }

        arrayComicsCreator.forEach(el => {
            itensComics += `<li> ${el.name} </li>`;
        })

        return itensComics;
    }

    if(arrayEventsCreators != null || arrayEventsCreators != undefined) {
        if(arrayEventsCreators.length <= 0) {
            return '<li> Nenhum personagem encontrado </li>';
        }

        arrayEventsCreators.forEach(el => {
            itensEvents += `<li> ${el.name} </li>`;
        })

        return itensEvents;
    }

    if(arraySeriesCreators != null || arraySeriesCreators != undefined) {
        if(arraySeriesCreators.length <= 0) {
            return '<li> Nenhuma serie encontrada </li>';
        }

        arraySeriesCreators.forEach(el => {
            itensSeries += `<li> ${el.name} </li>`;
        })

        return itensSeries;
    }

    if(arrayStoriesCreators != null || arrayStoriesCreators != undefined) {
        if(arrayStoriesCreators.length <= 0) {
            return '<li> Nenhuma história encontrada </li>';
        }

        arrayStoriesCreators.forEach(el => {
            itensStories += `<li> ${el.name} </li>`;
        })

        return itensStories;
    }
}

function closeModalCreators (elementRemove) {
    const containerCreators = document.querySelectorAll('.containerCreators div');
    containerCreators.forEach(el => {
        el.style = 'pointer-events: all';
    })

    elementRemove.classList.remove('animate__zoomIn')
    elementRemove.classList.add('animate__zoomOut')

    elementRemove.onanimationend = () => {
        elementRemove.remove();
    }
}

const containerCreators = document.querySelector('.containerCreators');
const inputSearchCreators = document.querySelector('.containerSearchCreators input');

btnPlusCreators.addEventListener('click', () => {
    btnSearchCreators.disabled = true;
    btnPlusCreators.disabled = true;

    getFirstResultsCreators(inputSearchCreators.value);
})


function searchCreators () {
    if(!inputSearchCreators.value != '') {
        inputSearchCreators.classList.add('animate__swing');
        inputSearchCreators.onanimationend = () => { inputSearchCreators.classList.remove('animate__swing') }
        return false;
    }

    counterCreators = 0;

    btnSearchCreators.disabled = true;
    btnPlusCreators.disabled = true;

    containerCreators.innerHTML = '';
    getFirstResultsCreators(inputSearchCreators.value);
}
