class Rook {
	constructor(x, y, team) {
		this.x = x
		this.y = y
		this.team = team
	}
	draw(board) {
		Draw.cell(board, this.x, this.y, this.team ? '#fabd2f' : '#d79921')
	}
	drawSelection(board) {
		this.premoves(board).forEach(premove => Draw.dot(board, ...premove, this.team ? '#fabd2f' : '#d79921', 7))
	}
	premoves(board) {
		while
	}
	move(board, x, y) {
		return this.premoves(board).reduce((moved, premove) => {
			if(!moved && eq(premove, board.cellAt(x, y))) {
				this.x = premove[0]
				this.y = premove[1]
				return true
			}
			return false
		}, false)
	}
}