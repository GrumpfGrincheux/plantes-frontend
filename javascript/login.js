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
			// console.log(res);
			return res.token;
		})
		.then((token) => {
			console.log(token);
			localStorage.setItem("userToken", token);
		})
		.catch((error) => {
			console.log(error);
		});
}
