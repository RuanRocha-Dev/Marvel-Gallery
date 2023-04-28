async function favoritHero (paramHero) { // function that requests in the api through the global js file
    if(paramHero) {
        const request = await reqGeneric(`characters?nameStartsWith=${String(paramHero)}&limit=25&orderBy=name`);  
        return request; 
    }
}

function createLiHeros (nameHero, infosHero) {
    const list = document.createElement('li');
    list.innerHTML = nameHero;
    list.onclick = () => { addHeroFavorite(nameHero, infosHero) };

    return list;
}

const inputSearchHero = document.querySelector('#inputSearchHero');
const ulList = document.querySelector('main ul');

let time = null;
inputSearchHero.oninput = (el) => { //event that adds the results to the list
    if(el.data == null) {
        return false;
    }

    clearTimeout(time);
    time = setTimeout(() => {
        favoritHero(el?.target?.value).then((arrayHeros) => {
            ulList.textContent = '';
            arrayHeros?.data?.results?.forEach(async e => {
                ulList.appendChild(createLiHeros(e.name, e));
            })
        
            if(el.target.value.length == 0) {
                ulList.textContent = '';
                document.querySelector('#imageHero1').style = 'display: none;'; 
                document.querySelector('#imageHero2').style = 'display: none;'; 
            }
        })
    }, 500);
}

function addHeroFavorite (nameHero, infosHero) {
    ulList.textContent = '';
    
    const img1 = document.querySelector('#imageHero1'); 
    const img2 = document.querySelector('#imageHero2'); 
    const spanNameHero = document.querySelector('.containerHeroFavorite span');

    const urlExtense = `${infosHero.thumbnail.path}.${infosHero.thumbnail.extension}`;

    inputSearchHero.value = nameHero;
    if(!infosHero?.thumbnail?.path.includes('not_available')) { //add the hero's image (if any) in the body and set it as a favorite
        let btnSaveHeroFavorite = document.querySelector('#btnSaveHeroFavorite');
        btnSaveHeroFavorite.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

        img1.src = urlExtense;
        img2.src = urlExtense;

        spanNameHero.innerHTML = infosHero?.name;
    
        img1.style = `opacity: 0.6; filter: blur(5px); display: block;`
        img2.style = `display: inherit;`
    } else {
        img1.removeAttribute('src');
        img2.removeAttribute('src');

        spanNameHero.innerHTML = '';
    
        img1.style = '';
        img2.style = '';
    }

    btnSaveHeroFavorite(infosHero?.name, urlExtense, infosHero?.id);
    resizeLogoAndName();
}


let counterImgLoaders = 0;
function loaderImgs () {
    counterImgLoaders++;

    let btnSaveHeroFavorite = document.querySelector('#btnSaveHeroFavorite');

    if(counterImgLoaders >= 2) {
        btnSaveHeroFavorite.innerHTML = 'Vamos lá';
    }
}

function btnSaveHeroFavorite (nameHero, srcImgHero, idHero) { // function that saves favorite hero data in storage
    const btnSaveHeroFavorite = document.querySelector('#btnSaveHeroFavorite');
    const inputSearchHero = document.querySelector('#inputSearchHero');

    btnSaveHeroFavorite.onclick = () => {
        if(localStorage.getItem('heroSelected') != null || (nameHero != '' && srcImgHero != '')) {
            let infosHero = {
                nameHero,
                srcImgHero,
                idHero
            }

            if(inputSearchHero.value != '') {
                localStorage.setItem('heroSelected', JSON.stringify(infosHero));
            } else {
                localStorage.removeItem('heroSelected');
                localStorage.removeItem('srcImgHeroSelected');
            }
        }
    }
    
    localStorage.removeItem('heroSelected');
    localStorage.removeItem('srcImgHeroSelected');
}

window.addEventListener('resize', () => {
    const logoMarvel = document.querySelector('.mvl-animated-logo');
    const infosHero = document.querySelector('.containerHeroFavorite');

    const rect1 = logoMarvel.getBoundingClientRect();
    const rect2 = infosHero.getBoundingClientRect();

    if(rect1.right >= rect2.left) {
        logoMarvel.style = 'visibility: hidden';
    } else {
        logoMarvel.style = '';
    }
})

function resizeLogoAndName () {
    const logoMarvel = document.querySelector('.mvl-animated-logo');
    const infosHero = document.querySelector('.containerHeroFavorite');

    const rect1 = logoMarvel.getBoundingClientRect();
    const rect2 = infosHero.getBoundingClientRect();

    if(rect1.right >= rect2.left) {
        logoMarvel.style = 'visibility: hidden';
    } else {
        logoMarvel.style = '';
    }
}

resizeLogoAndName()

function insertInfoHero () {
    const img1 = document.querySelector('#imageHero1'); 
    const img2 = document.querySelector('#imageHero2'); 
    const spanNameHero = document.querySelector('.containerHeroFavorite span');
    const inputSearchHero = document.querySelector('#inputSearchHero');

    const infosHeroFavorite = JSON.parse(localStorage.getItem('heroSelected'));
    if(infosHeroFavorite != null) {
        img1.src = infosHeroFavorite.srcImgHero;
        img2.src = infosHeroFavorite.srcImgHero;
        spanNameHero.textContent = infosHeroFavorite.nameHero;
        inputSearchHero.value = infosHeroFavorite.nameHero;
    }

    img1.style = `opacity: 0.6; filter: blur(5px); display: block;`;
    img2.style = `display: inherit;`;
}

insertInfoHero();
