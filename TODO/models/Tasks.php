<?php
class Tasks{

    // database connection and table name
    private $conn;
    private $table_name = "task";
    private $table_name2 = "login";

    // object properties
    public $id;
    public $taskName;
    public $taskDescription;
    public $username;
    public $password;
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // read tasks
    function read(){

        // select all query
        $query = "SELECT
                id, taskName, taskDescription
            FROM
                " . $this->table_name . " 
            ORDER BY
                id ASC";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }

    function readOne(){

        // query to read single record
        $query = "SELECT
                id,taskName, taskDescription
            FROM
                " . $this->table_name . "
            WHERE
                id = ?
            LIMIT
                0,1";

        // prepare query statement
        $stmt = $this->conn->prepare( $query );

        // bind id of task to be updated
        $stmt->bindParam(1, $this->id);

        // execute query
        $stmt->execute();

        // get retrieved row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // set values to object properties
        $this->taskName = $row['taskName'];
        $this->taskDescription = $row['taskDescription'];
    }

    // create task
    function create(){
        // query to insert record
        $query = "INSERT INTO
                " . $this->table_name . "
            SET
                taskName=:taskName, taskDescription=:taskDescription";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->taskName=htmlspecialchars(strip_tags($this->taskName));
        $this->taskDescription=htmlspecialchars(strip_tags($this->taskDescription));

        // bind values
        $stmt->bindParam(":taskName", $this->taskName);
        $stmt->bindParam(":taskDescription", $this->taskDescription);
        // execute query
        if($stmt->execute()){
            return true;
        }

        return false;

    }

    // update the task
    function update(){
        // query to insert record
        $query = "UPDATE
                " . $this->table_name . "
            SET
                taskName=:taskName,
                 taskDescription=:taskDescription
                 where
                 id=:id";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->taskName=htmlspecialchars(strip_tags($this->taskName));
        $this->taskDescription=htmlspecialchars(strip_tags($this->taskDescription));
        $this->id=htmlspecialchars(strip_tags($this->id));

        // bind values
        $stmt->bindParam(":taskName", $this->taskName);
        $stmt->bindParam(":taskDescription", $this->taskDescription);
        $stmt->bindParam(":id", $this->id);
        // execute query
        if($stmt->execute()){
            return true;
        }

        return false;

    }

    // delete the task
    function delete(){

        // delete query
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->id));

        // bind id of record to delete
        $stmt->bindParam(':id', $this->id);

        // execute query
        if($stmt->execute()){
            return true;
        }
        return false;
    }

    // search tasks
    function search($keywords){

        // select all query
        $query = "SELECT
               id, taskName, taskDescription
            FROM
                " . $this->table_name . " 
            WHERE
                taskName LIKE ? OR taskDescription LIKE ?";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // sanitize
        $keywords=htmlspecialchars(strip_tags($keywords));
        $keywords = "%{$keywords}%";

        // bind
        $stmt->bindParam(1, $keywords);
        $stmt->bindParam(2, $keywords);

        // execute query
        $stmt->execute();

        return $stmt;
    }

    function login(){

        // select all query
        $query = "SELECT
               1
            FROM
                " . $this->table_name2 . " 
            WHERE
            username = :username 
            AND
            password = :password
            ";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":username", $this->username);
        $stmt->bindParam(":password", $this->password);

        // execute query
        $stmt->execute();

        return $stmt;
    }
}