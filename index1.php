<!DOCTYPE html>
<html lang="en">
<head>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta charset="UTF-8">
	<title>Đọc trạng thái nút nhấn</title>
	<style>
		table, th, td {
			border: 1px solid black;
			border-collapse: collapse;
		}
		th, th {
			padding: 5px;
		}
		th {
			text-align: left;
		}
		img{
			margin-top: 2px; 
		}
	</style>
</head>
<body>
	<table>
		<tr>
			<th>Công tắc 1</th>
			<th>Công tắc 2</th>
			<th>Công tắc 3</th>
			<th>Công tắc 4</th>
		</tr>
		<tr>
			<td id="sw1" style="text-align: center;"></td>
			<td id="sw2" style="text-align: center;"></td>
			<td id="sw3" style="text-align: center;"></td>
			<td id="sw4" style="text-align: center;"></td>
		</tr>
	</table>
	<script type="text/javascript">
		$.ajax({
			url:"./trangthai.json",
			type:"GET",
			dataType:"JSON",
			success:(data)=>{
				var sw1=data["sw1"];
				var sw2=data["sw2"];
				var sw3=data["sw3"];
				var sw4=data["sw4"];
				if(sw1==1){
					$("#sw1").empty().html('<img src="./sw_on.png"     height="28px">');
				}
				else if(sw1==0){
					$("#sw1").empty().html('<img src="./sw_off.png"     height="28px">');
				}
				//
				if(sw2==1){
					$("#sw2").empty().html('<img src="./sw_on.png"     height="28px">');
				}
				else if(sw2==0){
					$("#sw2").empty().html('<img src="./sw_off.png"     height="28px">');
				}
				//
				if(sw3==1){
					$("#sw3").empty().html('<img src="./sw_on.png"     height="28px">');
				}
				else if(sw3==0){
					$("#sw3").empty().html('<img src="./sw_off.png"     height="28px">');
				}
				//
				if(sw4==1){
					$("#sw4").empty().html('<img src="./sw_on.png"     height="28px">');
				}
				else if(sw4==0){
					$("#sw4").empty().html('<img src="./sw_off.png"     height="28px">');
				}
			}
		})
	</script>
</body>
</html>