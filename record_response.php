<?php
session_start();
include('database_config.php');

if(isset($_POST['participantId'], $_POST['trialNumber'], $_POST['audioLabel'], $_POST['selectedLabel'])) {
    $participantId = $_POST['participantId'];
    $trialNumber = $_POST['trialNumber'];
    $audioLabel = $_POST['audioLabel'];
    $selectedLabel = $_POST['selectedLabel'];
    error_log("Received participantId: " . $_POST['participantId']);

    if(empty($participantId) || $participantId == "0") {
        echo "Error: Invalid participant ID";
        exit; // Stop script execution if participant ID is invalid
    }

    // Proceed with database insertion
    $conn = new PDO("mysql:host=$servername;dbname=learning_experiment", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare("INSERT INTO comprehension_responses (participant_id, trial_number, audio_label, selected_label) VALUES (:participantId, :trialNumber, :audioLabel, :selectedLabel)");
    $stmt->bindParam(':participantId', $participantId);
    $stmt->bindParam(':trialNumber', $trialNumber);
    $stmt->bindParam(':audioLabel', $audioLabel);
    $stmt->bindParam(':selectedLabel', $selectedLabel);

    $stmt->execute();
    echo "Response recorded successfully";
} else {
    echo "Error: Missing data";
}
?>