const planteForm = document.getElementById("planteForm");
planteForm.addEventListener("input", getResultData);
const securityRegex = /[^a-zA-Z é]/g;

function getResultData() {
	if (document.getElementById("search").value.length >= 2) {
		document
			.getElementById("results-grid")
			.classList.remove("search-result-list-hidden");
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
				let result;
				if (Array.isArray(res)) {
					res.forEach((element) => {
						if (!genres.includes(element.genre)) {
							if (bgIndex == 0) {
								++bgIndex;
							} else {
								bgIndex--;
							}
							genres.push(element.genre);
							html += `<p class="result ${
								backGroundColors[bgIndex]
							}" style="grid-row: ${counter + 2}; grid-column: 2;">${
								element.genre
							}</p>`;
						}
						if (!familles.includes(element.famille)) {
							familles.push(element.famille);
							html += `<p class="result ${
								backGroundColors[bgIndex]
							}" style="grid-row: ${counter + 2}; grid-column: 1;">${
								element.famille
							}</p>`;
						}
						if (!especes.includes(element.espece)) {
							especes.push(element.espece);
							html += `<p class="result ${
								backGroundColors[bgIndex]
							} result-espece" style="grid-row: ${
								counter + 2
							}; grid-column: 3;">${element.espece}</p>`;
						}
						counter++;
					});
					document.getElementById("results-grid").innerHTML = html;
				}
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
					document.getElementById("results-grid").innerHTML = html;
				}
			});
	} else if (document.getElementById("search").value == "") {
		document
			.getElementById("results-grid")
			.classList.add("search-result-list-hidden");
	}
}
