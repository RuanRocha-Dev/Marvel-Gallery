let counterPerson = 0;
let itensAdds = '';

window.onload = () => {
    getFirstResults();
}

let btnSearch = document.querySelector('.containerSearchCharacters button');
let btnPlus = document.querySelector('#btnPlus');

function getFirstResults (orderSelect = 'name', nameCharacter = '') {
    const name = nameCharacter != '' ? `nameStartsWith=${nameCharacter}&` : ''; 
    let params = `characters?${name}limit=12&offset=${counterPerson}&orderBy=${orderSelect}`;
    const containerCharacters = document.querySelector('.containerCharacters');

    reqGeneric(params).then((resp) => {
        const results = resp.data.results;

        // !e.thumbnail.path.includes('not_available') ? ${e.thumbnail.path}.${e.thumbnail.extension} : '' 

        results.forEach(e => {
            let description = e.description != '' ? e.description : 'Information not available!';

            itensAdds += `  <div class="cardCharacters" onclick='showInformation("${(e.thumbnail.path)}.${e.thumbnail.extension}", "${(e.name.replace(/['"]+/g, ''))}", "${description.replace(/['"]+/g, '')}")'>
                                <div class="containerImgCharacters">
                                    <img src="${e.thumbnail.path}.${e.thumbnail.extension}" onload="removeClass(this)">
                                </div>
                                <div class="containerTitleCharacter">
                                    <span> ${e.name} </span>
                                </div>
                            </div>`;
        })
        
        containerCharacters.insertAdjacentHTML("beforeend", itensAdds);
        itensAdds = '';

        btnSearch.disabled = false;
        btnPlus.disabled = false;
    })

    counterPerson = counterPerson + 12;
}

function removeClass (img) {
    img.classList.remove('backgroundImg');
}

function showInformation (srcImg, nameCharacter, descriptionCharacter) {
    const containerModal = document.createElement('div');
    containerModal.classList.add('containerModal', 'animate__animated', 'animate__zoomIn');

    const closeModal = document.createElement('div');
    closeModal.classList.add('closeModal');
    closeModal.innerHTML = 'X';
    closeModal.onclick = () => {
        containerModal.classList.remove('animate__zoomIn');
        containerModal.classList.add('animate__zoomOut');
        containerModal.onanimationend = () => { containerModal.remove() } 
    }

    const containerImg = document.createElement('div');
    containerImg.classList.add('containerImg');
    const imgModal = document.createElement('img');
    imgModal.src = srcImg;


    const containerName = document.createElement('div');
    containerName.classList.add('containerName');
    const name = document.createElement('span');
    name.innerHTML = nameCharacter;


    const containerDescription = document.createElement('div');
    containerDescription.classList.add('containerDescription');
    const description = document.createElement('p');
    description.innerHTML = descriptionCharacter;


    containerImg.appendChild(imgModal);
    containerImg.appendChild(closeModal);
    containerName.appendChild(name);
    containerDescription.appendChild(description);

    containerModal.appendChild(containerImg);
    containerModal.appendChild(containerName);
    containerModal.appendChild(containerDescription);

    document.body.appendChild(containerModal);
}

const containerCharacters = document.querySelector('.containerCharacters');
const selectTypeSearch = document.querySelector('#selectTypeSearch');
const inputSearchCharacter = document.querySelector('.containerSearchCharacters input');

selectTypeSearch.addEventListener('change', (el) => {
    const elementValue = el.target.value;

    btnSearch.disabled = true;
    btnPlus.disabled = true;

    counterPerson = 0;
    containerCharacters.innerHTML = '';
    getFirstResults(elementValue, inputSearchCharacter.value);
})

btnPlus.addEventListener('click', () => {
    btnSearch.disabled = true;
    btnPlus.disabled = true;

    getFirstResults(selectTypeSearch.value, inputSearchCharacter.value);
})


function searchCharacter () {
    counterPerson = 0;

    btnSearch.disabled = true;
    btnPlus.disabled = true;

    containerCharacters.innerHTML = '';
    getFirstResults(selectTypeSearch.value, inputSearchCharacter.value);
}
