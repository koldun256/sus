class Knight {
	constructor(position, team) {
		this.position = position
		this.team = team
		this.color = team ? Colors.red : Colors.dark_red
	}
	draw(board) {
		Draw.cell(board, this.position, this.color)
	}
	drawSelection(board) {
		this.premoves(board).forEach(premove => Draw.dot(board, premove, this.color, 6))
	}
	premoves(board) {
		return [[2,1],[1,2],[-1,2],[2,-1],[-2,1],[1,-2],[-1,-2],[-2,-1]]
			.map(dir => V.add(this.position, dir))
			.filter(position => board.exists(position) && !(board.pieceAt(position) && board.pieceAt(position).team == this.team))
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