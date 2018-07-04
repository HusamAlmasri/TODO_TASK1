<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// get database connection
include_once '../../config/Database.php';

// instantiate models object
include_once '../../models/Tasks.php';

$database = new Database();
$db = $database->getConnection();

$tasks = new Tasks($db);

// get tasks data
$data = json_decode(file_get_contents("php://input"));

// set tasks property values
$tasks->id = $data->id;
$tasks->taskName = $data->taskName;
$tasks->taskDescription = $data->taskDescription;
// create the task
if($tasks->update()){
    echo '{';
    echo '"message": "task was updated."';
    echo '}';
}

// if unable to update the task.
else{
    echo '{';
    echo '"message": "Unable to update task."';
    echo '}';
}
?>