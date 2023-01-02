<?php

$post = [];

# TO AVOID SQL INJECTIONS
foreach($_POST as $k => $v){
  $v = preg_replace("/'/", "\\'", $v);
  $v = preg_replace('/"/', "", $v);
  $v = preg_replace('/;/', "", $v);
  $post[$k] = $v;
}

if (count($post) == 1) {
  $fam = $post["famille"];
  $sql = "SELECT DISTINCT familles.name
          FROM familles
          WHERE familles.name LIKE \"$fam%\"
          ORDER BY familles.name";
}
if (count($post) == 2) {
  $fam = $post["famille"];
  $gen = $post["genre"];
  $sql = "SELECT DISTINCT genres.name
          FROM genres
          INNER JOIN familles ON genres.famille_id = familles.id
          WHERE genres.name LIKE \"$gen%\"
          AND familles.name = \"$fam\"
          ORDER BY genres.name";
}
if (count($post) == 3) {
  $fam = $post["famille"];
  $gen = $post["genre"];
  $esp = $post["espece"];
  $sql = "SELECT DISTINCT especes.name
          FROM especes
          INNER JOIN familles ON especes.famille_id = familles.id
          INNER JOIN genres ON especes.genre_id = genres.id
          WHERE especes.name LIKE \"$esp%\"
          AND familles.name = \"$fam\"
          AND genres.name = \"$gen\"
          ORDER BY especes.name";
}

$mysqli = new mysqli("localhost", "root", "root", 'plantes');
$result = $mysqli->query($sql);

$arr = [];
foreach ($result as $row) {
  $arr[] = $row;
}

$json = json_encode($arr, JSON_UNESCAPED_UNICODE, 2);
echo $json;
