document.addEventListener('DOMContentLoaded', function() {
    // References to HTML elements that will be interacted with
    const startBtn = document.getElementById('startBtn');
    const instructionsDiv = document.getElementById('instructionsDiv');
    const imagesContainer = document.getElementById('imagesContainer');
    const audio = document.getElementById('labelAudio');
    // Retrieve the participant ID stored in the browser's localStorage (generated in learning_phase.js)
    let participantId = localStorage.getItem('participantId');

    let images = [
        { src: 'components/pictures/karve.jpg', label: 'karve'},
        { src: 'components/pictures/kiskis.jpg', label: 'kiskis' },
        { src: 'components/pictures/knyga.jpg', label: 'knyga'},
        { src: 'components/pictures/medis.jpg', label: 'medis' },
        { src: 'components/pictures/meska.jpg', label: 'meska'},
        { src: 'components/pictures/namas.jpg', label: 'namas' },
        { src: 'components/pictures/raktas.jpg', label: 'raktas'},
        { src: 'components/pictures/tigras.jpg', label: 'tigras' },
        { src: 'components/pictures/tortas.jpg', label: 'tortas'},
        { src: 'components/pictures/vista.jpg', label: 'vista' },
        { src: 'components/pictures/voras.jpg', label: 'voras' },
        { src: 'components/pictures/klounas.jpg', label: 'klounas' }
    ];

    let audioFiles = [
        {src: 'components/audio_files/F1_karve.wav', label: 'karve'},
        {src: 'components/audio_files/F1_kiskis.wav', label: 'kiskis'},
        {src: 'components/audio_files/F1_knyga.wav', label: 'knyga'},
        {src: 'components/audio_files/F1_medis.wav', label: 'medis'},
        {src: 'components/audio_files/F1_meska.wav',label: 'meska'},
        {src: 'components/audio_files/F1_namas.wav', label: 'namas'},
        {src: 'components/audio_files/F1_raktas.wav', label: 'raktas'},
        {src: 'components/audio_files/F1_tigras.wav', label: 'tigras'},
        {src: 'components/audio_files/F1_tortas.wav', label: 'tortas'},
        {src: 'components/audio_files/F1_vista.wav', label: 'vista'},
        {src: 'components/audio_files/F1_voras.wav', label: 'voras'},
        {src: 'components/audio_files/F1_karve.wav', label: 'karve'},
        {src: 'components/audio_files/F1_kiskis.wav', label: 'kiskis'},
        {src: 'components/audio_files/F1_knyga.wav', label: 'knyga'},
        {src: 'components/audio_files/F1_medis.wav', label: 'medis'},
        {src: 'components/audio_files/F1_meska.wav', label: 'meska'},
        {src: 'components/audio_files/F1_namas.wav', label: 'namas'},
        {src: 'components/audio_files/F1_raktas.wav', label: 'raktas'},
        {src: 'components/audio_files/F1_tigras.wav', label: 'tigras'},
        {src: 'components/audio_files/F1_tortas.wav', label: 'tortas'},
        {src: 'components/audio_files/F1_vista.wav', label: 'vista'},
        {src: 'components/audio_files/F1_voras.wav', label: 'voras'}
    ];

    // Index to track which audio file is currently being played
    let currentAudioIndex = 0;

    // Boolean to control if images can be clicked or not
    let isClickable = true;

    // Event listener to start the experiment when the start button is clicked
    startBtn.addEventListener('click', function() {
        startExperiment();
    });

    // Shuffling function described below
    function shuffleArray(array) {
        let shuffled = [];
        let previousLabel = "";

        while (array.length > 0) {
            let randomIndex = Math.floor(Math.random() * array.length);
            let item = array[randomIndex];

            // Avoids consecutive items with the same label to ensure pseudo random order
            if (item.label === previousLabel && array.length > 1) {

                continue;
            }

            shuffled.push(item);
            previousLabel = item.label;
            array.splice(randomIndex, 1);
        }

        return shuffled;
    }

    // Starts the experiment: hides instructions and displays images
    function startExperiment() {
        instructionsDiv.style.display = 'none';
        imagesContainer.style.display = 'grid';
        imagesContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';
        imagesContainer.style.gap = '50px';
        loadImages();
        audioFiles = shuffleArray([...audioFiles]);
        setTimeout(playAudioFile, 3000); 
    }

    // Loads and displays images in the DOM
    function loadImages() {
        images.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            imgElement.alt = image.label;
            imgElement.style.width = '100%';
            imgElement.style.height = '140px';
            imgElement.style.objectFit = 'contain';
            imgElement.classList.add('clickable-image');
            imgElement.style.border = '5px solid transparent';
            imgElement.addEventListener('click', handleImageClick);
            imagesContainer.appendChild(imgElement);
        });
    }

    // Plays the current audio file and allows clicks after it ends
    function playAudioFile() {
        if (currentAudioIndex < audioFiles.length) {
            audio.src = audioFiles[currentAudioIndex].src;
            audio.play();
            audio.onended = function() {
                setClickability(true);
            };
        } else {
            console.log("Audio trials completed.");
        }
    }

    // Handles clicks on images by sending the selected response to the XAMPP server
    function handleImageClick(event) {
        if (!isClickable) return; // Ignore clicks if not currently clickable
        
        // Identify the selected label and the label of the current audio
        const selectedLabel = event.target.alt;
        const audioLabel = audioFiles[currentAudioIndex].label;
        const trialNumber = currentAudioIndex + 1;
        
         // HighlightS the selected image
        event.target.style.border = '5px solid yellow';
        setClickability(false); // Disable further clicks until the next audio is played
    
        // Send the participant's response to the server
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '../record_response.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                console.log('Response recorded: ' + this.responseText);
            }
        };
        console.log(`Sending participantId: ${participantId}`);
        xhr.send(`participantId=${encodeURIComponent(participantId)}&trialNumber=${trialNumber}&audioLabel=${encodeURIComponent(audioLabel)}&selectedLabel=${encodeURIComponent(selectedLabel)}`);

        // Reset image border and proceed to next audio after a delay
        setTimeout(() => {
            event.target.style.border = '5px solid transparent';
        }, 350);  // Change Border visiblity here - currently set for 350 milliseconds
    
        setTimeout(() => {
            if (currentAudioIndex < audioFiles.length - 1) {
                currentAudioIndex++;
                playAudioFile();
            } else {
                console.log("Experiment completed. Redirecting...");
                redirectToConclusionPage();
            }
        }, 2000);
    }
    
    function redirectToConclusionPage() {
        window.location.href = 'survey.html';
    }

    // Enables or disables clickability for all images
    function setClickability(state) {
        isClickable = state;
        const allImages = document.querySelectorAll('.clickable-image');
        allImages.forEach(img => {
            img.style.pointerEvents = state ? 'auto' : 'none';
        });
    }
});