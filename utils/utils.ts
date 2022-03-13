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
  let selection, selectedText, range

  if (window.getSelection) {
    selection = window.getSelection()

    const { anchorNode, anchorOffset, extentOffset } = selection

    if (anchorNode.data) {
      selectedText = anchorNode.data.substring(anchorOffset, extentOffset)
    }

    if (selection.getRangeAt && selection.rangeCount) {
      range = selection.getRangeAt(0)
      range.deleteContents()

      const startElement = document.createElement('div')
      const middleElement = document.createElement('div')
      const endElement = document.createElement('div')
      startElement.innerHTML = text
      middleElement.innerHTML = selectedText
      endElement.innerHTML = text
      let frag = document.createDocumentFragment()
      let startNode
      let middleNode
      let endNode
      let lastNode

      startNode = startElement.firstChild
      lastNode = frag.appendChild(startNode)

      if (selectedText) {
        middleNode = middleElement.firstChild
        lastNode = frag.appendChild(middleNode)
      }

      if (insertBetween) {
        endNode = endElement.firstChild
        lastNode = frag.appendChild(endNode)
      }

      range.insertNode(frag)

      if (lastNode) {
        range = range.cloneRange()
        range.setStartAfter(selectedText ? middleNode : startNode)
        range.collapse(true)
        selection.removeAllRanges()
        selection.addRange(range)
      }
    }
  }
}

export const getErrorFromJoiMessage = (error: object[]): object => {
  interface Error {
    context?: object | any
    message?: string
  }

  return error.reduce((acc, curr) => {
    const { context, message }: Error = curr

    return {
      ...acc,
      [context.label]: message,
    }
  }, {})
}

export const isIntersection = (array1, array2): boolean => {
  return array1.some((element) => array2.includes(element))
}

export const removeErrorFromObject = (obj, error) => {
  const { [error]: value, ...rest } = obj

  return rest
}

export const slowLoading = async (delay = 500): Promise<void> => {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, delay)
  })
}

export const getFormattedDate = (date: Date): string => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const newDate = new Date(date)
  const day = newDate.getDate()
  const monthIndex = newDate.getMonth()
  const monthName = monthNames[monthIndex]
  const year = newDate.getFullYear()

  return `${day} ${monthName}, ${year}`
}

export const encodeHtml = (string: string): string => {
  return string
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/\x3C/g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export const decodeHtml = (string: string): string => {
  return string
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
}
