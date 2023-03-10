<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Connect to MongoDB
$mongo = new MongoDB\Driver\Manager("mongodb://localhost:27017");

// Connect to Redis
$redis = new Redis();
$redis->connect('127.0.0.1', 6379);

// Read the input data as JSON
$data = json_decode(file_get_contents("php://input"));

// Extract the data from the JSON object
$name = $data->name;
$email = $data->email;
$contact = $data->contact;
$dob = $data->dob;
$age = $data->age;

// Connect to MySQL using Prepared Statements
$con = mysqli_connect("localhost:3306", "root", "Swagers#12");
mysqli_select_db($con, "react-login");

$stmt = $con->prepare("INSERT INTO register(name, email, contact, dob, age) VALUES (?, ?, ?, ?, ?)");

$stmt->bind_param("sssss", $name, $email, $contact, $dob, $age);

$stmt->execute();

// Check if the statement was executed successfully
if ($stmt->affected_rows > 0) {
    $response['Status'] = 'Valid';
    echo json_encode($response);

    // Store the data in MongoDB
    $bulk = new MongoDB\Driver\BulkWrite();
    $doc = array(
        'name' => $name,
        'email' => $email,
        'contact' => $contact,
        'dob' => $dob,
        'age' => $age
    );
    $bulk->insert($doc);

    $mongo->executeBulkWrite('react-login.users', $bulk);

    // Store the session information in Redis
    $session_id = uniqid();
    $session_data = array(
        'name' => $name,
        'email' => $email,
        'contact' => $contact,
        'dob' => $dob,
        'age' => $age
    );
    $redis->set($session_id, json_encode($session_data));
    $redis->expire($session_id, 3600); // expire session in 1 hour

    // Return the session ID to the client
    $response['session_id'] = $session_id;
    echo json_encode($response);
} else {
    $response['Status'] = 'Invalid';
    echo json_encode($response);
}

$stmt->close();
mysqli_close($con);

?>
