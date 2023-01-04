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
				} else {
					// La réponse n'est pas valide, affiche un message d'erreur
					console.error("Erreur : token d'accès non valide ou expiré");
					window.location.replace("http://localhost:5500/login.html");
				}
			},
		)
			.then((res) => res.json())
			.catch((error) => {
				console.error(error);
			});
	} else {
		// Affiche un message d'erreur
		console.error("Token d'accès non trouvé");
		window.location.replace("http://localhost:5500/login.html");
	}
};

const resultGrid = document.getElementById("results-grid");
const search = document.getElementById("search");
const planteForm = document.getElementById("planteForm");
planteForm.addEventListener("input", getResultData);
const securityRegex = /[^a-zA-Z é]/g;

function getResultData() {
	if (search.value.length >= 2) {
		resultGrid.classList.remove("search-result-list-hidden");
		const formData = new FormData(planteForm);
		const data = {};
		for (const [key, value] of formData.entries()) {
			data[key] = value;
		}
		console.log("🚀 ~ file: search_plante.js:11 ~ getResultData ~ data", data);
		console.log(data.order);
		console.log(data.search);
		const send = { search: data.search };
		fetch(`http://localhost:3000/find/${data.order}s`, {
			method: "POST",
			body: JSON.stringify(send),
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${userToken}`,
			},
		})
			.then((res) => res.json())
			.then((res) => {
				const familles = [];
				const genres = [];
				const especes = [];
				html = `
				  <p class="result-header">Familles</p>
				  <p class="result-header">Genres</p>
				  <p class="result-header">Espèces</p>
				  `;
				let backGroundColors = [
					"result-bg-color-light",
					"result-bg-color-dark",
				];
				let bgIndex = 1;
				let counter = 0;
				if (res.data) {
					res.data.forEach((element) => {
						if (!genres.includes(element.genre.name)) {
							if (bgIndex == 0) {
								++bgIndex;
							} else {
								bgIndex--;
							}
							genres.push(element.genre.name);
							html += `<p class="result ${
								backGroundColors[bgIndex]
							}" style="grid-row: ${counter + 2}; grid-column: 2;">${
								element.genre.name
							}</p>`;
						}
						if (!familles.includes(element.famille.name)) {
							familles.push(element.famille.name);
							html += `<p class="result ${
								backGroundColors[bgIndex]
							}" style="grid-row: ${counter + 2}; grid-column: 1;">${
								element.famille.name
							}</p>`;
						}
						if (!especes.includes(element.name)) {
							especes.push(element.name);
							html += `<p class="result ${
								backGroundColors[bgIndex]
							} result-espece" style="grid-row: ${
								counter + 2
							}; grid-column: 3;">${element.name}</p>`;
						}
						counter++;
					});
					if (
						html ==
						`
				  <p class="result-header">Familles</p>
				  <p class="result-header">Genres</p>
				  <p class="result-header">Espèces</p>
				  `
					) {
						html = "<p>Aucun résultat ne correspond à votre recherche<p>";
					}
					html = html.replace(securityRegex, "");
					resultGrid.innerHTML = html;
				}
			})
			.catch((error) => {
				console.log(error);
			});
	} else if (search.value == "") {
		resultGrid.classList.add("search-result-list-hidden");
	}
}
