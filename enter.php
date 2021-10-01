<?php
include('database.php');

$data = stripslashes(file_get_contents('php://input'));
$mydata = json_decode($data ,true);
$id =$mydata['id'];
$fruit =$mydata['fruit'];
$vegies =$mydata['vegies'];
$dairy =$mydata['dairy'];
if(!empty($fruit) && !empty($vegies)  && !empty($dairy) ){
  $sql =  "INSERT INTO food (id, fruit, vegies , dairy) 
    VALUES('$id','$fruit' , '$vegies' , '$dairy' ) ON DUPLICATE KEY UPDATE fruit='$fruit' , vegies='$vegies' , dairy='$dairy' "; 

if ($conn ->query($sql) == TRUE)
{

  echo 'Item Data Inserted';
 }
 else
 {
  echo 'Error';
 }
}

?>