window.onload = () => {
    checkGeneratedImage();
}

let nameHeroFavorite = '';

urlEvent = '';

const idHeroFavorite = JSON.parse(localStorage.getItem('heroSelected'));  //variable that gets items from the preferred character's localStorage

async function getHeroFavorite () {
    const request = await reqGeneric(`characters/${idHeroFavorite?.idHero}?`);  
    return request; 
}

const imgHero = document.querySelector('.containerImgCharacter img');
const name = document.querySelector('.containerNameCharacter span');
const infsHero = document.querySelector('.containerInfosCharacter');
getHeroFavorite().then((resp) => {  //Enter the preferred character's information
    const result = resp.data.results[0];

    urlEvent = result.events.collectionURI;
    allComics(result.id)
    getEventsHero();

    nameHeroFavorite = result.name;

    imgHero.src = `${result.thumbnail.path}.${result.thumbnail.extension}`;
    name.innerHTML = result.name;
    infsHero.innerHTML = result.description;
})

const btnPlusComics = document.querySelector('.containerComics button');

function allComics (idHero, offSetValue = 0) {  //get the main comics
    let containerComics = document.querySelector('.containerComics');

    counter = offSetValue;
    async function reqComics () {
        const request = await reqLink(`https://gateway.marvel.com/v1/public/comics?format=comic&noVariants=true&characters=${idHero}&limit=18&orderBy=-focDate&`);
        return request; 
    }

    reqComics().then((resp) => {
        const result = resp.data.results;
        let comicsHTML = ''; 
        
        if(result.length < 1) {
            const titleComics = document.querySelector('.titleComics');
            titleComics.style.display = 'none';
            return false;
        }

        result.forEach(el => {
            let urlImg = el.thumbnail.path.includes('image_not_avai') ? idHeroFavorite.srcImgHero : `${el.thumbnail.path}.${el.thumbnail.extension}`; 
            comicsHTML += ` <div>
                                <div class="containerImgComics">
                                    <img class="imagenzinha" src="${urlImg}" onload="removeClass(this)">
                                </div>
                                <div class="containerTitleComics">
                                    <span title="${el.title}"> ${el.title} </span>
                                </div>
                                <div class="containerDescriptionComics">
                                    <p> ${el.description ?? 'No Information'} </p>
                                </div>
                            </div>`;
        })

        containerComics.insertAdjacentHTML("beforeend", comicsHTML);
    })
}

function removeClass (img) {
    img.classList.remove('backgroundImg');
}


function getEventsHero() {   // get the main events
    const containerEvents = document.querySelector('.containerEvents');
    
    if(!urlEvent.includes('https')) {
        urlEvent = urlEvent.replace("http://", "https://")
    }
    
    async function reqEvents () {
        const request = await reqLink(`${urlEvent}?limit=18&orderBy=-startDate&`);
        return request; 
    }

    reqEvents().then((resp) => {
        const result = resp.data.results;
        let eventsHTML = ''; 

        if(result.length < 1) {
            const titleEvents = document.querySelector('.titleEvents');
            titleEvents.style.display = 'none';
            return false;
        }

        result.forEach(el => {
            let urlImg = el.thumbnail.path.includes('image_not_avai') ? idHeroFavorite.srcImgHero : `${el.thumbnail.path}.${el.thumbnail.extension}`; 
            eventsHTML += ` <div>
                                <div class="containerImgComics">
                                    <img class="imagenzinha" src="${urlImg}" onload="removeClass(this)">
                                </div>
                                <div class="containerTitleComics">
                                    <span title="${el.title}"> ${el.title} </span>
                                </div>
                                <div class="containerDescriptionComics">
                                    <p> ${el.description ?? 'No Information'} </p>
                                </div>
                            </div>`;
        })

        containerEvents.insertAdjacentHTML("beforeend", eventsHTML);
    })
}

function generateImg (btn) {  // function to generate an image via text that the user has entered
    const valueInput = document.querySelector('#valueGenerate').value;
    const containerGenerateImg = document.querySelector('.containerGenerateImg');
    const containerImg = document.querySelector('.containerImg');

    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    btn.disabled = true;
    
    if(valueInput.toLowerCase().includes(nameHeroFavorite.toLowerCase())) {
        const image = document.querySelector('.containerImgGenerated img');
        generatorImgHero(valueInput.value, nameHeroFavorite).then((resp) => {
            image.src = resp.output_url;
            containerGenerateImg.style.display = 'none';
            containerImg.style.display = 'contents';
            
            let srcImgHeroGenerated = {
                srcImgGenerated: resp.output_url
            }

            btn.innerHTML = 'Gerar';
            btn.disabled = false;

            localStorage.setItem('srcImgHeroSelected', JSON.stringify(srcImgHeroGenerated));
        })
    } else {
        const error = document.querySelector('.containerGenerateImg p');
        error.style.display = 'block';
        error.classList.add('animate__flash');

        setTimeout(() => {
            error.style.display = 'none';
            error.classList.remove('animate__flash');
            btn.innerHTML = 'Gerar';
            btn.disabled = false;
        }, 5000);

        containerGenerateImg.style.display = 'flex';
        containerImg.style.display = 'none';
    }
}

function checkGeneratedImage () {  //checks in localStorage if there is already an image generated by the user
    const containerGenerateImg = document.querySelector('.containerGenerateImg');
    const containerImg = document.querySelector('.containerImg');
    const image = document.querySelector('.containerImgGenerated img');

    const dataImg = JSON.parse(localStorage.getItem('srcImgHeroSelected'));

    if(dataImg == null || dataImg == '') {
        containerGenerateImg.style.display = 'flex';
        containerImg.style.display = 'none';
    } else {
        image.src = dataImg.srcImgGenerated;
        containerGenerateImg.style.display = 'none';
        containerImg.style.display = 'contents';
    }
}

function downloadImg () { //downloads the user-generated image
    const srcImg = document.querySelector('#imgGenerated');

    fetch(srcImg.src)
    .then(response => response.blob())
    .then(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'example-image.jpg');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

// localStorage.removeItem('srcImgHeroSelected');