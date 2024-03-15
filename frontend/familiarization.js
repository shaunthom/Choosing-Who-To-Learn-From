document.addEventListener('DOMContentLoaded', function() {
    var jsPsychInstance = initJsPsych({
        override_safe_mode: true
    });
    var timeline = [];

    // Array of speaker image file paths and corresponding audio file paths
    var speakers = [
        { image: 'components/icons/Picture1.jpg', audio: 'components/audio_files/F1_klounas.wav' },
        { image: 'components/icons/Picture2.jpg', audio: 'components/audio_files/F2_klounas.wav' },
        { image: 'components/icons/Picture3.jpg', audio: 'components/audio_files/F3_klounas.wav' },
        { image: 'components/icons/Picture4.jpg', audio: 'components/audio_files/F4_klounas.wav' },
        { image: 'components/icons/Picture5.jpg', audio: 'components/audio_files/M1_klounas.wav' },
        { image: 'components/icons/Picture6.jpg', audio: 'components/audio_files/M2_klounas.wav' },
        { image: 'components/icons/Picture7.jpg', audio: 'components/audio_files/M3_klounas.wav' },
        { image: 'components/icons/Picture8.jpg', audio: 'components/audio_files/M4_klounas.wav' }
    ];

    // Create an array of indices based on the speakers array to shuffle and randomize trial order
    var indices = speakers.map((_, i) => i);

    // Shuffle function so that participants do not get an urge to click in a circle manner
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Shuffling the indices to randomize the order of speaker trials
    shuffleArray(indices);

    // Loop through the shuffled indices to create trials for each speaker
    indices.forEach(function(index) {
        var speaker = speakers[index];
        // Trial for displaying speakers:
        var speaker_display_trial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function() {

                // Constructing HTML content to display speaker images and the central clown image
                var html = '<div class="container">';
                html += '<div class="speakers">';

                speakers.forEach(function(sp, spIndex) {
                    html += `<img id="speaker_${spIndex}" class="speaker${spIndex === index ? ' active-speaker' : ''}" src="${sp.image}" alt="Speaker ${spIndex + 1}">`;
                });

                html += '</div>';
                html += '<div class="center-image"><img src="components/pictures/klounas.jpg" alt="Clown"></div>';
                html += '</div>';

                return html;
            },
            choices: "NO_KEYS",
            on_load: function() {
                // Next trial is triggered when the active speaker image is clicked
                document.getElementById(`speaker_${index}`).addEventListener('click', function() {
                    jsPsychInstance.nextTrial();
                });
            }
        };
        timeline.push(speaker_display_trial);

        var speaker_audio_trial = {
            type: jsPsychAudioKeyboardResponse,
            stimulus: speaker.audio,
            choices: "NO_KEYS",
            trial_ends_after_audio: true
        };
        timeline.push(speaker_audio_trial);
        
        // Function for a small interval of 2 seconds for a brief pause between speakers
        var iti_trial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function() {
                // Similar to the display trial, but includes a fixed duration
                var html = '<div class="container">';
                html += '<div class="speakers">';

                speakers.forEach(function(sp, spIndex) {
                    html += `<img class="speaker${spIndex === index ? ' active-speaker' : ''}" src="${sp.image}" alt="Speaker ${spIndex + 1}">`;
                });

                html += '</div>';
                html += '<div class="center-image"><img src="components/pictures/klounas.jpg" alt="Clown"></div>';
                html += '</div>';
                return html;
            },
            choices: "NO_KEYS",
            trial_duration: 2000, // 2 seconds delay - Adjust delay here
        };
        timeline.push(iti_trial);
    });

    // Trial to redirect to the next part of the experiment after all speakers have been presented
    var redirect_trial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<p>Redirecting to the next part of the experiment...</p>',
        choices: "NO_KEYS",
        trial_duration: 2000,
        on_finish: function() {
            window.location.href = 'learning_instructions.html';
        }
    };
    timeline.push(redirect_trial);

    // To start the jsPsych experiment
    jsPsychInstance.run(timeline);
});