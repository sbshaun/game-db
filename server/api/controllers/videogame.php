<?php
require_once __DIR__ . '/../../models/types.php';

function test($conn) {
    header('Content-Type: application/json');
    echo json_encode(['message' => 'ok']);
}

function getVideogames($conn) {
    $sql = "SELECT * FROM videogame";
    $result = $conn->query($sql);

    $videogames = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $videogame = new VideoGame();
            $videogame->game_id = $row['game_id'];
            $videogame->name = $row['name'];
            $videogame->release_date = $row['release_date'];
            $videogame->genre = $row['genre'];
            $videogame->synopsis = $row['synopsis'];
            $videogame->rating = $row['rating'];
            $videogame->sales = $row['sales'];
            $videogame->developer_id = $row['developer_id'];
            $videogame->start_date = $row['start_date'];
            $videogame->end_date = $row['end_date'];
            $videogame->franchise_id = $row['franchise_id'];

            $videogames[] = $videogame;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($videogames);
}

function getVideogameById($conn, $game_id) {
    $sql = "SELECT * FROM videogame WHERE game_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $game_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $videogame = new VideoGame();
        $videogame->game_id = $row['game_id'];
        $videogame->name = $row['name'];
        $videogame->release_date = $row['release_date'];
        $videogame->genre = $row['genre'];
        $videogame->synopsis = $row['synopsis'];
        $videogame->rating = $row['rating'];
        $videogame->sales = $row['sales'];
        $videogame->developer_id = $row['developer_id'];
        $videogame->start_date = $row['start_date'];
        $videogame->end_date = $row['end_date'];
        $videogame->franchise_id = $row['franchise_id'];

        header('Content-Type: application/json');
        echo json_encode($videogame);
    } else {
        http_response_code(404);
        header('Content-Type: application/json');
        echo json_encode(['message' => 'Videogame not found']);
    }
}
