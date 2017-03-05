<?php

//--------------------------------------------------
// Return variables

	$argv = json_decode((isset($argv[1]) ? $argv[1] : '[]'), true);

	$timestamp = (isset($argv[0]) ? $argv[0] : '');
	$format = (isset($argv[1]) ? $argv[1] : '');

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
