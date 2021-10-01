<?php
include('database.php');

$sql = "SELECT * FROM food";
$result =$conn->query($sql);
if($result->num_rows > 0){
    $data =array();
while($row =$result->fetch_assoc()){
    $data[] =$row;
}
}
// rsponse
echo json_encode($data);
?>