class VectorField {
	constructor() {
		this.eval = function({ x, y }) {
			return {
				// 'x': 25,
				// 'y': 50
				'x': y**3 - 9*y,
				'y': x**3 - 9*x
			}
		}
		this.spacing = 0.25;
		this.vectors = this.newVectors();
		this.length = 5;
	}
	newVectors() {
		let vectors = [];
		vectors.push(createVector(0, 0));
		for (let i = this.spacing; i <= viewport.x.max; i += this.spacing) {
			vectors.push(createVector(i, 0));
			vectors.push(createVector(-i, 0));
			vectors.push(createVector(0, i));
			vectors.push(createVector(0, -i));
		}
		for (let i = this.spacing; i <= viewport.x.max; i += this.spacing) {
			for (let j = this.spacing; j <= viewport.y.max; j += this.spacing) {
				vectors.push(createVector(i, j));
				vectors.push(createVector(i, -j));
				vectors.push(createVector(-i, j));
				vectors.push(createVector(-i, -j));
			}
		}
		for (let v of vectors) {
			v.tip = createVector(this.eval(v).x, this.eval(v).y);
		}
		return vectors;
	}
}

