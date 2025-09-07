<?php

include 'db.php';  

if ($mysqli->connect_error) {
    echo json_encode(['error' => 'Database connection error: ' . $mysqli->connect_error]);
    exit();
}

$query = "SELECT id, name, name_en, type, geo, geo_en, published, logo FROM cases";
$result = $mysqli->query($query);

if ($result) {
    $cases = [];    
  
    while ($row = $result->fetch_assoc()) {
        $cases[] = $row;
    }
   
    echo json_encode($cases, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} else {    
    echo json_encode(['error' => 'Request execution error: ' . $mysqli->error]);
}

$mysqli->close();
