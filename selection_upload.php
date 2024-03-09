<?php
include('database_config.php');

header('Content-Type: application/json');

$json_str = file_get_contents('php://input');
$data = json_decode($json_str);

if(isset($data->participantId, $data->trialIndex, $data->objectOnScreen, $data->filePlayed)) {
    $participantId = $data->participantId;
    $trialIndex = $data->trialIndex;
    $objectOnScreen = basename($data->objectOnScreen);
    $filePlayed = basename($data->filePlayed);
    $conn = new PDO("mysql:host=$servername;dbname=learning_experiment;charset=utf8mb4", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $conn->prepare("INSERT INTO selection_responses (participantId, trialIndex, objectOnScreen, filePlayed) VALUES (:participantId, :trialIndex, :objectOnScreen, :filePlayed)");
    
    $stmt->bindParam(':participantId', $participantId);
    $stmt->bindParam(':trialIndex', $trialIndex);
    $stmt->bindParam(':objectOnScreen', $objectOnScreen);
    $stmt->bindParam(':filePlayed', $filePlayed);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Selection Data successfully inserted"]);
    } else {
        echo json_encode(["message" => "Failed to insert data"]);
    }

    $conn = null; // Closing the database connection
} else {
    echo json_encode(["message" => "Error: Missing data"]);
}
?>