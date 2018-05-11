// function loops through the array elements finding blank(null) elements
// compiles those elements into a new array, deleting duplicate arrays
// function then reveals the non-duplicate null elements up to numberd elements
export function chainReveal (board, i, j, height, width, revealed) {
  console.log(i, j, revealed)
  let revealList = [...revealed]
  const adjustments = [-1, 0, 1]
  // debugger
  adjustments.forEach(adjI => {
    adjustments.forEach(adjJ => {
      let adjustedI = i + adjI
      let adjustedJ = j + adjJ
      if (!(adjustedI > -1 && adjustedI < height &&
        adjustedJ > -1 && adjustedJ < width)) {
        return
      }
      if (adjustedI === i && adjustedJ === j) {
        return
      }
      if (isCoordsInReveal(revealList, adjustedI, adjustedJ)) {
        return
      }
      console.log(adjustedI, adjustedJ)
      // we're good in here!
      revealList.push({i: adjustedI, j: adjustedJ})
      if (board[adjustedI][adjustedJ].getContents() === null) {
        revealList = ([...revealList, ...chainReveal(board, adjustedI, adjustedJ, height, width, revealList)])
      }
    })
  })
  return revealList
}

// checks if the i, j coords are in an object and returns a boolean
function isCoordsInReveal (reveal, i, j) {
  const revealed = reveal.find(function (coords) {
    return coords.i === i && coords.j === j
  })
  return typeof revealed !== 'undefined'
}
