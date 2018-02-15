
/*
*
* Script JS partie SpeechSynthesis
*
*/


var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');
var inputTxt = document.querySelector('.txt');
//var inputTxt= document.querySelector("#StatutJeu");
var voiceSelect = document.querySelector('select');

var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');

var voices = [];

function populateVoiceList() {
  voices = synth.getVoices();
  
  var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = '';
  for(i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(){
  if(inputTxt.value !== ''){
    var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for(i = 0; i < voices.length ; i++) {
      if(voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
  }
}


inputForm.onsubmit = function(event) {
  event.preventDefault();

  speak();

  inputTxt.blur();
}


pitch.onchange = function() {
  pitchValue.textContent = pitch.value;
}

rate.onchange = function() {
  rateValue.textContent = rate.value;
}

voiceSelect.onchange = function(){
  speak();
}

/*
*
* Script JS partie SpeechRecognition
*
*/


var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent



var choices = [ 'marron ou 1,1' , 'rose ou 1,2', 'bleu ou 1,3', 'vert ou 2,1', 'blanc ou 2,2', 'violet ou 2,3', 'gris ou 3,1', 'jaune ou 3,2', 'rouge ou 3,3'];
var grammar = '#JSGF V1.0; grammar choices; public <choice> = ' + choices.join(' | ') + ' ;'
var choix;

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
//recognition.continuous = false;
//recognition.lang = 'en-US';
recognition.lang = 'fr-fr';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
// var bg = document.querySelector('html');
var hints = document.querySelector('.hints');

var choiceHTML= '';
choices.forEach(function(v, i){
    console.log(v, i);
    choiceHTML += '<br> ' + v + ' </br>';
});
hints.innerHTML = 'Cliquez droit pour activer la reconnaissance vocale et dite votre choix parmis : '+ choiceHTML ;


document.body.onmousedown = function() {
    recognition.start();
    console.log('Ready to receive a color command.');
}

recognition.onresult = function(event) {
    // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
    // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
    // It has a getter so it can be accessed like an array
    // The [last] returns the SpeechRecognitionResult at the last position.
    // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
    // These also have getters so they can be accessed like arrays.
    // The [0] returns the SpeechRecognitionAlternative at position 0.
    // We then return the transcript property of the SpeechRecognitionAlternative object

    var last = event.results.length - 1;
    var choice = event.results[last][0].transcript;

    diagnostic.textContent =  choice ;
    choix=choice;


    console.log('Confidence: ' + event.results[0][0].confidence);
}
recognition.onspeechend = function() {
    recognition.stop();
}

recognition.onnomatch = function(event) {
    diagnostic.textContent = "I didn't recognise that color.";
}

recognition.onerror = function(event) {
    diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}




/*
*
* Script JS partie Tic Tac Toe
*
*/
function estValide(button)
{
    return button.innerHTML.length == 0;
}

function setSymbol(btn, symbole)
{
    btn.innerHTML = symbole;
}

function rechercherVainqueur(pions, joueurs, tour)
{
    if (pions[0].innerHTML == joueurs[tour] &&
        pions[1].innerHTML == joueurs[tour] &&
        pions[2].innerHTML == joueurs[tour])
    {
        pions[0].style.backgroundColor = "#9ACD32";
        pions[1].style.backgroundColor = "#9ACD32";
        pions[2].style.backgroundColor = "#9ACD32";
        return true;
    }

    if (pions[3].innerHTML == joueurs[tour] &&
        pions[4].innerHTML == joueurs[tour] &&
        pions[5].innerHTML == joueurs[tour])
    {
        pions[3].style.backgroundColor = "#9ACD32";
        pions[4].style.backgroundColor = "#9ACD32";
        pions[5].style.backgroundColor = "#9ACD32";
        return true;
    }

    if (pions[6].innerHTML == joueurs[tour] &&
        pions[7].innerHTML == joueurs[tour] &&
        pions[8].innerHTML == joueurs[tour])
    {
        pions[6].style.backgroundColor = "#9ACD32";
        pions[7].style.backgroundColor = "#9ACD32";
        pions[8].style.backgroundColor = "#9ACD32";
        return true;
    }

    if (pions[0].innerHTML == joueurs[tour] &&
        pions[3].innerHTML == joueurs[tour] &&
        pions[6].innerHTML == joueurs[tour])
    {
        pions[0].style.backgroundColor = "#9ACD32";
        pions[3].style.backgroundColor = "#9ACD32";
        pions[6].style.backgroundColor = "#9ACD32";
        return true;
    }

    if (pions[1].innerHTML == joueurs[tour] &&
        pions[4].innerHTML == joueurs[tour] &&
        pions[7].innerHTML == joueurs[tour])
    {
        pions[1].style.backgroundColor = "#9ACD32";
        pions[4].style.backgroundColor = "#9ACD32";
        pions[7].style.backgroundColor = "#9ACD32";
        return true;
    }

    if (pions[2].innerHTML == joueurs[tour] &&
        pions[5].innerHTML == joueurs[tour] &&
        pions[8].innerHTML == joueurs[tour])
    {
        pions[2].style.backgroundColor = "#9ACD32";
        pions[5].style.backgroundColor = "#9ACD32";
        pions[8].style.backgroundColor = "#9ACD32";
        return true;
    }

    if (pions[0].innerHTML == joueurs[tour] &&
        pions[4].innerHTML == joueurs[tour] &&
        pions[8].innerHTML == joueurs[tour])
    {
        pions[0].style.backgroundColor = "#9ACD32";
        pions[4].style.backgroundColor = "#9ACD32";
        pions[8].style.backgroundColor = "#9ACD32";
        return true;
    }

    if (pions[2].innerHTML == joueurs[tour] &&
        pions[4].innerHTML == joueurs[tour] &&
        pions[6].innerHTML == joueurs[tour])
    {
        pions[2].style.backgroundColor = "#9ACD32";
        pions[4].style.backgroundColor = "#9ACD32";
        pions[6].style.backgroundColor = "#9ACD32";
        return true;
    }
}


function chercherVainqueur(bouttons, joueurs, tour)
{
    if (bouttons[0].innerHTML == joueurs[tour] &&
        bouttons[1].innerHTML == joueurs[tour] &&
        bouttons[2].innerHTML == joueurs[tour])
    {
        bouttons[0].style.backgroundColor = "#9ACD32";
        bouttons[1].style.backgroundColor = "#9ACD32";
        bouttons[2].style.backgroundColor = "#9ACD32";
        return true;
    }

    if (bouttons[3].innerHTML == joueurs[tour] &&
        bouttons[4].innerHTML == joueurs[tour] &&
        bouttons[5].innerHTML == joueurs[tour])
    {
        bouttons[3].style.backgroundColor = "#9ACD32";
        bouttons[4].style.backgroundColor = "#9ACD32";
        bouttons[5].style.backgroundColor = "#9ACD32";
        return true;
    }

    if (bouttons[6].innerHTML == joueurs[tour] &&
        bouttons[7].innerHTML == joueurs[tour] &&
        bouttons[8].innerHTML == joueurs[tour])
    {
        bouttons[6].style.backgroundColor = "#9ACD32";
        bouttons[7].style.backgroundColor = "#9ACD32";
        bouttons[8].style.backgroundColor = "#9ACD32";
        return true;
    }

    if (bouttons[0].innerHTML == joueurs[tour] &&
        bouttons[3].innerHTML == joueurs[tour] &&
        bouttons[6].innerHTML == joueurs[tour])
    {
        bouttons[0].style.backgroundColor = "#9ACD32";
        bouttons[3].style.backgroundColor = "#9ACD32";
        bouttons[6].style.backgroundColor = "#9ACD32";
        return true;
    }

    if (bouttons[1].innerHTML == joueurs[tour] &&
        bouttons[4].innerHTML == joueurs[tour] &&
        bouttons[7].innerHTML == joueurs[tour])
    {
        bouttons[1].style.backgroundColor = "#9ACD32";
        bouttons[4].style.backgroundColor = "#9ACD32";
        bouttons[7].style.backgroundColor = "#9ACD32";
        return true;
    }

    if (bouttons[2].innerHTML == joueurs[tour] &&
        bouttons[5].innerHTML == joueurs[tour] &&
        bouttons[8].innerHTML == joueurs[tour])
    {
        bouttons[2].style.backgroundColor = "#9ACD32";
        bouttons[5].style.backgroundColor = "#9ACD32";
        bouttons[8].style.backgroundColor = "#9ACD32";
        return true;
    }

    if (bouttons[0].innerHTML == joueurs[tour] &&
        bouttons[4].innerHTML == joueurs[tour] &&
        bouttons[8].innerHTML == joueurs[tour])
    {
        bouttons[0].style.backgroundColor = "#9ACD32";
        bouttons[4].style.backgroundColor = "#9ACD32";
        bouttons[8].style.backgroundColor = "#9ACD32";
        return true;
    }

    if (bouttons[2].innerHTML == joueurs[tour] &&
        bouttons[4].innerHTML == joueurs[tour] &&
        bouttons[6].innerHTML == joueurs[tour])
    {
        bouttons[2].style.backgroundColor = "#9ACD32";
        bouttons[4].style.backgroundColor = "#9ACD32";
        bouttons[6].style.backgroundColor = "#9ACD32";
        return true;
    }
}

function matchNul(bouttons)
{
    for (var i = 0, len = bouttons.length; i < len; i++)
    {
        if (bouttons[i].innerHTML.length == 0)
            return false;
    }

    return true;
}

var Afficheur = function(element)
{
    var affichage = element;

    function setText(message)
    {
        affichage.innerHTML = message;

    }

    return {sendMessage : setText};
}



/*
*
* Script JS du la fonction main()
*
*/

function main() {
    var bouttons = document.querySelectorAll("#Jeu button");
    // var pions = document.querySelectorAll("#Jeu button");
    var joueurs = ['X', 'O'];
    var tour = 0;
    var jeuEstFini = false;
    var afficheur = new Afficheur(document.querySelector("#StatutJeu"));
    afficheur.sendMessage("Le jeu peut commencer ! <br /> Joueur " + joueurs[tour] + " c'est votre tour.");

    inputTxt.value = "Le jeu peut commencer ! Joueur " + joueurs[tour] + " c'est votre tour.";
    var boutton;


    document.body.addEventListener("dblclick", function () {
        if (choix == 'marron' || choix == '1,1') {  //en haut, à gauche

            boutton = bouttons[0];

        }
        else if (choix == 'rose' || choix == '1,2') { //1,2; en haut, au centre
            boutton = bouttons[1];
        }
        else if (choix == 'bleu' || choix == '1,3') {  //1,3; en haut, à droite
            boutton = bouttons[2];
        }
        else if (choix == 'vert' || choix == '2,1') {  //2,1; au centre, à gauche
            boutton = bouttons[3];
        }
        else if (choix == 'blanc' || choix == '2,2') {  //2,2; au centre
            boutton = bouttons[4];

        }
        else if (choix == 'violet' || choix == '2,3') {  //2,3; au centre, à droite
            boutton = bouttons[5];
        }
        else if (choix == 'gris' || choix == '3,1') {  //3,1; en bas, à gauche
            boutton = bouttons[6];
        }
        else if (choix == 'jaune' || choix == '3,2') {  //3,2; en bas, au centre
            boutton = bouttons[7];
        }
        else if (choix == 'rouge' || choix == '3,3') {  //3,3; en bas, à droite
            boutton = bouttons[8];
        }

        else if (choix != 'rouge' || choix != 'jaune' || choix != 'gris' || choix != 'violet' || choix != 'blanc' || choix != 'vert' || choix != 'bleu' || choix != 'rose' || choix != 'marron' ||
            choix != '1,1' || choix != '1,2' || choix != '1,3' || choix != '2,1' || choix != '2,2' || choix != '2,3' || choix != '3,1' || choix != '3,2' || choix != '3,3') {

            afficheur.sendMessage("Case non valide ! Joueur " + joueurs[tour] + ", veuillez rejouer !");
            inputTxt.value = "Case non valide ! Joueur " + joueurs[tour] + " veuillez rejouer !";
            speak();
        }

        if (jeuEstFini)
            return;

        if (!estValide(boutton)) {

            afficheur.sendMessage("Case occupée ! Joueur " + joueurs[tour] + ", veuillez rejouer !");
            inputTxt.value = "Case occupée ! Joueur " + joueurs[tour] + " veuillez rejouer !";
            speak();

        }
        else {

            setSymbol(boutton, joueurs[tour]);
            jeuEstFini = chercherVainqueur(bouttons, joueurs, tour);


            if (jeuEstFini) {

                afficheur.sendMessage("Le joueur " + joueurs[tour] + " a gagné ! <a href=\"Morpion.html\">Nouvelle partie ?</a>");
                inputTxt.value = "Le joueur " + joueurs[tour] + " a gagné !";
                speak();
                return;
            }

            if (matchNul(bouttons)) {

                afficheur.sendMessage("Match Nul ! <a href=\"Morpion.html\">Nouvelle partie ?</a>");
                inputTxt.value = "Match Nul ! Voulez-vous rejouer ?";
                speak();
                return;
            }

            tour++;
            tour = tour % 2;
            afficheur.sendMessage("Joueur " + joueurs[tour] + ", c'est à vous !");
            inputTxt.value = "Joueur " + joueurs[tour] + " c'est à vous !";
            speak();
        }


    });


}
main();

