fetch("");

document.getElementById("planteForm").addEventListener("input", function () {
	// Step 2 : "Get 🎉"
	const textInput = document.getElementById("search").value;
	fetch(`http://localhost:3000/find/familles?name=${textInput}`, {
		headers: { Authorization: `Bearer ${token}` },
	})
		.then((res) => res.json())
		.then((res) => console.log(res));
});
