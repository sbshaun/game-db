<?php
$servername = "localhost";
$username = "root";
$password = "mysqlmysql";
$dbname = "test_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set up server to listen on port 4000
$host = 'localhost:4000';

// Set headers to allow CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Check for GET request to '/'
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/') {
    // Send response with "{message: "ok"}"
    header('Content-Type: application/json');
    echo '{"message": "ok"}';
}

// Close connection
$conn->close();
?>