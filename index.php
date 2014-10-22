<?php

$app_path = '/test_app/';
$js_path = '/js/';

//echo "Hello. You are at Semaj Productions.com"

?>

<script type="text/javascript">
    SP							= {};
    SP.app						= SP.app || {};
    SP.app.bootstrap 		    = SP.app.bootstrap || {};
	SP.app.paths			    = SP.app.paths || { jsPath: '<?= $js_path; ?>', appPath : '<?= $app_path; ?>' };
</script>

<link type="text/css" rel="stylesheet" href="/css/test.css">
<link type="text/css" rel="stylesheet" href="<?= $js_path; ?>libs/bootstrap/css/bootstrap.css">

<script type="text/javascript" data-main="<?= $app_path ?>configs/config.paths.js" src="/js/libs/require/require.min.js" async="true"></script>
<div class="header"></div>
<div id="test-app" class="container">
	<div id="app-holder"></div>
</div>

<!--<script src="<?= $js_path; ?>libs/jquery/jquery.min.js"></script>
<script src="<?= $js_path; ?>libs/bootstrap/js/bootstrap.min.js"></script>-->
