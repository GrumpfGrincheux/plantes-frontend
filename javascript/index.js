fetch("http://localhost:3000/")
	.then((res) => res.json())
	.then((res) => console.log(res));

// Step 2 : "Get JWT token 🔓"
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
	.then((token) => fetchPokemonlist(token));

// Step 3 : "Get pokemon list 🎉"
const fetchPokemonlist = (token) => {
	fetch("http://localhost:3000/api/pokemons", {
		headers: { Authorization: `Bearer ${token}` },
	})
		.then((res) => res.json())
		.then((res) => console.log(res));
};
