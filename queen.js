class Queen {
	constructor(position, team) {
		this.position = position
		this.team = team
		this.color = team ? Colors.purple : Colors.dark_purple
	}
	draw(board) {
		Draw.cell(board, this.position, this.color)
	}
	drawSelection(board) {
		this.premoves(board).forEach(premove => Draw.dot(board, premove, this.color, 7))
	}
	premoveInDirection(board, direction) {
		let result = []
		let position = V.add(this.position, direction)
		while(!board.pieceAt(position) && board.exists(position)) {
			result.push([...position])
			position = V.add(position, direction)
		}
		const last_piece = board.pieceAt(position)
		if(last_piece && last_piece.team != this.team) result.push([...position])
		return result
	}
	premoves(board) {
		let result = []
		for(let direction of [[1, 0], [0, 1], [-1, 0], [0, -1],[1, 1], [-1, 1], [1, -1], [-1, -1]]) {
			result.push(...this.premoveInDirection(board, direction))
		}
		return result
	}
	move(board, clickPos) {
		for(let premove of this.premoves(board)) {
			if(V.eq(premove, board.cellAt(clickPos))) {
				if(board.pieceAt(premove)) board.take(premove)
				this.position = premove
				return true
			}
		}
		return false
	}
}