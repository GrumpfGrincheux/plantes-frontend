//
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
		const send = data.search;
		fetch(`http://localhost:3000/especes/${data.order}s/${send}`, {
			method: "GET",
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
				if (res) {
					console.log(res);
					res.forEach((element) => {
						if (!genres.includes(element.genre_name)) {
							if (bgIndex == 0) {
								++bgIndex;
							} else {
								bgIndex--;
							}
							genres.push(element.genre_name);
							html += `<p class="result ${
								backGroundColors[bgIndex]
							}" style="grid-row: ${counter + 2}; grid-column: 2;">${
								element.genre_name
							}</p>`;
						}
						if (!familles.includes(element.famille_name)) {
							familles.push(element.famille_name);
							html += `<p class="result ${
								backGroundColors[bgIndex]
							}" style="grid-row: ${counter + 2}; grid-column: 1;">${
								element.famille_name
							}</p>`;
						}
						if (!especes.includes(element.espece_name)) {
							especes.push(element.espece_name);
							html += `<p class="result ${
								backGroundColors[bgIndex]
							} result-espece" style="grid-row: ${
								counter + 2
							}; grid-column: 3;">${element.espece_name}</p>`;
						}
						counter++;
					});
					if (!res) {
						html = "<p>Aucun résultat ne correspond à votre recherche<p>";
					}
					sanitizedHTML = html;
					resultGrid.innerHTML = sanitizedHTML;
					familles.length = 0;
					genres.length = 0;
					especes.length = 0;
				}
			})
			.catch((error) => {
				console.log(error);
			});
	} else if (search.value.length < 2) {
		resultGrid.classList.add("search-result-list-hidden");
	}
}
