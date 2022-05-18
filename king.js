class King {
	constructor(position, team) {
		this.position = position
		this.team = team
		this.color = team ? Colors.yellow : Colors.dark_yellow
		this.directions = [[0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1]]
		this.img = new Image()
		this.img.src = team ? 'img/king-red.png' : 'img/king-blue.png'
	}
	draw(board) {
		board.image(this.img, this.position)
	}
	drawSelection(board) {
		if(this.premove(board)) Draw.dot(board, this.premove(board), this.color, 6)
		for(let attack of this.attack(board)) {
			Draw.dot(board, attack, this.color, 6)
		}
	}
	premove(board) {
		return this.directions.map(direction => V.add(direction, this.position)).filter(position => board.exists(position) && !board.pieceAt(position))
	}
	attack(board) {
		return this.directions.map(direction => V.add(direction, this.position))
			.filter(position => board.exists(position) && board.pieceAt(position) && board.pieceAt(position).team != this.team)
	}
	move(board, clickPos) {
		if(this.premove(board) && V.eq(this.premove(board), board.cellAt(clickPos))) {
			this.position = this.premove(board)
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