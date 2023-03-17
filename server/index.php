<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

require_once 'api/utils/database.php';
require_once 'api/controllers/videogame.php';


$config = require 'api/config.php';   // load config
$routes = require 'api/routes.php';   // load routes

$method = $_SERVER['REQUEST_METHOD']; // more about _SERVER: https://www.w3schools.com/php/php_superglobals_server.asp 
$path = strtok($_SERVER['REQUEST_URI'], '?');

if (isset($routes[$method]) && isset($routes[$method][$path])) {
    $conn = connectDatabase($config);          // connect to database
    $requestHandler = $routes[$method][$path]; // get the name of the request handler function 
    $requestHandler($conn);                    // call handler function and pass db connection
    $conn->close();
} else {
    http_response_code(404);
    header('Content-Type: application/json');           // header: https://www.w3schools.com/php/func_network_header.asp
    echo json_encode(['message' => 'Route not found']); // json_encoded: https://www.w3schools.com/php/func_json_encode.asp 
}