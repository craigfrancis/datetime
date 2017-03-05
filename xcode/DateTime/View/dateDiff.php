<?php

//--------------------------------------------------
// Return variables

	$argv = json_decode((isset($argv[1]) ? $argv[1] : '[]'), true);

	$timeA = (isset($argv[0]) ? $argv[0] : '');
	$timeB = (isset($argv[1]) ? $argv[1] : '');

//--------------------------------------------------
// Config

	ini_set('date.timezone', 'Europe/London');

//--------------------------------------------------
// Defaults

	$timeA = trim($timeA);
	if ($timeA == '') {
		$timeA = 'now';
	}

	$timeB = trim($timeB);
	if ($timeB == '') {
		$timeB = 'now';
	}

//--------------------------------------------------
// Return the difference

	echo (strtotime($timeB) - strtotime($timeA));

?>
