<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$url = 'https://gamemonetize.com/feed.php?format=1&page=1';
$games = file_get_contents($url);
echo $games;
?>