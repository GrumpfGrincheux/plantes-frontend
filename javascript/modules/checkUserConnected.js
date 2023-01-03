function restrictedAction() {
	// Récupère le token d'accès du localStorage
	const userToken = localStorage.getItem("userToken");

	// Vérifie si le token d'accès est présent
	if (userToken) {
		// Fait la requête avec le token d'accès
		fetch("http://localhost:3000/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userToken}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (response.ok) {
					console.log(data);
				} else {
					// La réponse n'est pas valide, affiche un message d'erreur
					console.error("Erreur : token d'accès non valide ou expiré");
				}
			})
			.catch((error) => {
				console.error(error);
			});
	} else {
		// Affiche un message d'erreur
		console.error("Token d'accès non trouvé");
	}
}
