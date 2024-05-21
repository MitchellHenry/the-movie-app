<?php
// Reference:
// https://www.leaseweb.com/labs/2015/10/creating-a-simple-rest-api-in-php/

// Use this API for demonstration purposes only

require("settings.php");
header('Access-Control-Allow-Origin: http://localhost:8081');
// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = json_decode(file_get_contents('php://input'),true);  // json string to associative array(true)

// connect to the mysql database, provide the appropriate credentials
$conn = mysqli_connect($host, $user, $pwd, $sql_db);

mysqli_set_charset($conn,'utf8');

// initialise the table name accordingly
$table = "Users";

// retrieve the search key field name and value from the path
$fld = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
$key = array_shift($request);

// perform operations based on HTTP method
switch ($method) {
  case 'GET':
    // retrieve all users or a specific user
    if ($fld && $key) {
      $sql = "SELECT * FROM `$table` WHERE `$fld` = '$key'";
    } else {
      $sql = "SELECT * FROM `$table`";
    }
    break;
  case 'POST':
    // create a new user
    $columns = preg_replace('/[^a-z0-9_]+/i','',array_keys($input));
    $values = array_map(function ($value) use ($conn) {
      if ($value===null) return null;
      return mysqli_real_escape_string($conn,(string)$value);
    },array_values($input));
    $sql = "INSERT INTO `$table` (" . implode(', ', $columns) . ") VALUES ('" . implode("', '", $values) . "')";
    break;
  case 'PUT':
    // update an existing user
    $columns = preg_replace('/[^a-z0-9_]+/i','',array_keys($input));
    $values = array_map(function ($value) use ($conn) {
      if ($value===null) return null;
      return mysqli_real_escape_string($conn,(string)$value);
    },array_values($input));
    $sql = "UPDATE `$table` SET " . implode(' = ?, ', $columns) . " = ? WHERE `$fld` = '$key'";
    break;
  case 'DELETE':
    // delete a user
    $sql = "DELETE FROM `$table` WHERE `$fld` = '$key'";
    break;
}

// execute SQL statement
$result = mysqli_query($conn,$sql);
if ($result) {
  if ($method == 'GET') {
    echo json_encode(mysqli_fetch_object($result));
  } elseif ($method == 'POST') {
    echo json_encode(array('message' => 'User created successfully'));
  } elseif ($method == 'PUT') {
    echo json_encode(array('message' => 'User updated successfully'));
  } elseif ($method == 'DELETE') {
    echo json_encode(array('message' => 'User deleted successfully'));
  }
} else {
  echo json_encode(array('error' => 'Error performing operation'));
}

// close mysql connection
mysqli_close($conn);
