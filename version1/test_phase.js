document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start');
    const recordButton = document.getElementById('record');
    const nextButton = document.getElementById('next');
    const instructionsDiv = document.getElementById('instructions');
    const testContentDiv = document.getElementById('test-content');
    const testImage = document.getElementById('test-image');
    const recordingStatus = document.getElementById('recording-status');

    let currentImageIndex = 0;

    const images = [
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
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function startTest() {
        instructionsDiv.style.display = 'none';
        testContentDiv.style.display = 'block';
        shuffleArray(images);
        displayImage();
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
            testContentDiv.innerHTML = '<p>Test completed. Thank you!</p>';
        }
    }

    function startRecording() {
        recordingStatus.style.display = 'inline';
        console.log('Recording started for ' + images[currentImageIndex].label + '...');
        setTimeout(stopRecording, 200); // Adjust recording duration
    }

    function stopRecording() {
        recordingStatus.style.display = 'none';
        console.log('Recording stopped.');
        recordButton.style.display = 'none';
        nextButton.style.display = 'inline';
    }

    startButton.addEventListener('click', startTest);

    recordButton.addEventListener('click', function() {
        startRecording();
    });

    nextButton.addEventListener('click', function() {
        currentImageIndex++;
        displayImage();
    });
});