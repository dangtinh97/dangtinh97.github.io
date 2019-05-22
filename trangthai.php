<?php
$sw1=$_GET["sw1"];
$sw2=$_GET["sw2"];
$sw3=$_GET["sw3"];
$sw4=$_GET["sw4"];
$ar=["sw1"=>$sw1,"sw2"=>$sw2,"sw3"=>$sw3,"sw4"=>$sw4];
$ar=json_encode($ar);
file_put_contents("./trangthai.json", $ar);
echo "success!";
?>