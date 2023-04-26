let counterPerson = 0;
let itensAdds = '';

window.onload = () => {
    getFirstResults();
}

function getFirstResults () {
    console.log(counterPerson)
    let params = `characters?limit=12&offset=${counterPerson}`;
    const containerCharacters = document.querySelector('.containerCharacters');

    reqGeneric(params).then((resp) => {
        const results = resp.data.results;
        results.forEach(e => {
            itensAdds += `  <div class="cardCharacters">
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
