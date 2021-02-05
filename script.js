const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
    {
        image: './img/happy.jpg',
        text: "I am happy" 
    },
    {
        image: './img/surprised.jpg',
        text: "I am surprised" 
    }, 
    {
        image: './img/energized.jpg',
        text: "I am energized" 
    },
    {
        image: './img/confident.jpg',
        text: "I am confident" 
    },
    {
        image: './img/sad.jpg',
        text: "I am sad" 
    },
    {
        image: './img/angry.jpg',
        text: "I am angry" 
    }, 
    {
        image: './img/upset.jpg',
        text: "I am upset" 
    },
    {
        image: './img/annoyed.jpg',
        text: "I am annoyed" 
    },
    {
        image: './img/scared.jpg',
        text: "I am scared" 
    },
    {
        image: './img/hurt.jpg',
        text: "I am hurt" 
    }, 
    {
        image: './img/shy.jpg',
        text: "I am shy" 
    },
    {
        image: './img/curious.jpg',
        text: "I am curious" 
    },
    {
        image: './img/hungry.jpg',
        text: "I am hungry" 
    },
    {
        image: './img/thirsty.jpg',
        text: "I am thirsty" 
    }, 
    {
        image: './img/tired.jpg',
        text: "I am tired" 
    },
    {
        image: './img/sleepy.jpg',
        text: "I am sleepy" 
    },
    {
        image: './img/home.jpg',
        text: "I want to go home" 
    },
    {
        image: './img/outside.jpg',
        text: "I want to go outside" 
    },
    {
        image: './img/school.jpg',
        text: "I want to go to school" 
    }, 
    {
        image: './img/grandma.jpg',
        text: "I want to go to grandmas" 
    }
]

data.forEach(createBox)

// Create speech boxes
function createBox(item) {
    const box = document.createElement('div');
    
    const {image, text} = item; 

    box.classList.add('box');
    box.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="info">${text}</p> 
    `

    box.addEventListener('click', () => {
        setTextMessage(text);
        speakText();

        // Add active effect
        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 800);
    });

    main.appendChild(box);
}

// Init speech synth
const message = new SpeechSynthesisUtterance(); 

// Store voices
let voices = [];

function getVoices() {
    voices = speechSynthesis.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option');

        option.value = voice.name; 
        option.innerText = `${voice.name} ${voice.lang}`

        voicesSelect.appendChild(option);
    });
}

// Set text
function setTextMessage(text) {
    message.text = text; 
}

// Speak text
function speakText() {
    speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle text box
toggleBtn.addEventListener('click', () => 
    document.getElementById('text-box').classList.toggle('show')
);

// Close button
closeBtn.addEventListener('click', () => 
    document.getElementById('text-box').classList.remove('show')
);

// Change voice
voicesSelect.addEventListener('change', setVoice);

// Read text button
readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText();
});

getVoices();