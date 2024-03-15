var jsPsychInstance;

// Function to start the experiment
function startExperiment() {
    jsPsychInstance = initJsPsych({
        override_safe_mode: true
    });

    var timeline = [];

    // Instructions trial
    var instructions = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: 'Click on any button and an audio will be played. Listen carefully and type in the word. Failure to type in the correct word will result in a redirection to this page!'
    }; 
    timeline.push(instructions);

    // Audio test trial 1 for 'apple'
    var audio_test_1 = {
        type: jsPsychAudioKeyboardResponse,
        stimulus: 'components/audio_trial/apple_cm.wav',
        choices: "NO_KEYS",
        trial_ends_after_audio: true
    };
    timeline.push(audio_test_1);

    // Text response for 'apple'
    var text_response_apple = {
        type: jsPsychSurveyText,
        questions: [{ prompt: "What word did you hear?", name: 'response', required: true }],
        data: { test: 'apple' }
    };
    timeline.push(text_response_apple);

    // Feedback trial for 'apple'
    var feedback_apple = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: function() {
            return jsPsychInstance.data.getLastTrialData().values()[0].response.response.trim().toLowerCase() === 'apple' 
                ? "<p>Correct!</p>" 
                : "<p>Wrong prompt.</p>";
        },
        choices: "NO_KEYS",
        trial_duration: 2000
    };
    timeline.push(feedback_apple);

    // Audio test trial 2 for 'ball'
    var audio_test_2 = {
        type: jsPsychAudioKeyboardResponse,
        stimulus: 'components/audio_trial/ball_cm.wav',
        choices: "NO_KEYS",
        trial_ends_after_audio: true,
        conditional_function: function() {
            
            return jsPsychInstance.data.getLastTrialData().values()[0].response.response.trim().toLowerCase() === 'apple';
        }
    };
    timeline.push(audio_test_2);

    // Text response for 'ball'
    var text_response_ball = {
        type: jsPsychSurveyText,
        questions: [{ prompt: "What word did you hear?", name: 'response', required: true }],
        data: { test: 'ball', id: 'ball_response' },
        conditional_function: function() {
            
            return jsPsychInstance.data.getLastTrialData(2).values()[0].response.response.trim().toLowerCase() === 'apple';
        }
    };
    timeline.push(text_response_ball);

    // Feedback trial for 'ball'
    var feedback_ball = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: function() {
            return jsPsychInstance.data.getLastTrialData().values()[0].response.response.trim().toLowerCase() === 'ball' 
                ? "<p>Correct!</p>" 
                : "<p>Wrong prompt.</p>";
        },
        choices: "NO_KEYS",
        trial_duration: 2000,
        conditional_function: function() {
            
            return jsPsychInstance.data.getLastTrialData(3).values()[0].response.response.trim().toLowerCase() === 'apple';
        }
    };
    timeline.push(feedback_ball);

    // Final check to reload the page or move to the next phase based on the 'apple' and 'ball' response
    var final_check = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '',
        choices: "NO_KEYS",
        trial_duration: 500,
        on_finish: function() {
            var ballResponseData = jsPsychInstance.data.get().filter({id: 'ball_response'}).last(1).values()[0];
            if (ballResponseData && ballResponseData.response) {
                var lastResponse = ballResponseData.response.response.trim().toLowerCase();
                if (lastResponse !== 'ball') {
                    window.location.reload();
                } else {
                    // Move to the next phase if 'apple' and 'ball' was correctly identified
                    window.location.href = 'familiarization_instructions.html'; 
                }
            } else {
                console.error("Response data for 'ball' not found.");
            }
        }
    };
    timeline.push(final_check);

    jsPsychInstance.run(timeline);
}

document.addEventListener('DOMContentLoaded', startExperiment);