<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods:  GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");
header("Content-Type: application/json; Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Connect to MySQL
$mysqli = new mysqli("localhost:3306", "root", "Swagers#12", "react-login");

// Check connection
if ($mysqli->connect_errno) {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to connect to MySQL: " . $mysqli->connect_error));
    exit();
}

// Prepare and bind parameters for the query
$stmt = $mysqli->prepare("SELECT * FROM register WHERE email=? AND password=?");
$stmt->bind_param("ss", $email, $password);

// Get data from the request
$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;

// Execute the query
$stmt->execute();

// Get the result
$result = $stmt->get_result();

// Check if there is a matching user
if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();
    http_response_code(200);

    // Set user data in browser localstorage
    echo json_encode(array(
        "email" => $row['email'],
        "first_name" => $row['first_name'],
        "last_name" => $row['last_name'],
        "Status" => "200"
    ));
} else {
    http_response_code(202);
    echo json_encode(array("message" => "Invalid user"));
}

// Close the prepared statement and MySQL connection
$stmt->close();
$mysqli->close();
?>
