<?php
// Reference:
// (link unavailable)

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
$table = "Polls";

// retrieve the search key field name and value from the path
$fld = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
$key = array_shift($request);

// perform operations based on HTTP method
switch ($method) {
    case 'GET':
        // retrieve all polls or a specific poll
        if ($fld && $key) {
          $sql = "SELECT * FROM `$table` WHERE `$fld` = '$key'";
        } else {
          $sql = "SELECT * FROM `$table`";
        }
        $result = mysqli_query($conn,$sql);
        $polls = array();
        while ($row = mysqli_fetch_object($result)) {
          $polls[] = $row;
        }
        echo json_encode($polls);
        break;
  case 'POST':
    // create a new poll
    $columns = preg_replace('/[^a-z0-9_]+/i','',array_keys($input));
    $values = array_map(function ($value) use ($conn) {
      if ($value===null) return null;
      return mysqli_real_escape_string($conn,(string)$value);
    },array_values($input));
    $sql = "INSERT INTO `$table` (Title, MovieID1, MovieID2, MovieID3) VALUES (?, ?, ?, ?)";
    break;
  case 'PUT':
    // update an existing poll
    $columns = preg_replace('/[^a-z0-9_]+/i','',array_keys($input));
    $values = array_map(function ($value) use ($conn) {
      if ($value===null) return null;
      return mysqli_real_escape_string($conn,(string)$value);
    },array_values($input));
    $sql = "UPDATE `$table` SET Title = ?, MovieID1 = ?, MovieID2 = ?, MovieID3 = ? WHERE `$fld` = '$key'";
    break;
  case 'DELETE':
    // delete a poll
    $sql = "DELETE FROM `$table` WHERE `$fld` = '$key'";
    break;
}

// execute SQL statement
$result = mysqli_query($conn,$sql);
if ($result) {
  if ($method == 'POST') {
    echo json_encode(array('message' => 'Poll created successfully'));
  } elseif ($method == 'PUT') {
    echo json_encode(array('message' => 'Poll updated successfully'));
  } elseif ($method == 'DELETE') {
    echo json_encode(array('message' => 'Poll deleted successfully'));
  }
} else {
  echo json_encode(array('error' => 'Error performing operation'));
}

// close mysql connection
mysqli_close($conn);
?>