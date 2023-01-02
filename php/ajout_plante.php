<?php

$mysqli = new mysqli("localhost", "root", "root", 'plantes');

$post = [];

# TO AVOID SQL INJECTIONS AND XSS
foreach($_POST as $k => $v){
  $v = preg_replace("/'/", "\\'", $v);
  $v = preg_replace('/"/', "", $v);
  $v = preg_replace('/</', "", $v);
  $v = preg_replace('/>/', "", $v);
  $v = preg_replace('/script/', "", $v);
  $post[$k] = $v;
}

function exists($data, $sql, $mysqli)
{
  if ($data->num_rows >= 1) {
    while ($row = $data->fetch_assoc()) {
      $id = $row["id"];
      print_r("Cette entrée existe déja !");
    }
  } else {
    $res = $mysqli->query($sql);
    $id = $mysqli->insert_id;
    print_r("Entrée ajoutée !");
  }
  return $id;
}

if (count($_POST) == 1) {
  $famille = $post["famille"];
  if ($famille != "" || null) {  
    $is_famille = $mysqli->query("SELECT * FROM familles WHERE familles.name = '$famille'");
    $famille_sql = "INSERT INTO familles(familles.name) VALUES ('$famille')";
    $famille_id = exists($is_famille, $famille_sql, $mysqli);
  }
}
if (count($_POST) == 2) {
  $famille = $post["famille"];
  if ($famille != "" || null) {  
    $is_famille = $mysqli->query("SELECT * FROM familles WHERE familles.name = '$famille'");
    $famille_sql = "INSERT INTO familles(familles.name) VALUES ('$famille')";
    $famille_id = exists($is_famille, $famille_sql, $mysqli);
  }
  $genre = $post["genre"];
  if ($genre != "" || null) {
    $is_genre = $mysqli->query("SELECT * FROM genres WHERE genres.name = '$genre' AND famille_id = '$famille_id'");
    $genre_sql = "INSERT INTO genres(genres.name, famille_id) VALUES ('$genre', '$famille_id')";
    $genre_id = exists($is_genre, $genre_sql, $mysqli);
  }
}
if (count($_POST) == 3) {
  $famille = $post["famille"];
  if ($famille != "" || null) {  
    $is_famille = $mysqli->query("SELECT * FROM familles WHERE familles.name = '$famille'");
    $famille_sql = "INSERT INTO familles(familles.name) VALUES ('$famille')";
    $famille_id = exists($is_famille, $famille_sql, $mysqli);
  }
  $genre = $post["genre"];
  if ($genre != "" || null) {
    $is_genre = $mysqli->query("SELECT * FROM genres WHERE genres.name = '$genre' AND famille_id = '$famille_id'");
    $genre_sql = "INSERT INTO genres(genres.name, famille_id) VALUES ('$genre', '$famille_id')";
    $genre_id = exists($is_genre, $genre_sql, $mysqli);
  }
  $espece = $post["espece"];
  if ($espece != "" || null) {
    $is_espece = $mysqli->query("SELECT * FROM especes WHERE especes.name = '$espece' AND famille_id = '$famille_id' AND genre_id = '$genre_id'");
    $espece_sql = "INSERT INTO especes(especes.name, genre_id, famille_id) VALUES ('$espece', '$genre_id', '$famille_id')";
    $espece_id = exists($is_espece, $espece_sql, $mysqli);
  }
}
