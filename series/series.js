let counterSeries = 0;
let itensAddsSeries = '';

window.onload = () => {
    getFirstResultsSeries();
}

let btnSearchSeries = document.querySelector('.containerSearchSeries button');
let btnPlusSeries = document.querySelector('#btnPlusSeries');

function getFirstResultsSeries (nameSeries = '') {  //function that fetches the next 12 results of the Series in general
    const name = nameSeries != '' ? `nameStartsWith=${nameSeries}&` : ''; 
    let params = `series?${name}limit=12&offset=${counterSeries}`;
    const containerSeries = document.querySelector('.containerSeries');

    reqGeneric(params).then((resp) => {
        const results = resp.data.results;

        if(results.length <= 0 && counterSeries <= 12) {
            containerSeries.innerHTML = `<h1> Nenhum Resultado Encontrado </h1>`;
            btnSearchSeries.disabled = false;
            btnPlusSeries.disabled = false;
            btnPlusSeries.classList.add('d-none');
            return false;
        }
        
        results.forEach(e => {
            let srcImage = !e.thumbnail.path.includes('not_available') ? `${e.thumbnail.path}.${e.thumbnail.extension}` : '../imgs/img-default.jpg';

            const spanTitle = document.createElement('span');
            spanTitle.innerHTML = e.title;

            const containerTitleSeries = document.createElement('div');
            containerTitleSeries.classList.add('containerTitleSeries');
            containerTitleSeries.title = e?.title;
            containerTitleSeries.appendChild(spanTitle);

            const image = document.createElement('img');
            image.classList.add('backgroundImg');
            image.src = srcImage;
            image.onload = () => { removeClass(this) }

            const containerImgSeries = document.createElement('div');
            containerImgSeries.classList.add('containerImgSeries');
            containerImgSeries.appendChild(image);

            const cardSeries = document.createElement('div');
            cardSeries.classList.add('cardSeries');
            cardSeries.onclick = () => {
                showInformation(srcImage, e?.title, e?.description, [...e?.comics?.items], [...e?.characters?.items]);
            };

            cardSeries.appendChild(containerImgSeries);
            cardSeries.appendChild(containerTitleSeries);
            
            containerSeries.appendChild(cardSeries);
        })

        btnSearchSeries.disabled = false;
        btnPlusSeries.disabled = false;

        if(results.length < 12 ) {
            btnPlusSeries.classList.add('d-none');
            return false;
        }

        btnPlusSeries.classList.remove('d-none');
    })

    counterSeries = counterSeries + 12;
}

function removeClass (img) {
    img?.classList?.remove('backgroundImg');
}

function showInformation (srcImg, titleSeries, descriptionSeries, arrayComics, arrayCharacteres) {  // creates a modal to show the details of the clicked Series        closeModalSeries
    const containerModalSerie = document.createElement('div');
    containerModalSerie.classList.add('containerModalSerie');

    const containerSeries = document.querySelectorAll('.containerSeries div');
    containerSeries.forEach(el => {
        el.style = 'pointer-events: none';
    })

    containerModalSerie.innerHTML = `   <div class="containerImgAndtitle">   
                                            <div class="containerTitle">
                                                <span> ${titleSeries} </span>
                                            </div>
                                            <div class="containerImgSerie">
                                                <img src="${srcImg}">
                                            </div>
                                            <div class="containerDescriptionSerie">
                                                <p> ${descriptionSeries ?? ''} </p>
                                            </div>
                                        </div>
                                        <div class="containerInfosSeriesAndCharacters">
                                            <div class="containerSeriesSeries">
                                                <h3> Quadrinhos </h3>
                                                <ul>
                                                    ${getArraySeries(arrayComics, null)}
                                                </ul>
                                            </div>
                                            <div class="containerCharactersIncludes">
                                                <h3> Personagens </h3>
                                                <ul>
                                                    ${getArraySeries(null, arrayCharacteres)}
                                                </ul>
                                            </div>
                                        </div>
                                        <span onclick="closeModalSeries(this.closest('.containerModalSerie'))"> X </span>`;

    containerModalSerie.classList.add('animate__animated', 'animate__zoomIn');
    document.body.appendChild(containerModalSerie);
}

function getArraySeries (arrayComicsSeries, arrayCharacteresSeries) {
    let itensComics = '';
    let itenscharacteres = '';

    
    if(arrayComicsSeries != null || arrayComicsSeries != undefined) {
        if(arrayComicsSeries.length <= 0) {
            return '<li> Nenhum Serieso encontrado </li>';
        }
        arrayComicsSeries.forEach(el => {
            itensComics += `<li> ${el.name} </li>`;
        })

        return itensComics;
    }

    if(arrayCharacteresSeries != null || arrayCharacteresSeries != undefined) {
        if(arrayCharacteresSeries.length <= 0) {
            return '<li> Nenhum personagem encontrado(a) </li>';
        }

        arrayCharacteresSeries.forEach(el => {
            itenscharacteres += `<li> ${el.name} </li>`;
        })

        return itenscharacteres;
    }
}

function closeModalSeries (elementRemove) {
    const containerSeries = document.querySelectorAll('.containerSeries div');
    containerSeries.forEach(el => {
        el.style = 'pointer-events: all';
    })

    elementRemove.classList.remove('animate__zoomIn')
    elementRemove.classList.add('animate__zoomOut')

    elementRemove.onanimationend = () => {
        elementRemove.remove();
    }
}

const containerSeries = document.querySelector('.containerSeries');
const inputSearchSeries = document.querySelector('.containerSearchSeries input');

btnPlusSeries.addEventListener('click', () => {
    btnSearchSeries.disabled = true;
    btnPlusSeries.disabled = true;

    getFirstResultsSeries(inputSearchSeries.value);
})


function searchSeries () {
    counterSeries = 0;

    btnSearchSeries.disabled = true;
    btnPlusSeries.disabled = true;

    containerSeries.innerHTML = '';
    getFirstResultsSeries(inputSearchSeries.value);
}
