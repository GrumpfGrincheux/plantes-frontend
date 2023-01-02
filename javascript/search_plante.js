const planteForm = document.getElementById("planteForm");
planteForm.addEventListener("input", getResultData);

function getResultData() {
	if (document.getElementById("search").value != "") {
		document
			.getElementById("results-grid")
			.classList.remove("search-result-list-hidden");
		const send = new FormData(planteForm);
		const xhr = new XMLHttpRequest();
		xhr.open("POST", "/pages/plantes/php/search_plantes.php", true);
		xhr.onload = () => {
			if (xhr.status === 200 && xhr.readyState === 4) {
				const jsonObject = JSON.parse(xhr.responseText);
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
				jsonObject.forEach((element) => {
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
		};
		xhr.send(send);
	} else if (document.getElementById("search").value == "") {
		document
			.getElementById("results-grid")
			.classList.add("search-result-list-hidden");
	}
}
