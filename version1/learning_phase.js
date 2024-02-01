document.addEventListener('DOMContentLoaded', function() {
    var jsPsychInstance = initJsPsych({
        override_safe_mode: true
    });

    var speakerImages = [
        'components/icons/Picture1.jpg',
        'components/icons/Picture2.jpg',
        'components/icons/Picture3.jpg',
        'components/icons/Picture4.jpg',
        'components/icons/Picture5.jpg',
        'components/icons/Picture6.jpg',
        'components/icons/Picture7.jpg',
        'components/icons/Picture8.jpg',
    ];

    var centralImageData = [
        {
            image: 'components/pictures/karve.jpg',
            audioFiles: [
                'components/audio_files/F1_karve.wav',
                'components/audio_files/F2_karve.wav',
                'components/audio_files/F3_karve.wav',
                'components/audio_files/F4_karve.wav',
                'components/audio_files/M1_karve.wav',
                'components/audio_files/M2_karve.wav',
                'components/audio_files/M3_karve.wav',
                'components/audio_files/M4_karve.wav'
            ]
        },
        {
            image: 'components/pictures/kiskis.jpg',
            audioFiles: [
                'components/audio_files/F1_kiskis.wav',
                'components/audio_files/F2_kiskis.wav',
                'components/audio_files/F3_kiskis.wav',
                'components/audio_files/F4_kiskis.wav',
                'components/audio_files/M1_kiskis.wav',
                'components/audio_files/M2_kiskis.wav',
                'components/audio_files/M3_kiskis.wav',
                'components/audio_files/M4_kiskis.wav'
            ]
        },
        {
            image: 'components/pictures/knyga.jpg',
            audioFiles: [
                'components/audio_files/F1_knyga.wav',
                'components/audio_files/F2_knyga.wav',
                'components/audio_files/F3_knyga.wav',
                'components/audio_files/F4_knyga.wav',
                'components/audio_files/M1_knyga.wav',
                'components/audio_files/M2_knyga.wav',
                'components/audio_files/M3_knyga.wav',
                'components/audio_files/M4_knyga.wav'
            ]
        },
        {
            image: 'components/pictures/medis.jpg',
            audioFiles: [
                'components/audio_files/F1_medis.wav',
                'components/audio_files/F2_medis.wav',
                'components/audio_files/F3_medis.wav',
                'components/audio_files/F4_medis.wav',
                'components/audio_files/M1_medis.wav',
                'components/audio_files/M2_medis.wav',
                'components/audio_files/M3_medis.wav',
                'components/audio_files/M4_medis.wav'
            ]
        },
        {
            image: 'components/pictures/meska.jpg',
            audioFiles: [
                'components/audio_files/F1_meska.wav',
                'components/audio_files/F2_meska.wav',
                'components/audio_files/F3_meska.wav',
                'components/audio_files/F4_meska.wav',
                'components/audio_files/M1_meska.wav',
                'components/audio_files/M2_meska.wav',
                'components/audio_files/M3_meska.wav',
                'components/audio_files/M4_meska.wav'
            ]
        },
        {
            image: 'components/pictures/namas.jpg',
            audioFiles: [
                'components/audio_files/F1_namas.wav',
                'components/audio_files/F2_namas.wav',
                'components/audio_files/F3_namas.wav',
                'components/audio_files/F4_namas.wav',
                'components/audio_files/M1_namas.wav',
                'components/audio_files/M2_namas.wav',
                'components/audio_files/M3_namas.wav',
                'components/audio_files/M4_namas.wav'
            ]
        },
        {
            image: 'components/pictures/raktas.jpg',
            audioFiles: [
                'components/audio_files/F1_raktas.wav',
                'components/audio_files/F2_raktas.wav',
                'components/audio_files/F3_raktas.wav',
                'components/audio_files/F4_raktas.wav',
                'components/audio_files/M1_raktas.wav',
                'components/audio_files/M2_raktas.wav',
                'components/audio_files/M3_raktas.wav',
                'components/audio_files/M4_raktas.wav'
            ]
        },
        {
            image: 'components/pictures/tigras.jpg',
            audioFiles: [
                'components/audio_files/F1_tigras.wav',
                'components/audio_files/F2_tigras.wav',
                'components/audio_files/F3_tigras.wav',
                'components/audio_files/F4_tigras.wav',
                'components/audio_files/M1_tigras.wav',
                'components/audio_files/M2_tigras.wav',
                'components/audio_files/M3_tigras.wav',
                'components/audio_files/M4_tigras.wav'
            ]
        },
        {
            image: 'components/pictures/tortas.jpg',
            audioFiles: [
                'components/audio_files/F1_tortas.wav',
                'components/audio_files/F2_tortas.wav',
                'components/audio_files/F3_tortas.wav',
                'components/audio_files/F4_tortas.wav',
                'components/audio_files/M1_tortas.wav',
                'components/audio_files/M2_tortas.wav',
                'components/audio_files/M3_tortas.wav',
                'components/audio_files/M4_tortas.wav'
            ]
        },
        {
            image: 'components/pictures/vista.jpg',
            audioFiles: [
                'components/audio_files/F1_vista.wav',
                'components/audio_files/F2_vista.wav',
                'components/audio_files/F3_vista.wav',
                'components/audio_files/F4_vista.wav',
                'components/audio_files/M1_vista.wav',
                'components/audio_files/M2_vista.wav',
                'components/audio_files/M3_vista.wav',
                'components/audio_files/M4_vista.wav'
            ]
        },
        {
            image: 'components/pictures/voras.jpg',
            audioFiles: [
                'components/audio_files/F1_voras.wav',
                'components/audio_files/F2_voras.wav',
                'components/audio_files/F3_voras.wav',
                'components/audio_files/F4_voras.wav',
                'components/audio_files/M1_voras.wav',
                'components/audio_files/M2_voras.wav',
                'components/audio_files/M3_voras.wav',
                'components/audio_files/M4_voras.wav'
            ]
        }
    ];

    var timeline = [];
    var totalSelectionCount = 0;  // Counter for the total number of selections made
    var selectionCount = 0; // Counter for selections in the current trial

    function createSpeakerSelectionTrial(centralImage, audioFiles) {
        return {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function() {
                var html = '<div class="container">';
                html += '<div class="speakers">';

                speakerImages.forEach(function(spImage, spIndex) {
                    html += `<img id="speaker_${spIndex}" class="speaker" src="${spImage}" alt="Speaker ${spIndex + 1}" onclick="window.playAudio('${audioFiles[spIndex]}', ${spIndex})">`;
                });

                html += '</div>';
                html += `<div class="center-image"><img src="${centralImage}" alt="Central Image"></div>`;
                html += '</div>';

                return html;
            },
            choices: "NO_KEYS",
            on_load: function() {
                selectionCount = 0; 
            }
        };
    }

    window.playAudio = function(audioFile, speakerIndex) {
        selectionCount++;
        totalSelectionCount++;
        var audio = new Audio(audioFile);
        audio.play();

        document.getElementById(`speaker_${speakerIndex}`).classList.add('active-speaker');

        if (selectionCount >= 8) {
            if (totalSelectionCount >= 88) {
                window.location.href = 'path_to_different_page.html';
            } else {
                jsPsychInstance.finishTrial();
            }
        }
    };

    centralImageData.forEach(function(data) {
        timeline.push(createSpeakerSelectionTrial(data.image, data.audioFiles));
    });

    jsPsychInstance.run(timeline);
});