export const getRandomColor = (): string => {
  const LETTERS = '0123456789ABCDEF'
  let color = '#'

  for (let i = 0; i < 6; i++) {
    color += LETTERS[Math.floor(Math.random() * 16)]
  }

  return color
}

export const getRandomString = (): string => {
  const LETTERS = 'abcdefghijklmnopqrstuvwxyz'
  let string = ''

  for (let i = 0; i < 6; i++) {
    string += LETTERS[Math.floor(Math.random() * LETTERS.length)]
  }

  return string
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

export const slowLoading = async (delay = 50000): Promise<void> => {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, delay)
  })
}
