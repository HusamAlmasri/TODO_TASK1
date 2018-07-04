<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../../config/Database.php';
include_once '../../models/Tasks.php';

// instantiate database and task object
$database = new Database();
$db = $database->getConnection();

// initialize object
$tasks = new Tasks($db);

// query tasks
$stmt = $tasks->read();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){

    // tasks array
    $tasks_arr=array();
    $tasks_arr['data']=array();

    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);

        $tasks_item=array(
            'id' => $id,
            'taskName' => $taskName,
            'taskDescription' => html_entity_decode($taskDescription)
        );

        array_push($tasks_arr['data'], $tasks_item);
    }

    echo json_encode($tasks_arr);
}

else{
    echo json_encode(
        array("message" => "No tasks found.")
    );
}
?>