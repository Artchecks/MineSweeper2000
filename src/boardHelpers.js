export function chainReveal (board, i, j, height, width, revealed) {
  console.log(i, j, revealed)
  let revealList = [...revealed]
  const adjustments = [-1, 0, 1]
  // debugger
  adjustments.forEach(adjI => {
    adjustments.forEach(adjJ => {
      let adjustedI = i + adjI
      let adjustedJ = j + adjJ
      console.log(adjustedI, adjustedJ)
      if (adjustedI > -1 && adjustedI < height &&
        adjustedJ > -1 && adjustedJ < width &&
        !(adjustedI === i && adjustedJ === j) &&
        revealList.findIndex(coords => coords.i === adjustedI && coords.j === adjustedJ) === -1) {
        // we're good in here!
        revealList.push({i: adjustedI, j: adjustedJ})
        if (board[adjustedI][adjustedJ].getContents() === null) {
          revealList = arrayUnique([...revealList, ...chainReveal(board, adjustedI, adjustedJ, height, width, revealList)])
        }
      }
    })
  })
  return revealList
}

function arrayUnique (array) {
  var a = array.concat()
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) {
        a.splice(j--, 1)
      }
    }
  }

  return a
}
