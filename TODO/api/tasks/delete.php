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
//$data = (object) $_POST;
$data = json_decode(file_get_contents("php://input"));

// set Task id to be deleted
$tasks->id = $data->id;


// delete the task
if($tasks->delete()){
    echo '{';
    echo '"message": "Task was deleted."';
    echo '}';
}

// if unable to delete the Task
else{
    echo '{';
    echo '"message": "Unable to delete Task."';
    echo '}';
}
?>