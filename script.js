document.addEventListener('DOMContentLoaded', function() {
    const piano = document.querySelector('.piano');
    const volumeControl = document.getElementById('volume');
    const showLettersToggle = document.getElementById('showLetters');
    let audioContext;
    let sounds = {};
    let globalVolume = 0.5;

    // Initialiser les sons
    function initSounds() {
        const notes = [
            { key: 'W', note: 'FAIRE', file: 'FAIRE.mp3' },
            { key: 'E', note: 'RE', file: 'RE.mp3' },
            { key: 'D', note: 'MI', file: 'MI.mp3' },
            { key: 'F', note: 'FA', file: 'FA.mp3' },
            { key: 'G', note: 'SOL', file: 'SOL.mp3' },
            { key: 'Y', note: 're', file: 're.mp3' },
            { key: 'H', note: 'MI', file: 'MI.mp3' },
            { key: 'J', note: 'LA', file: 'LA.mp3' },
            { key: 'K', note: 'SI', file: 'SI.mp3' },
            { key: 'L', note: 'FAIRE', file: 'FAIRE.mp3' },
            { key: 'O', note: 'SOL', file: 'SOL.mp3' },
            { key: 'P', note: 'LA', file: 'LA.mp3' },
            { key: ';', note: 'CONCERNANT', file: 'CONCERNANT.mp3' }
        ];

        notes.forEach(note => {
            sounds[note.key] = new Audio(`sons/${note.file}`);
        });
    }

    // Jouer une note
    function playNote(key) {
        if (sounds[key]) {
            sounds[key].currentTime = 0;
            sounds[key].volume = globalVolume;
            sounds[key].play();
            
            // Ajouter la classe active à la touche
            const keyElement = document.querySelector(`[data-key="${key}"]`);
            if (keyElement) {
                keyElement.classList.add('active');
                setTimeout(() => {
                    keyElement.classList.remove('active');
                }, 200);
            }
        }
    }

    // Gérer le clic sur une touche
    piano.addEventListener('click', function(e) {
        const keyElement = e.target.closest('.white-key, .black-key');
        if (keyElement) {
            const key = keyElement.dataset.key;
            playNote(key);
        }
    });

    // Gérer les touches du clavier
    document.addEventListener('keydown', function(e) {
        const key = e.key.toUpperCase();
        if (sounds[key]) {
            playNote(key);
            e.preventDefault();
        }
    });

    // Gérer le volume
    volumeControl.addEventListener('input', function() {
        globalVolume = parseFloat(this.value);
    });

    // Gérer l'affichage des lettres
    showLettersToggle.addEventListener('change', function() {
        if (this.checked) {
            piano.classList.remove('hide-letters');
        } else {
            piano.classList.add('hide-letters');
        }
    });

    // Initialiser
    initSounds();
});