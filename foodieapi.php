<?php

$action = $_GET['action'];

$con = mysqli_connect("localhost", "root", "letmein", "balllike_foodie");

if(mysqli_connect_errno())
{
  die('Error: Unable to connect to the database');
}

function getPicture( $con, $id )
{
  $images = array();

  $result = mysqli_query($con, "SELECT * FROM meal_pics WHERE id = " . id);

  $idx = 0;
  while($row = mysqli_fetch_array($result))
  {
    $images[$idx] = $row;
    $idx++;
  }

  return $images;
}

function getAll( $con )
{
  $images = array();

  $result = mysqli_query($con, "SELECT * FROM meal_pics");

  $idx = 0;
  while($row = mysqli_fetch_array($result))
  {
    $images[$idx] = $row;
    $idx++;
  }

  return $images;
}

function deletePicture( $con, $id )
{

  $result = mysqli_query($con, "DELETE FROM meal_pics WHERE id = " . $id);

  $rows_count = mysqli_num_rows($result);

  return array('status' => 'OK', 'rowsAffected' => $rows_count);

}

$value = 'An error occurred retrieving data';

switch( $action )
{
  case 'all':
    $value = getAll( $con );
    break;

  case 'delete':
    $value = deletePicture($con, $_GET['id']);
    break;

  case 'pic':
    $value = getPicture($con, $_GET['id']);
    break;
}

echo json_encode( $value );

?>
