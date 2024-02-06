const API_KEY = '84638cd93c6e4d5ba30b2c3d7d9a8132';
const API_URL = 'https://api.rebrandly.com/v1/links';

const url = document.querySelector(".insert-url");
const slashtag = document.querySelector(".slashtag");

const btn = document.querySelector('.shorten-btn');
const generatedLinkDiv = document.createElement("div");
const menuIcon = document.querySelector('.bx-menu');
const closeIcon = document.querySelector('.bx-x');

generatedLinkDiv.className = "shorten-link-wrapper";

const validateInputs = () => {
    const urlValue = url.value;
    const slashtagValue = slashtag.value;
    
    if(urlValue === '') {
        setError(url, 'Questo campo è necessario');
    }
    else {
        setSuccess(url);
    }

    if(slashtagValue === '') {
        setError(slashtag, 'Questo campo è necessario');
    }
    else {
        setSuccess(slashtag);
    }
};
const setError = (element, message) => {
    element.placeholder = message;
    element.value = "";
};  
const setSuccess = (element) => {
    element.placeholder = "Successful";
    element.placeholder = "Shortening";
}; 
const headers = {
  'Content-Type': 'application/json',
  'apikey': API_KEY,
};

async function dataFetch(){
    const data = {
        destination: url.value,
        slashtag: slashtag.value,
        domain: {
          fullName: ''
        }
    }
    const response = await fetch(API_URL,{
        method: 'POST',   
        headers: headers,
        body: JSON.stringify(data)
    });
    return response.json();
}

function addHeightToSection(){
    const sectionAbout = document.querySelector('.about');
    const sectionHeight = sectionAbout.offsetHeight; 

    const newSectionHeight = sectionHeight + 150; 
    sectionAbout.style.height = newSectionHeight + 'px'; 
}

function createShortenLinkElement(result) {
    const shortenedLinkDiv = document.createElement("div");
    shortenedLinkDiv.className = "shorten-link-wrapper";

    let fullLinkResult = result.destination;
    let shortenedLinkResult = result.shortUrl;

    const fullLink = document.createElement("h5");
    fullLink.className = "full-link";
    fullLink.textContent = fullLinkResult;
    shortenedLinkDiv.append(fullLink);

    const shortenedLink = document.createElement("h5");
    shortenedLink.className = "shortened-link";
    shortenedLink.textContent = shortenedLinkResult;
    shortenedLinkDiv.append(shortenedLink);

    const copyBtn = document.createElement("a");
    copyBtn.className = "copy-btn";
    copyBtn.textContent = "Copy";
    shortenedLinkDiv.append(copyBtn);

    copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(result.shortUrl);
    });

    addHeightToSection();

    return shortenedLinkDiv;
}

async function appendResults(){
    const shortenedLinkDiv = document.querySelector(".shortened-links");
    const numberOfDivs = document.getElementsByClassName("shorten-link-wrapper").length;
    const result = await dataFetch();

    if(!result.ok){
        if(result.errors === undefined && numberOfDivs <= 2 && result.code === undefined){
            shortenedLinkDiv.height = "30em";
            const generatedLinkDiv = createShortenLinkElement(result);
            shortenedLinkDiv.append(generatedLinkDiv);
        }else{
            setError(url, "Puoi shortare solo 3 link");
            setError(slashtag, "Refresha la pagina :)");
        }
    }else{
        setError(url, "Errore nella richiesta");
        setError(slashtag, "Inserisci nuovo slashtag");
    }
}

btn.addEventListener("click", async(e)=>{
    e.preventDefault();
    validateInputs();
    appendResults();
});

menuIcon.addEventListener("click", () =>{
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = "flex";
});

closeIcon.addEventListener("click", () =>{
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "none";
});
