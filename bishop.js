class Bishop {
	constructor(position, team) {
		this.position = position
		this.team = team
		this.color = team ? Colors.green : Colors.dark_green
	}
	draw(board) {
		Draw.cell(board, this.position, this.color)
	}
	drawSelection(board) {
		this.premoves(board).forEach(premove => Draw.dot(board, premove, this.color, 6))
	}
	premoveInDirection(board, direction) {
		let result = []
		let position = V.add(this.position, direction)
		while((!board.pieceAt(position)) && board.exists(position)) {
			result.push([...position])
			position = V.add(position, direction)
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
	move(board, clickPos) {
		for(let premove of this.premoves(board)) {
			if(V.eq(premove, board.cellAt(clickPos))) {
				this.position = premove
				return true
			}
		}
		return false
	}
}