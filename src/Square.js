/* create Square objects */
class Square {
  constructor () {
    // random number generated, if floating point is greater than .8 give element a bomb
    if (Math.random() > 0.8) {
      this.contents = 'M'
    } else {
      this.contents = null
    }
    this.isRevealed = false
    this.isFlagged = false
  }
  // returns the contents of the element (mine, null, number)
  getContents () {
    return this.contents
  }
  // called on click to reveal element
  reveal () {
    this.isRevealed = true
  }
  // function called when element is right clicked, toggling flag img
  flag () {
    if (this.isRevealed === false) {
      this.isFlagged = !this.isFlagged
    }
  }
  // if element is null, assign it a number based on
  // how many mines are nearby.
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
