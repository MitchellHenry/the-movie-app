<?php
// Reference:
// https://www.leaseweb.com/labs/2015/10/creating-a-simple-rest-api-in-php/

// Use this API for demonstration purposes only

require("settings.php");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = json_decode(file_get_contents('php://input'),true);  // json string to associative array(true)

// connect to the mysql database, provide the appropriate credentials
$conn = mysqli_connect($host, $user, $pwd, $sql_db);

mysqli_set_charset($conn,'utf8');

// initialise the table name accordingly
$table = "LikedMovies";

// retrieve the search key field name and value from the path
$fld = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
$key = array_shift($request);

// perform operations based on HTTP method
switch ($method) {
    case 'GET':
        // retrieve all liked movies for a specific user
        if ($fld && $key) {
            $sql = "SELECT * FROM `$table` WHERE `$fld` = '$key'";
        } else {
            $sql = "SELECT * FROM `$table`";
        }
        $result = mysqli_query($conn, $sql);
        $data = array();
        while ($row = mysqli_fetch_object($result)) {
            $data[] = $row;
        }
        echo json_encode($data);
        break;
    case 'POST':
        // create a new liked movie entry
        $columns = preg_replace('/[^a-z0-9_]+/i','',array_keys($input));
        $values = array_map(function ($value) use ($conn) {
            if ($value===null) return null;
            return mysqli_real_escape_string($conn,(string)$value);
        },array_values($input));
        $sql = "INSERT INTO `$table` (" . implode(', ', $columns) . ") VALUES ('" . implode("', '", $values) . "')";
        $result = mysqli_query($conn,$sql);
        if ($result) {
            echo json_encode(array('message' => 'Liked movie entry created successfully'));
        } else {
            echo json_encode(array('error' => 'Error performing operation'));
        }
        break;
    case 'PUT':
        // update an existing liked movie entry
        $columns = preg_replace('/[^a-z0-9_]+/i','',array_keys($input));
        $values = array_map(function ($value) use ($conn) {
            if ($value===null) return null;
            return mysqli_real_escape_string($conn,(string)$value);
        },array_values($input));
        $sql = "UPDATE `$table` SET `Rated` = ? WHERE `MovieID` = '$key' AND `UserID` = '$fld'";
        $result = mysqli_query($conn,$sql);
        if ($result) {
            echo json_encode(array('message' => 'Liked movie entry updated successfully'));
        } else {
            echo json_encode(array('error' => 'Error performing operation'));
        }
        break;
    case 'DELETE':
        // delete a liked movie entry
        $sql = "DELETE FROM `$table` WHERE `MovieID` = '$key' AND `UserID` = '$fld'";
        $result = mysqli_query($conn,$sql);
        if ($result) {
            echo json_encode(array('message' => 'Liked movie entry deleted successfully'));
        } else {
            echo json_encode(array('error' => 'Error performing operation'));
        }
        break;
}

// close mysql connection
mysqli_close($conn);