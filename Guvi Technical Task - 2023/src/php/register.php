<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Read data from request body
$data = json_decode(file_get_contents("php://input"));

$first_name = $data->first_name;
$last_name = $data->last_name;
$email = $data->email;
$password = $data->password;

// Connect to Redis
$redis = new Redis();
$redis->connect('127.0.0.1', 6379);

// Connect to MySQL
$mysqli = new mysqli("localhost:3306", "root", "Swagers#12", "react-login");

// Prepare MySQL statement
$stmt = $mysqli->prepare("INSERT INTO register (first_name, last_name, email, password) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $first_name, $last_name, $email, $password);

if ($stmt->execute()) {
    // Inserted successfully, set Redis cache
    $redis_key = "user:$email";
    $redis->set($redis_key, json_encode([
        'first_name' => $first_name,
        'last_name' => $last_name,
        'email' => $email
    ]));

    // Send response
    $response['Status'] = 'valid';
    $response['userData'] = [
        'first_name' => $first_name,
        'last_name' => $last_name,
        'email' => $email
    ];
    echo json_encode($response);
} else {
    // Insert failed
    $response['Status'] = 'invalid';
    echo json_encode($response);
}
?>
