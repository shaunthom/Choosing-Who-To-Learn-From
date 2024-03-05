<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');
error_log('Request method: ' . $_SERVER['REQUEST_METHOD']);

include('database_config.php');

$response = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['participant_id'], $_POST['trial_id']) && isset($_FILES['audio_data'])) {
        $participantId = $_POST['participant_id'];
        $trialId = $_POST['trial_id'];
        $audioFile = $_FILES['audio_data'];

        try {
            $conn = new PDO("mysql:host=$servername;port=$port;dbname=$dbname", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $timestamp = time();
            $filename = "{$participantId}_trial_{$trialId}_{$timestamp}.wav";
            $filePath = "uploads/" . $filename;

            if (move_uploaded_file($audioFile['tmp_name'], $filePath)) {
                $sql = "SELECT COUNT(*) FROM audio_responses WHERE participant_id = :participant_id";
                $stmt = $conn->prepare($sql);
                $stmt->execute([':participant_id' => $participantId]);
                $exists = $stmt->fetchColumn() > 0;

                if (!$exists) {
                    $sql = "INSERT INTO audio_responses (participant_id, audio_response_$trialId) VALUES (:participant_id, :file_path)";
                } else {
                    $sql = "UPDATE audio_responses SET audio_response_$trialId = :file_path WHERE participant_id = :participant_id";
                }
                $stmt = $conn->prepare($sql);
                $stmt->execute([':participant_id' => $participantId, ':file_path' => $filePath]);
                
                $response['success'] = true;
                $response['message'] = 'File uploaded and processed successfully.';
            } else {
                throw new Exception("Failed to move the uploaded file.");
            }
        } catch (PDOException $e) {
            $response['success'] = false;
            $response['error'] = "Database error: " . $e->getMessage();
        } catch (Exception $e) {
            $response['success'] = false;
            $response['error'] = "Error: " . $e->getMessage();
        }
    } else {
        $response['success'] = false;
        $response['error'] = 'Missing required fields.';
    }
} else {
    $response['success'] = false;
    $response['error'] = 'Invalid request method. This script expects a POST request.';
}

echo json_encode($response);
