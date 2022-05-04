const V = {
	eq: ([x1, y1], [x2, y2]) => x1 == x2 && y1 == y2,
	add: ([x1, y1], [x2, y2]) => [x1 + x2, y1 + y2]
}
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const board = new Board(ctx, 30)
canvas.onclick = event => board.onclick([event.offsetX, event.offsetY])
setInterval(() => {
	ctx.fillStyle = 'white'
	ctx.fillRect(0,0,240,240)
	board.draw()
}, 100)