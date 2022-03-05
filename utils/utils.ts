export const getRandomColor = (): string => {
  const LETTERS = '0123456789ABCDEF'
  let color = '#'

  for (let i = 0; i < 6; i++) {
    color += LETTERS[Math.floor(Math.random() * 16)]
  }

  return color
}

export const capitalizeFirstLetter = (string: string): string => {
  return string
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const insertHtmlAtCaret = (text, insertBetween = false) => {
  let selection, range

  if (window.getSelection) {
    selection = window.getSelection()

    if (selection.getRangeAt && selection.rangeCount) {
      range = selection.getRangeAt(0)
      range.deleteContents()

      let startElement = document.createElement('div')
      let endElement = document.createElement('div')
      startElement.innerHTML = text
      endElement.innerHTML = text
      let frag = document.createDocumentFragment(),
        startNode,
        endNode,
        lastNode

      startNode = startElement.firstChild
      lastNode = frag.appendChild(startNode)

      if (insertBetween) {
        endNode = endElement.firstChild
        lastNode = frag.appendChild(endNode)
      }

      range.insertNode(frag)

      if (lastNode) {
        range = range.cloneRange()
        range.setStartAfter(startNode)
        range.collapse(true)
        selection.removeAllRanges()
        selection.addRange(range)
      }
    }
  }
}
