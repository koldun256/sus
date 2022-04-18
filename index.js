function eq(cell1, cell2) {
	return cell1[0] == cell2[0] && cell1[1] == cell2[1]
}
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const board = new Board(ctx, 30)
canvas.onclick = event => board.onclick(event.offsetX, event.offsetY)
board.addPiece(new Pawn(2, 4, true))
board.addPiece(new Rook(1,1,true))
board.addPiece(new Bishop(5,5,false))
board.addPiece(new Pawn(4, 4, false))
setInterval(() => {
	ctx.fillStyle = 'white'
	ctx.fillRect(0,0,240,240)
	board.draw()
}, 100)