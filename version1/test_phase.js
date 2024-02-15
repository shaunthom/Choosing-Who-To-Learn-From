document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start');
    const recordButton = document.getElementById('record');
    const nextButton = document.getElementById('next');
    const instructionsDiv = document.getElementById('instructions');
    const testContentDiv = document.getElementById('test-content');
    const testImage = document.getElementById('test-image');
    const recordingStatus = document.getElementById('recording-status');
    const downloadsContainer = document.getElementById('downloadsContainer');


    let currentImageIndex = 0;
    let mediaRecorder;
    let audioChunks = [];

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
        { src: 'components/pictures/voras.jpg', label: 'voras' }
    ];

    function shuffleArray(array) {
        
        let indices = array.map((_, index) => index);       
        let shuffled = [];
    
        while (indices.length > 0) {
            let randomIndex = Math.floor(Math.random() * indices.length);
            let chosenIndex = indices[randomIndex];

            if (shuffled.length === 0 || array[chosenIndex].label !== array[shuffled[shuffled.length - 1]].label) {
                shuffled.push(chosenIndex);
                indices.splice(randomIndex, 1);
            } else if (indices.length === 1) {
                [shuffled[shuffled.length - 1], shuffled[shuffled.length - 2]] = [shuffled[shuffled.length - 2], shuffled[shuffled.length - 1]];
                shuffled.push(chosenIndex);
                break;
            }
        }

        return shuffled.map(index => array[index]);
    }

    function startTest() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.ondataavailable = event => {
                    audioChunks.push(event.data);
                };
                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    prepareDownloadLink(audioUrl); // download function
                    audioChunks = []; // Reseting chunks for next recording
                };
                instructionsDiv.style.display = 'none';
                testContentDiv.style.display = 'block';
                images = shuffleArray(images);
                displayImage();
            })
            .catch(error => console.error('Error accessing media devices:', error));
    }


    function displayImage() {
        if (currentImageIndex < images.length) {
            const image = images[currentImageIndex];
            testImage.src = image.src;
            testImage.alt = `Image: ${image.label}`;
            recordButton.style.display = 'inline';
            recordingStatus.style.display = 'none';
            nextButton.style.display = 'none';
        } else {
            testContentDiv.innerHTML = '<p>Audio Phase completed!</p>';
            setTimeout(() => {
                window.location.href = 'comprehension.html';
            }, 2000); // Setting time to 2 seconds before redirecting so that user can see the message
        }
    }

    function startRecording() {
        if (mediaRecorder && mediaRecorder.state === "inactive") {
            mediaRecorder.start();
            recordingStatus.style.display = 'block';
            console.log('Recording started for ' + images[currentImageIndex].label);
            setTimeout(stopRecording, 2000);
        }
    }

    function stopRecording() {
        if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.stop(); // trigger function
            recordingStatus.style.display = 'none';
            recordButton.style.display = 'none';
            nextButton.style.display = 'block';
        }
    }

    function prepareDownloadLink(audioUrl) {
        downloadsContainer.innerHTML = '';

        // Prepare for download
        const audioPlayer = document.createElement('audio');
        const downloadLink = document.createElement('a');
        audioPlayer.src = audioUrl;
        audioPlayer.controls = true;
        downloadLink.href = audioUrl;
        downloadLink.download = `Recording_${new Date().toISOString()}.wav`;
        downloadLink.innerText = 'Download';
        downloadsContainer.appendChild(audioPlayer);
        downloadsContainer.appendChild(downloadLink);
    }

    startButton.addEventListener('click', startTest);
    recordButton.addEventListener('click', startRecording);
    nextButton.addEventListener('click', function() {
        currentImageIndex++;
        if (currentImageIndex >= images.length) {
            stopRecording();
        } else {
            displayImage();
        }
    });
});
