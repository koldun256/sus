const Draw = {}
Draw.cell = (board, x, y, color) => {
	board.ctx.fillStyle = color
	board.ctx.fillRect(...board.rect(x, y))
}
Draw.dot = (board, x, y, color, r) => {
	board.ctx.beginPath()
	board.ctx.arc(...board.center(x, y), r, 0, 2 * Math.PI, false)
	board.ctx.fillStyle = color
	board.ctx.fill()
}