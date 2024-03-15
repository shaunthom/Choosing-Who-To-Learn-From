<?php
include('database_config.php');

header('Content-Type: application/json');

if(isset($_POST['participant_id'], $_POST['trial_id'], $_POST['trial_name']) && isset($_FILES['audio_data'])) {
    $participantId = $_POST['participant_id'];
    $trialNumber = $_POST['trial_id'];
    $trialName = $_POST['trial_name'];
    $audioData = $_FILES['audio_data']; 

    $newFileName = "participant_{$participantId}_trial_{$trialNumber}.wav";
    $uploadDir = 'uploads/';
    $uploadFile = $uploadDir . $newFileName;

    if(move_uploaded_file($audioData['tmp_name'], $uploadFile)) {
        
        $conn = new PDO("mysql:host=$servername;dbname=learning_experiment;charset=utf8mb4", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $stmt = $conn->prepare("INSERT INTO audio_responses (participant_id, trial_number, trial_name, audio_response) VALUES (:participantId, :trialNumber, :trialName, :audioDataPath)");
        
        $stmt->bindParam(':participantId', $participantId);
        $stmt->bindParam(':trialNumber', $trialNumber);
        $stmt->bindParam(':trialName', $trialName);
        $stmt->bindParam(':audioDataPath', $uploadFile);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Audio Response Data successfully inserted"]);
        } else {
            echo json_encode(["message" => "Failed to insert data", "error" => $conn->errorInfo()]);
        }

        $conn = null; // It's a good practice to close the connection
    } else {
        echo json_encode(["message" => "Failed to upload audio file."]);
    }
} else {
    echo json_encode(["message" => "Error: Missing data"]);
}
?>