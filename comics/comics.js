let counterComics = 0;
let itensAddscomics = '';

window.onload = () => {
    getFirstResultsComics();
}

let btnSearchComics = document.querySelector('.containerSearchComics button');
let btnPlusComics = document.querySelector('#btnPlusComics');

function getFirstResultsComics (orderSelect = 'title', nameComic = '') {  //function that fetches the next 12 results of the comics in general
    const name = nameComic != '' ? `titleStartsWith=${nameComic}&` : ''; 
    let params = `comics?${name}limit=12&offset=${counterComics}&orderBy=${orderSelect}`;
    const containerComics = document.querySelector('.containerComics');

    reqGeneric(params).then((resp) => {
        const results = resp.data.results;

        if(results.length <= 0 && counterComics <= 12) {
            containerComics.innerHTML = `<h1> Nenhum Resultado Encontrado </h1>`;
            btnSearchComics.disabled = false;
            btnPlusComics.disabled = false;
            btnPlusComics.classList.add('d-none');
            return false;
        }
        
        results.forEach(e => {
            let srcImage = !e.thumbnail.path.includes('not_available') ? `${e.thumbnail.path}.${e.thumbnail.extension}` : '../imgs/img-default.jpg';
            // let description = e.description != '' ? e.description : 'Information not available!';
            let novoArray = [{"creators": e?.creators?.items, "characters": e?.characters?.items}]

            
            itensAddscomics += `  <div class="cardComics" value='' onclick='showInformation("${srcImage}", "${(e?.title?.replace(/['"]+/g, ''))}", "${JSON.stringify(novoArray)}")'>
                                    <div class="containerImgComics">
                                        <img src="${srcImage}" onload="removeClass(this)">
                                    </div>
                                    <div class="containerTitleComics" title="${e.title}">
                                        <span> ${e.title} </span>
                                    </div>
                                </div>`;
        })
        
        containerComics.insertAdjacentHTML("beforeend", itensAddscomics);
        itensAddscomics = '';

        btnSearchComics.disabled = false;
        btnPlusComics.disabled = false;

        if(results.length < 12 ) {
            btnPlusComics.classList.add('d-none');
            return false;
        }

        btnPlusComics.classList.remove('d-none');
    })

    counterComics = counterComics + 12;
}

function removeClass (img) {
    img.classList.remove('backgroundImg');
}

function showInformation (srcImg, titleComic, arrayNameCreator) {  // creates a modal to show the details of the clicked comic        closeModalComics
    const containerModalComic = document.createElement('div');
    containerModalComic.classList.add('containerModalComic');

    containerModalComic.innerHTML = `   <div class="containerImgAndtitle">   
                                            <div class="containerImgComic">
                                                <img src="${srcImg}">
                                            </div>
                                            <div class="containerTitle">
                                                <span> ${titleComic} </span>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="containerCreatorComic">
                                            </div>
                                            <div class="containerCharactersIncludes">
                                                ${getCharacterAndCreatorsInComic(arrayNameCreator)}
                                            </div>
                                        </div>
                                        <span> X </span>`;

    document.body.appendChild(containerModalComic);
}

function getCharacterAndCreatorsInComic (arrayCharacters) {
    console.log(arrayCharacters)
}

const containerComics = document.querySelector('.containerComics');
const selectTypeSearchComics = document.querySelector('#selectTypeSearchComics');
const inputSearchComics = document.querySelector('.containerSearchComics input');

selectTypeSearchComics.addEventListener('change', (el) => {
    const elementValue = el.target.value;

    btnSearchComics.disabled = true;
    btnPlusComics.disabled = true;

    counterComics = 0;
    containerComics.innerHTML = '';
    getFirstResultsComics(elementValue, inputSearchComics.value);
})

btnPlusComics.addEventListener('click', () => {
    btnSearchComics.disabled = true;
    btnPlusComics.disabled = true;

    getFirstResultsComics(selectTypeSearchComics.value, inputSearchComics.value);
})


function searchComics () {
    if(!inputSearchComics.value != '') {
        inputSearchComics.classList.add('animate__swing');
        inputSearchComics.onanimationend = () => { inputSearchComics.classList.remove('animate__swing') }
        return false;
    }

    counterComics = 0;

    btnSearchComics.disabled = true;
    btnPlusComics.disabled = true;

    containerComics.innerHTML = '';
    getFirstResultsComics(selectTypeSearchComics.value, inputSearchComics.value);
}
