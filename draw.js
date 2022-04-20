const Draw = {}
Draw.cell = (board, pos, color) => {
	board.ctx.fillStyle = color
	board.ctx.fillRect(...board.rect(pos))
}
Draw.dot = (board, pos, color, r) => {
	board.ctx.beginPath()
	board.ctx.arc(...board.center(pos), r, 0, 2 * Math.PI, false)
	board.ctx.fillStyle = color
	board.ctx.fill()
}