class VectorField {
	constructor() {
		this.func = vectorFunctions[0].eval;
		this.spacing = config.vector.spacing;
		this.vectors = this.newVectors();
	}
	eval(x, y) {
		return this.func(x, y);
	};
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

class VectorFunction {
	constructor(m, n, latex) {
		this.eval = function({x, y}) { return {'x': m(x, y), 'y': n(x, y)} };
		this.latex = latex;
	}
}
