<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and models files
include_once '../../config/Database.php';
include_once '../../models/Tasks.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare tasks object
$tasks = new Tasks($db);

// set ID property of tasks to be edited
$tasks->id = isset($_GET['id']) ? $_GET['id'] : die();

// read the details of tasks to be edited
$tasks->readOne();

// create array
$tasks_arr = array(
    "id" =>  $tasks->id,
    "taskName" => $tasks->taskName,
    "taskDescription" => $tasks->taskDescription,
);

// make it json format
print_r(json_encode($tasks_arr));
?>