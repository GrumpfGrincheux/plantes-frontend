<?php

$post = [];

# TO AVOID SQL INJECTIONS
foreach($_POST as $k => $v){
  $v = preg_replace("/'/", "\\'", $v);
  $v = preg_replace('/"/', "", $v);
  $v = preg_replace('/;/', "", $v);
  $post[$k] = $v;
}
$search = $post["search"];

if (mb_strlen($search) == 2) {
  $search = str_replace($search[1], "_", $search);
}
if (mb_strlen($search) == 4) {
  $search = str_replace($search[random_int(1, 3)], "_", $search);
  $search = str_replace($search[random_int(1, 3)], "_", $search);
}

$order = $_POST["order"];
if ($order == "all") {
  $clause = "WHERE familles.name LIKE \"$search%\" 
              OR genres.name LIKE \"$search%\" 
              OR especes.name LIKE \"$search%\"";
} else {
  $clause = "WHERE ".$order."s.name LIKE \"$search%\"";
}

$mysqli = new mysqli("localhost", "root", "root", 'plantes');
$result = $mysqli->query("SELECT DISTINCT familles.name AS famille, genres.name AS genre, especes.name AS espece, especes.nom_commun AS nom
                          FROM especes
                          INNER JOIN familles ON especes.famille_id = familles.id
                          INNER JOIN genres ON especes.genre_id = genres.id
                          $clause
                          ORDER BY famille, genre, espece;");

$arr = [];
foreach ($result as $row) {
  $arr[] = $row;
}

$json = json_encode($arr, JSON_UNESCAPED_UNICODE, 2);
echo $json;
