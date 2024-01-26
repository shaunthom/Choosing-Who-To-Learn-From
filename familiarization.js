document.addEventListener('DOMContentLoaded', function() {
    var jsPsychInstance = initJsPsych({
        override_safe_mode: true
    });

    var timeline = [];

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
        var speaker_trial = {
            type: jsPsychAudioKeyboardResponse,
            stimulus: speaker.audio,
            prompt: function() {
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
            trial_ends_after_audio: true
        };

        timeline.push(speaker_trial);
    });

    jsPsychInstance.run(timeline);
});
