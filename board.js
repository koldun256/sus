class Board {
	constructor(ctx, cellSize) {
		this.pieces = []
		this.ctx = ctx
		this.cellSize = cellSize
	}
	
	rect(x, y) {
		return [x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize]
	}

	addPiece(piece) {
		console.log(piece)
		this.pieces.push(piece)
	}

	draw() {
		this.pieces.forEach(piece => piece.draw(this))
	}
}