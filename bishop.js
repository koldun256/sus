class Bishop {
	constructor(x, y, team) {
		this.x = x
		this.y = y
		this.team = team
	}
	draw(board) {
		Draw.cell(board, this.x, this.y, this.team ? '#8ec07c' : '#689d6a')
	}
	drawSelection(board) {
		this.premoves(board).forEach(premove => Draw.dot(board, ...premove, this.team ? '#8ec07c' : '#689d6a', 7))
	}
	premoveInDirection(board, direction) {
		let result = []
		let position = [this.x + direction[0], this.y + direction[1]]
		while((!board.pieceAt(...position)) && board.exists(...position)) {
			result.push([...position])
			position[0] += direction[0]
			position[1] += direction[1]
		}
		return result
	}
	premoves(board) {
		let result = []
		for(let direction of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
			result.push(...this.premoveInDirection(board, direction))
		}
		return result
	}
	move(board, x, y) {
		for(let premove of this.premoves(board)) {
			if(eq(premove, board.cellAt(x, y))) {
				this.x = premove[0]
				this.y = premove[1]
				return true
			}
		}
		return false
	}
}