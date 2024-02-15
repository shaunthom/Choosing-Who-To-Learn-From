document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('startBtn');
    const instructionsDiv = document.getElementById('instructionsDiv');
    const imagesContainer = document.getElementById('imagesContainer');
    const audio = document.getElementById('labelAudio');

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

    let currentAudioIndex = 0;
    let isClickable = true;

    startBtn.addEventListener('click', function() {
        startExperiment();
    });

    function shuffleArray(array) {
        let shuffled = [];
        let previousLabel = "";

        while (array.length > 0) {
            let randomIndex = Math.floor(Math.random() * array.length);
            let item = array[randomIndex];

            if (item.label === previousLabel && array.length > 1) {

                continue;
            }

            shuffled.push(item);
            previousLabel = item.label;
            array.splice(randomIndex, 1);
        }

        return shuffled;
    }

    function startExperiment() {
        instructionsDiv.style.display = 'none';
        imagesContainer.style.display = 'grid';
        imagesContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';
        imagesContainer.style.gap = '50px';
        loadImages();
        audioFiles = shuffleArray([...audioFiles]);
        setTimeout(playAudioFile, 3000); 
    }

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

    function handleImageClick(event) {
        if (!isClickable) return;

        event.target.style.border = '5px solid yellow';
        setClickability(false);

        setTimeout(() => {
            
            event.target.style.border = '5px solid transparent';
        }, 350); // Change Border visiblity here - currently set for 350 milliseconds

        setTimeout(() => {
            if (currentAudioIndex < audioFiles.length - 1) {
                currentAudioIndex++;
                event.target.style.border = 'none';
                playAudioFile();
            } else {
                console.log("Experiment completed.");
            }
        }, 2000);
    }

    function setClickability(state) {
        isClickable = state;
        const allImages = document.querySelectorAll('.clickable-image');
        allImages.forEach(img => {
            img.style.pointerEvents = state ? 'auto' : 'none';
        });
    }
});