<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$url = 'https://gamemonetize.com/feed.php?format=0&page=1';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$games = curl_exec($ch);
curl_close($ch);

echo $games;
?>
