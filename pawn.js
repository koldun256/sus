class Pawn {
	constructor(position, team) {
		this.position = position
		this.team = team
		this.color = team ? Colors.yellow : Colors.dark_yellow
		this.direction = [0, team ? 1 : -1]
		this.attackDirections = [[1, team ? 1 : -1], [-1, team ? 1 : -1]]
	}
	draw(board) {
		Draw.cell(board, this.position, this.color)
	}
	drawSelection(board) {
		this.premoves(board).forEach(premove => Draw.dot(board, premove, this.color, 6))
	}
	premove(board) {
		let forward = V.add(this.position, this.direction)
		return board.exists(forward) && !board.pieceAt(forward) && forward
	}
	attack(board) {
		return this.attackDirections
			.map(dir => V.add(this.position, dir))
			.filter(pos => board.pieceAt(pos) && board.pieceAt(pos).team == !this.team))
	}
	move(board, clickPos) {
		if(this.premove(board) && V.eq(this.premove(board), board.cellAt(clickPos))) {
			this.position = this.premove(clickPos)
			return true
		}
		for(let attack of this.attack(board)) {
			if(V.eq(attack, board.cellAt(clickPos))) {
				this.position = attack
				board.take(attack)
				return true
			}
		}
		return false
	}
}