// Step 1 : "Get JWT token 🔓"
let userToken;
fetch("http://localhost:3000/api/login", {
	method: "POST",
	body: JSON.stringify({ username: "root", password: "root" }),
	headers: { "Content-type": "application/json" },
})
	.then((res) => res.json())
	.then((res) => {
		console.log(res);
		return res.token;
	})
	.then((token) => {
		console.log(token);
		userToken = token;
	});

document.getElementById("planteForm").addEventListener("input", function () {
	// Step 2 : "Get 🎉"
	const textInput = document.getElementById("search").value;
	fetch(`http://localhost:3000/find/familles?name=${textInput}`, {
		headers: { Authorization: `Bearer ${userToken}` },
	})
		.then((res) => res.json())
		.then((res) => console.log(res));
});
