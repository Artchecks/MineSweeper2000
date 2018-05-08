<template>
  <div id="app">
    <div
      id="board"
      oncontextmenu="return false">
      <div
        v-for="(boardRow, i) in board"
        :key="i"
        class="row">
        <the-square
          v-for="(square, j) in boardRow"
          :key="j"
          :square="square"
          @reveal="reveal(i, j)"
          @flag="flag(i, j)"/>
      </div>
    </div>
    <div
      v-show="lost"
      id="loser">You lost!</div>
  </div>
</template>

<script>
import Square from './Square.js'
import TheSquare from './components/TheSquare.vue'
import {chainReveal} from './boardHelpers.js'
export default {
  name: 'App',
  components: {
    TheSquare
  },
  data () {
    return {
      board: [],
      height: 10,
      width: 10,
      lost: false
    }
  },
  created () {
    let adjustments = [-1, 0, 1]
    // create an array
    let board = []
    // loop through the array height, create arrays per column
    for (let i = 0; i < this.height; i++) {
      board[i] = []
      // loop through array width, create elements until width is max
      for (let j = 0; j < this.width; j++) {
        // fill array rows and columns with Square objects
        board[i][j] = new Square()
      }
    }
    // assigns numbers to null element based on number of bombs in it's vacinity
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (board[i][j].getContents() === 'M') {
          adjustments.forEach(adjI => {
            adjustments.forEach(adjJ => {
              let adjustedI = i + adjI
              let adjustedJ = j + adjJ
              if (adjustedI > -1 &&
                adjustedI < this.height &&
                adjustedJ > -1 &&
                adjustedJ < this.width) {
                board[adjustedI][adjustedJ].incrementHint()
              }
            })
          })
        }
      }
    }
    // set the vue data
    console.log(board)
    this.board = board
  },
  methods: {
    // reveals the elements selected, if null calls chainReveal to reveal all null elements in vacinity
    // if bomb, reveals bomb and presents 'You Lost' string
    reveal (i, j) {
      const board = this.board
      board[i][j].reveal()
      if (board[i][j].getContents() === 'M') {
        this.lost = true
      } else if (board[i][j].getContents() === null) {
        let revealList = chainReveal(board, i, j, this.height, this.width, [])
        console.log(revealList)
        revealList.forEach(coords => {
          board[coords.i][coords.j].reveal()
        })
      }
      this.board = board
    },
    // right click presents flag
    flag (i, j) {
      const board = this.board
      board[i][j].flag()
      this.board = board
    }
  }
}
</script>

<style>
#board {
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
}

#loser {
  font-size: 3em;
  color: red;
  border-bottom: 3px solid red;
}
</style>
