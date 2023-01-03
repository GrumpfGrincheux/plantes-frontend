class Plante {
	_note = [null, 5];
	constructor(famille, genre, espece, nom) {
		this.famille = famille;
		this.genre = genre;
		this.espece = espece;
		this.nom = nom;
	}

	set note(v) {
		if (Number.isInteger(v)) this._note[0] = v;
		else throw new Error("Plante.note must be a number");
	}
	get note() {
		if (this._note[0] != null) return this._note;
		else console.log("Cette plante n'a pas de note -> Plante.note = [number]");
	}
	get plante() {
		return `${this.nom}, ${this.espece}, ${this.famille}`;
	}

	isTasty() {
		if (this._note[0] != null) return this._note[0] >= Plante.tasty;
		else return "Cette plante n'a pas de note";
	}

	static tasty = 3;
}

class SuperPlante extends Plante {
	isTasty() {}
}

const tomate = new Plante(
	"Solanacées",
	"Solanum",
	"Solanum lycopersicum",
	"Tomate",
);
const pdt = new Plante(
	"Solanacées",
	"Solanum",
	"Solanum tuberosum",
	"Pomme de terre",
);

pdt.note = 5;
console.log(tomate.plante);
console.log(pdt.plante);
console.log(tomate.isTasty());
console.log(pdt.note);
console.log(pdt.isTasty());
