<?php
function connectDatabase($config) {
    $conn = new mysqli(
        $config['host'],
        $config['username'],
        $config['password'],
        $config['dbname'],
        $config['port']
    );

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    return $conn;
}