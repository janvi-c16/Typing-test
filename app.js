const typingtext = document.querySelector('.typing-text p');
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistakes span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span')
const btn = document.querySelector('button');

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;


function loadpara() {
    const para = [
        "The quick brown fox jumps over the lazy dog. This sentence contains all the letters of the English alphabet and is commonly used for typing practice.",
        "Pack my box with five dozen liquor jugs. This sentence also includes all the letters of the alphabet, providing a comprehensive typing exercise.",
        "Amazingly few discotheques provide jukeboxes. This phrase is a great example of using every letter in the alphabet with a unique and interesting structure.",
        "Grumpy wizards make toxic brew for the evil queen and jack. This sentence includes all letters, ensuring a varied typing experience.",
        "How quickly daft jumping zebras vex. Another sentence that uses every letter of the alphabet to help improve typing speed and accuracy.",
        "Jinxed wizards pluck ivy from the big quilt. A fun and whimsical sentence that includes all the letters, ideal for typing practice.",
        "My faxed joke won a pager in the cable TV quiz show. This sentence uses all letters and incorporates modern technology for a contemporary touch.",
        "Bright vixens jump; dozy fowl quack. This phrase provides a compact and efficient way to practice typing all the letters of the alphabet.",
        "Sphinx of black quartz, judge my vow. This sentence uses all letters and offers a unique and challenging typing experience.",
        "Quick zephyrs blow, vexing daft Jim. This sentence is perfect for practicing all the letters of the alphabet in a concise format."
    ];
    
    const randIndex = Math.floor(Math.random()*para.length);
    typingtext.innerHTML = '';
    for(let char of para[randIndex]) {
        typingtext.innerHTML += `<span>${char}</span>`;
    }
    typingtext.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown', () => input.focus());
    typingtext.addEventListener("click", () => input.focus());
}

function initTyping() {
    const char = typingtext.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    if(charIndex < char.length && timeLeft > 0) {

        if(!isTyping) {
            timer = setInterval(initTime, 1000);
            isTyping=true;
        }

        if(char[charIndex].innerText === typedChar) {
            char[charIndex].classList.add('Correct');
            console.log("correct");
        }
        else {
            mistake++;
            char[charIndex].classList.add('incorrect');
            console.log("incorrect")
        }
        charIndex++;
        char[charIndex].classList.add('active');
        mistakes.innerText = mistake;
        cpm.innerText = charIndex-mistake;
    } else {
        clearInterval(timer);
        input.value = '';
    }
}

function initTime() {
    if(timeLeft>0) {
        timeLeft--;
        time.innerText = timeLeft;
        let wpmVal = Math.round(((charIndex - mistake)/5) / (maxTime - timeLeft)*60);
        wpm.innerHTML = wpmVal;
    }
    else {
        clearInterval(timer);
    }
}

function reset() {
    loadpara();
    clearInterval(timer);
    timeLeft =maxTime;
    time.innerText = timeLeft;
    input.value ='';
    charIndex = 0;
    mistake =0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText =0;
    mistakes.innerHTML =0;
}

input.addEventListener("input", initTyping)

btn.addEventListener("click", reset);
loadpara();
