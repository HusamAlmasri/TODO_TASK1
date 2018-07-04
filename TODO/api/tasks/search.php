<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and models files
include_once '../../config/Database.php';
include_once '../../models/Tasks.php';

// instantiate database and tasks models
$database = new Database();
$db = $database->getConnection();

// initialize object
$tasks = new Tasks($db);

// get keywords
$keywords=isset($_GET["s"]) ? $_GET["s"] : "";

// query tasks
$stmt = $tasks->search($keywords);
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){

    // tasks array
    $tasks_arr=array();
    $tasks_arr["records"]=array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);

        $tasks_item=array(
            "id" => $id,
            "taskName" => $taskName,
            "taskDescription" => html_entity_decode($taskDescription)
        );

        array_push($tasks_arr["records"], $tasks_item);
    }

    echo json_encode($tasks_arr);
}

else{
    echo json_encode(
        array("message" => "No tasks found.")
    );
}
?>