const height = 8
const width = 8
class Board {
	constructor(ctx, cellSize) {
		this.pieces = []
		this.ctx = ctx
		this.cellSize = cellSize
		this.team = true
		this.selectedPiece = null
	}
	exists(x, y) {
		return x < width && y < height && y >= 0 && x >= 0
	}
	rect(x, y) {
		return [x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize]
	}

	center(x, y) {
		return [(x+0.5) * this.cellSize, (y+0.5) * this.cellSize]
	}

	cellAt(x, y) {
		let cell = [Math.floor(x / this.cellSize), Math.floor(y / this.cellSize)]
		return this.exists(...cell) ? cell : null
	}

	onclick(x, y) {
		if(this.selectedPiece) {
			if(!this.selectedPiece.move(this, x, y)) {
				this.selectedPiece = null
				this.onclick(x, y)
			}else {
				this.selectedPiece = null
				this.team = !this.team
			}
		} else {
			if(!this.cellAt(x, y)) return
			this.selectedPiece = this.pieceAt(...this.cellAt(x, y))
			if(this.selectedPiece.team != this.team) this.selectedPiece = null
		}
	}

	addPiece(piece) {
		this.pieces.push(piece)
	}

	pieceAt(cellX, cellY) {
		return this.pieces.find(piece => piece.x == cellX && piece.y == cellY) || null
	}

	draw() {
		for(let x = 0; x < width; x++) {
			for(let y = 0; y < height; y++) {
				if((x + y) % 2 == 1) {
					Draw.cell(this, x, y, '#a89984')
				} else {
					Draw.cell(this, x, y, '#ebdbb2')
				}
			}
		}
		this.pieces.forEach(piece => piece.draw(this))
		if(this.selectedPiece) this.selectedPiece.drawSelection(this)
	}
}