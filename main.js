// let languageOption = document.querySelectorAll('select');
// // let fromText       = document.querySelector('.fromText');
// let fromcontent = languageOption[0].value;
// let trantext = document.querySelector('.Translate');

// languageOption.forEach((get, con) => {
//     for(let countryCode in lang){

//         let selected;
//         if(con == 0 && countryCode == "en-GB"){
//             selected = "selected";
//         }else if(con == 1 && countryCode == "hi-IN"){
//             selected = "selected";
//         }

//         let option = `<option value="${countryCode}" ${selected}>${lang[countryCode]}</option>`;
//         get.insertAdjacentHTML('beforeend',option)

//     }
// })
// fromText.addEventListener('input',function(){
//     let content = fromText.value;
//     fromcontent-languageOption[0].value;
//     transcontent = languageOption[1].value;

//     let transLINK =`https://api.mymemory.translated.net/get?q=${content}!&langpair=${fromcontent}|${transcontent}`;

//     fetch(transLINK).then(translate => translate.json()).then(data =>{
//         trantext.value = data.responseData.translatedText;
//     })

// })

let languageOption = document.querySelectorAll('select');
let fromText       = document.querySelector('.fromText');
let trantext       = document.querySelector('.Translate');
let fronvoice      = document.querySelector('.from');
let tovoice        = document.querySelector('.to');
let cpbtn = document.querySelector('.bx-copy');
let wordcounter=document.querySelector('.code_length');
let transfera=document.querySelector('.bx-transfer');


languageOption.forEach((get, con) => {
    for(let countryCode in lang){

        let selected = "";
        if(con === 0 && countryCode === "en-GB"){
            selected = "selected";
        } else if(con === 1 && countryCode === "hi-IN"){
            selected = "selected";
        }

        let option = `<option value="${countryCode}" ${selected}>${lang[countryCode]}</option>`;
        get.insertAdjacentHTML('beforeend', option);
    }
});

fromText.addEventListener('input', function() {
    let content = fromText.value;
    let fromcontent = languageOption[0].value;  // Corrected assignment
    let transcontent = languageOption[1].value;

    let transLINK = `https://api.mymemory.translated.net/get?q=${content}!&langpair=${fromcontent}|${transcontent}`;

    fetch(transLINK)
        .then(translate => translate.json())
        .then(data => {
            trantext.value = data.responseData.translatedText;
        })
        .catch(error => {
            console.error("Error fetching translation:", error);
            trantext.value = "Translation failed.";
        });
});

fronvoice.addEventListener('click',function(){
    let fromtalk;
    fromtalk = new SpeechSynthesisUtterance(fromText.value);
    fromtalk.lang = languageOption[0].value;
    speechSynthesis.speak(fromtalk)
})

tovoice.addEventListener('click',function(){
    let fromtalk;
    fromtalk      = new SpeechSynthesisUtterance(trantext.value);
    fromtalk.lang = languageOption[1].value;
    speechSynthesis.speak(fromtalk)

})

cpbtn.addEventListener('click',function() {
    navigator.clipboard.writeText(trantext.value);
})
fromText.addEventListener('keyup',function(){
    wordcounter.innerHTML = `${fromText.value.length}/5000`;

})
transfera.addEventListener('click',function(){
    let tempopt = fromText.value;
    fromText.value=trantext.value;
    trantext.value=tempopt;

    let tempoopt =languageOption[0].value;
    languageOption[0].value = languageOption[1].value;
    languageOption[1].value = tempoopt
})