class Pawn {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
	draw(board) {
		board.ctx.fillStyle = 'brown'
		board.ctx.fillRect(...board.rect(this.x, this.y))
	}
}