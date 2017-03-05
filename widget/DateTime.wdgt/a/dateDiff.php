<?php

//--------------------------------------------------
// Return variables

	$timeA = (isset($argv[1]) ? $argv[1] : '');
	$timeB = (isset($argv[2]) ? $argv[2] : '');

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