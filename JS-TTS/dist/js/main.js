


const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const rate = document.querySelector('#rate');
const voiceSelect = document.querySelector('#voice-select');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');


//Init SpeechSynth API

const synth = window.speechSynthesis;

// Init voices array

let voices = [];

function getVoices()
{
    voices = synth.getVoices();

    // loop through voices and create an option for each one

    voices.forEach(voice => {

        // create an option element

        const option = document.createElement('option');

        // fill option with voice and language

        option.textContent = voice.name + '('+ voice.lang +')';

        // set needed option attributes

        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);

    });

};


getVoices();

if(synth.onvoiceschanged !== undefined)
{
    synth.onvoiceschanged = getVoices;

}



const speak = () => {


    // check if speaking

    if(synth.speaking)
    {
        console.error('Already speaking');
        return;
    }

    if(textInput.value !== '')
    {
        // Get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        // speak end

        speakText.onend = e => {

            console.log('done speaking');
        }


        speakText.onerror = e => {

            console.error('something went wrong');
        }

        // Selected voice
        const SelectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // loop through voices

        voices.forEach(voice => {
            if(voice.name === SelectedVoice)
            {
                speakText.voice = voice;
            }
        });

        // set pitch and rate

        speakText.rate = rate.value;
        speakText.pitch = pitch.value;


        //speak 

        synth.speak(speakText);
    }


};

//Event Listener


// Text form submit

textForm.addEventListener('submit', e => {

    e.preventDefault();
    speak();
    textInput.blur();
});

// Rate value changer

rate.addEventListener('change', e => { rateValue.textContent = rate.value;});


// Pitch Value change

pitch.addEventListener('change', e => { pitchValue.textContent = pitch.value;});

// voice select change

voiceSelect.addEventListener('change', e => { speak()});


