
class Square {
  constructor () {
    if (Math.random() > 0.8) {
      this.contents = 'M'
    } else {
      this.contents = null
    }
    this.isRevealed = false
    this.isFlagged = false
  }
  getContents () {
    return this.contents
  }
  reveal () {
    this.isRevealed = true
  }
  flag () {
    if (this.isRevealed === false) {
      this.isFlagged = !this.isFlagged
    }
  }
  incrementHint () {
    if (this.contents !== 'M') {
      if (this.contents === null) {
        this.contents = 1
      } else {
        this.contents++
      }
    }
  }
}
export default Square
