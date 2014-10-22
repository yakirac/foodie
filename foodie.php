<!--<?php //echo "Hello, I will be the foodie app" ?>-->
<?php

$app_path = '/foodie/';
$js_path = '/js/';

//$images = file_get_contents('http://localhost/foodieapi.php?action=all') or die('Cannot open the url');

/*$images = array();

$con = mysqli_connect("localhost", "balllike_fadmin", "FoodIsLife", "balllike_foodie");
if(mysqli_connect_errno())
{
  die('Error: Unable to connect to the database');
}
else
{
    $result = mysqli_query($con, "SELECT * FROM meal_pics");
    //$images = mysqli_fetch_all($result);
    $idx = 0;
    while($row = mysqli_fetch_array($result))
    {
      $images[$idx] = $row;
      $idx++;
    }
}*/

//echo "Hello. You are at Semaj Productions.com"

?>

<script type="text/javascript">
    SP							          = {};
    SP.app						        = SP.app || {};
    SP.app.bootstrap 		      = SP.app.bootstrap || {};
    //SP.app.bootstrap.images 	= { files : <?= $images ?> };
    SP.app.paths			        = SP.app.paths || { jsPath: '<?= $js_path; ?>', appPath : '<?= $app_path; ?>' };
</script>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<link type="text/css" rel="stylesheet" href="/css/foodie.css">
<link type="text/css" rel="stylesheet" href="<?= $js_path; ?>libs/bootstrap/css/bootstrap.css">

<script type="text/javascript" data-main="<?= $app_path ?>configs/config.paths.js" src="/js/libs/require/require.min.js" async="true"></script>
<!--<div class="header"></div>-->

<div class="background"></div>
<div id="foodie-app" class="container">
  <div id="app-holder" class="site-inner"></div>
</div>
