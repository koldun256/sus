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
	exists([x, y]) {
		return x < width && y < height && y >= 0 && x >= 0
	}
	rect([x, y]) {
		return [x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize]
	}
	image(image, [x, y]) {
		this.ctx.drawImage(image, x * this.cellSize, y * this.cellSize)
	}

	center([x, y]) {
		return [(x+0.5) * this.cellSize, (y+0.5) * this.cellSize]
	}

	cellAt([x, y]) {
		let cell = [Math.floor(x / this.cellSize), Math.floor(y / this.cellSize)]
		return this.exists(cell) ? cell : null
	}
	
	take(position) {
		this.pieces = this.pieces.filter(piece => !(V.eq(piece.position, position) && piece.team != this.team))
		console.log(position)
	}

	onclick(pos) {
		if(this.selectedPiece) {
			if(!this.selectedPiece.move(this, pos)) {
				this.selectedPiece = null
				this.onclick(pos)
			}else {
				this.selectedPiece = null
				this.team = !this.team
			}
		} else {
			let cell = this.cellAt(pos)
			console.log(this.pieceAt(cell))
			if(!this.exists(cell) || !this.pieceAt(cell)) return
			this.selectedPiece = this.pieceAt(cell)
			console.log(this.selectedPiece)
			if(this.selectedPiece.team != this.team) this.selectedPiece = null
		}
	}

	addPiece(piece) {
		this.pieces.push(piece)
	}

	pieceAt(position) {
		return this.pieces.find(piece => V.eq(piece.position, position)) || null
	}

	draw() {
		for(let x = 0; x < width; x++) {
			for(let y = 0; y < height; y++) {
				if((x + y) % 2 == 1) {
					Draw.cell(this, [x, y], Colors.bg_dark)
				} else {
					Draw.cell(this, [x, y], Colors.bg_light)
				}
			}
		}
		this.pieces.forEach(piece => piece.draw(this))
		if(this.selectedPiece) this.selectedPiece.drawSelection(this)
	}
}