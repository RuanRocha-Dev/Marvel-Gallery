function getAllCharactersSaved () {
    let containerCharactersSaved = document.querySelector('.containerCharactersSaved');
    const arrayMyCharacters = JSON.parse(localStorage.getItem('myCharacters'));
    console.log(arrayMyCharacters);
    itensAdds = '';
    
    arrayMyCharacters.forEach(el => {
        itensAdds += `  <div class="cardCharactersSaved" onclick='showInformation("${el?.img}", "${(el?.name.replace(/['"]+/g, ''))}", "${el?.description.replace(/['"]+/g, '')}")'>
                            <div class="containerImgCharactersSaved">
                                <img class="backgroundImg" src="${el?.img}" onload="removeClass(this)">
                            </div>
                            <div class="containerTitleCharacterSaved">
                                <span> ${el?.name} </span>
                            </div>
                        </div>`;
    });

    
    containerCharactersSaved.innerHTML = itensAdds;
    itensAdds = '';
}

getAllCharactersSaved()

function showInformation (srcImg, nameCharacter, descriptionCharacter) { 
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

function removeClass (img) {
    img.classList.remove('backgroundImg');
}