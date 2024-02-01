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

    speakers.forEach(function(speaker, index) {
        // Trial to display speakers and add custom click handler
        var speaker_display_trial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function() {
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
    
        var iti_trial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function() {
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
            trial_duration: 2000, // 2 seconds delay
        };
        timeline.push(iti_trial);
    });

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

    jsPsychInstance.run(timeline);
});
