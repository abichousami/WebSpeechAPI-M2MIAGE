<?php

$nom = $_POST['pseudo'];
$mail = $_POST['email'];
$age = $_POST['age'];
try
{
	//$bdd = new PDO('mysql:host=localhost;dbname=web_speech;charset=utf8', 'root', 'admin');
	$bdd = new PDO('mysql:host=localhost;dbname=web_speech', 'root', 'admin', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));

	
	// Insertion des variables
$req = $bdd->prepare('INSERT INTO utilisateur(nom, prenom, age) VALUES(:nom, :prenom, :age)');
$req->execute(array('nom' => $nom,'prenom' => $mail,'age' => $age));

echo 'L\'utilisateur a bien été ajouté !';
}
catch(Exception $e)
{
        die('Erreur : '.$e->getMessage());
}

?>
