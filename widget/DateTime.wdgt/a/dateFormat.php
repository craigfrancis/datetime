<?php

//--------------------------------------------------
// Return variables

	$timestamp = (isset($argv[1]) ? $argv[1] : '');
	$format = (isset($argv[2]) ? $argv[2] : '');

//--------------------------------------------------
// Config

	ini_set('date.timezone', 'Europe/London');

//--------------------------------------------------
// Defaults

	$timestamp = intval($timestamp);
	if ($timestamp == 0) {
		$timestamp = time();
	}

	$format = trim($format);
	if ($format == '') {
		$format = ' ';
	}

//--------------------------------------------------
// Return the value

	echo date($format, $timestamp);

?>