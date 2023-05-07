let counterPerson = 0;
let itensAdds = '';

window.onload = () => {
    getFirstResults();
}

let btnSearch = document.querySelector('.containerSearchCharacters button');
let btnPlus = document.querySelector('#btnPlus');

function getFirstResults (orderSelect = 'name', nameCharacter = '') {  //function that fetches the next 12 results of the characters in general
    const name = nameCharacter != '' ? `nameStartsWith=${nameCharacter}&` : ''; 
    let params = `characters?${name}limit=12&offset=${counterPerson}&orderBy=${orderSelect}`;
    const containerCharacters = document.querySelector('.containerCharacters');

    reqGeneric(params).then((resp) => {
        const results = resp.data.results;

        if(results.length <= 0 && counterPerson <= 12) {
            containerCharacters.innerHTML = `<h1> Nenhum Resultado Encontrado </h1>`;
            btnSearch.disabled = false;
            btnPlus.disabled = false;
            btnPlus.classList.add('d-none');
            return false;
        }
        
        results.forEach(e => {
            let srcImage = !e.thumbnail.path.includes('not_available') ? `${e.thumbnail.path}.${e.thumbnail.extension}` : '../imgs/img-default.jpg';
            let description = e.description != '' ? e.description : 'Information not available!';

            itensAdds += `  <div class="cardCharacters animate__animated animate__flipInY" onclick='showInformation("${srcImage}", "${(e.name.replace(/['"]+/g, ''))}", "${description.replace(/['"]+/g, '')}")'>
                                <div class="containerImgCharacters">
                                    <img class="backgroundImg" src="${srcImage}" onload="removeClass(this)">
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

        if(results.length < 12 ) {
            btnPlus.classList.add('d-none');
            return false;
        }

        btnPlus.classList.remove('d-none');
    })

    counterPerson = counterPerson + 12;
}

function removeClass (img) {
    img.classList.remove('backgroundImg');
}

function showInformation (srcImg, nameCharacter, descriptionCharacter) {  // creates a modal to show the details of the clicked character
    const containerModal = document.createElement('div');
    containerModal.classList.add('containerModal', 'animate__animated', 'animate__zoomIn');

    const containerCharacters = document.querySelectorAll('.containerCharacters div');
    containerCharacters.forEach(el => {
        el.style = 'pointer-events: none';
    })

    const closeModal = document.createElement('div');
    closeModal.classList.add('closeModal');
    closeModal.innerHTML = 'X';
    closeModal.onclick = () => {
        containerCharacters.forEach(el => {
            el.style = 'pointer-events: all';
        })

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
    name.setAttribute('contenteditable', true)
    name.onclick = () => { editInfosCharacters(name, btnSaveMyCharacter) };


    const containerDescription = document.createElement('div');
    containerDescription.classList.add('containerDescription');
    const description = document.createElement('p');
    description.innerHTML = descriptionCharacter;
    description.setAttribute('contenteditable', true)
    description.onclick = () => { editInfosCharacters(description, btnSaveMyCharacter) };

    const btnSaveMyCharacter = document.createElement('btn');
    btnSaveMyCharacter.innerHTML = 'Salvar';
    btnSaveMyCharacter.classList.add('d-none', 'animate__animated');
    btnSaveMyCharacter.onclick = () => { saveCharacter(btnSaveMyCharacter, name.textContent, description.textContent, srcImg) }


    containerImg.appendChild(imgModal);
    containerImg.appendChild(closeModal);
    containerName.appendChild(name);
    containerDescription.appendChild(description);

    containerModal.appendChild(btnSaveMyCharacter);
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
    if(!inputSearchCharacter.value != '') {
        inputSearchCharacter.classList.add('animate__swing');
        inputSearchCharacter.onanimationend = () => { inputSearchCharacter.classList.remove('animate__swing') }
        return false;
    }

    counterPerson = 0;

    btnSearch.disabled = true;
    btnPlus.disabled = true;

    containerCharacters.innerHTML = '';
    getFirstResults(selectTypeSearch.value, inputSearchCharacter.value);
}

function editInfosCharacters (el, btnSaveCharacter) {
    el.style = 'background-color: #ccc; color: #000';
    el.contentEditable = true;

    el.onblur = () => { el.style = '' }
    el.oninput = () => { btnSaveCharacter.classList.remove('d-none') }
}

function saveCharacter (el, name, description, img) {
    let charactersSaveds = localStorage.getItem('myCharacters');
    let newData;

    data = {
        name,
        description,
        img
    }

    if(charactersSaveds != null) {
        let parseData = JSON.parse(charactersSaveds);

        if(parseData.length > 1) {
            newData = [...parseData, data];
        } else {
            newData = [parseData, data];
        }
    } else {
        newData = data;
    }

    el.classList.add('animate__flipOutX', 'animate__faster');
    setTimeout(() => {
        el.classList.remove('animate__flipOutX');
        el.classList.add('animate__flipInX');
        el.style = 'background-color: green; pointer-events: none';
        el.innerHTML = '<i class="fa fa-check">';
    }, 350);
    
    
    localStorage.setItem('myCharacters', JSON.stringify(newData));
    
}