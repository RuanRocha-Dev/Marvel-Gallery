let counterPerson = 0;
let itensAdds = '';

window.onload = () => {
    getFirstResults();
}

function getFirstResults (orderSelect = 'name') {
    let params = `characters?limit=12&offset=${counterPerson}&orderBy=${orderSelect}`;
    const containerCharacters = document.querySelector('.containerCharacters');

    reqGeneric(params).then((resp) => {
        const results = resp.data.results;
        console.log(resp)

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
    })

    counterPerson = counterPerson + 12;
}

function removeClass (img) {
    img.classList.remove('backgroundImg');
}

function showInformation (srcImg, nameCharacter, descriptionCharacter) {
    const containerModal = document.createElement('div');
    containerModal.classList.add('containerModal');

    const closeModal = document.createElement('div');
    closeModal.onclick = () => { containerModal.remove() }
    closeModal.classList.add('closeModal');
    closeModal.innerHTML = 'X';

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
selectTypeSearch.addEventListener('change', (el) => {
    const elementValue = el.target.value;

    counterPerson = 0;

    containerCharacters.innerHTML = '';

    getFirstResults(elementValue);
})

const btnPlus = document.querySelector('#btnPlus');
btnPlus.addEventListener('click', () => {
    const elementValue = selectTypeSearch.value;
    // containerCharacters.innerHTML = '';

    getFirstResults(elementValue);
})
