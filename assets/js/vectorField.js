class VectorField {
	constructor() {
		this.func = ({x, y}) => { return {'x': y**3 - 9*y, 'y': x**3 - 9*x }};
		// this.func = ({x, y}) => { return {'x': -y, 'y': x }; };
		// this.func = ({x, y}) => { return { 'x': x, 'y': y }; };
		// this.func = ({x, y}) => { return { 'x': Math.sin(y), 'y': Math.sin(x) }; };
		// this.func = ({x, y}) => { return { 'x': Math.sin(x) + Math.sin(y), 'y': Math.sin(x) - Math.sin(y) }; };
		// this.func = ({x, y}) => { return { 'x': 0, 'y': y*Math.sin(x) }; };
		// this.func = ({x, y}) => { return { 'x': x**3, 'y': y**3 }; };
		// this.func = ({x, y}) => { return { 'x': Math.cos(x + y), 'y': Math.sin(x*y) }; };
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

