// Récupère le token d'accès du localStorage
const userToken = localStorage.getItem("userToken");

window.onload = () => {
	// Vérifie si le token d'accès est présent
	if (userToken) {
		// Fait la requête avec le token d'accès
		fetch(
			"http://localhost:3000/api/auth",
			{
				method: "get",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userToken}`,
				},
			},
			(req, res) => {
				if (res.ok) {
					console.log(data);
					window.location.replace("http://localhost:5501/");
				} else {
					// La réponse n'est pas valide, affiche un message d'erreur
					console.error("Erreur : token d'accès non valide ou expiré");
				}
			},
		).catch((error) => {
			console.error(error);
		});
	}
};

let loginForm;
if (document.getElementById("loginForm")) {
	loginForm = document.getElementById("loginForm");
	loginForm.addEventListener("submit", login);
}

function login() {
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	fetch("http://localhost:3000/api/login", {
		method: "POST",
		body: JSON.stringify({
			username: `${username}`,
			password: `${password}`,
		}),
		headers: {
			"Content-type": "application/json",
		},
	})
		.then((res) => res.json())
		.then((res) => {
			console.log(res);
			return res.token;
		})
		.then((token) => {
			console.log(token);
			let expirationDate = new Date();
			expirationDate.setHours(expirationDate.getHours() + 1);
			localStorage.setItem("userToken", token, { expires: expirationDate });
			window.location.replace("http://localhost:5501");
		})
		.catch((error) => {
			console.log(error);
		});
}
