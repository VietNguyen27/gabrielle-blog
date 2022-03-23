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

export const getFormattedDate = (date: Date | number): string => {
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

export const parseMarkdown = (markdownText: string): string => {
  const htmlText = markdownText
    .replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, '<b>$1</b>')
    .replace(
      /\[(.*?)\]\((.*?)\)/gim,
      "<a class='markdown-link' href='$2'>$1</a>"
    )
    .replace(/^\s*\n\*/gm, "<ul class='markdown-ul'>\n*")
    .replace(/^(\*.+)*\n([^\*])/gm, '$1\n</ul>\n\n$2')
    .replace(/^\*\s(.+)/gm, '<li>$1</li>')
    .replace(/^\s*\n\d\./gm, "<ol class='markdown-ol'>\n1.")
    .replace(/^(\d\..+)*\n([^\d\.])/gm, '$1\n</ol>\n\n$2')
    .replace(/^\d\.\s(.+)/gm, '<li>$1</li>')
    .replace(/[\#]{6}\s(.+)/g, "<h6 class='font-bold text-lg'>$1</h6>")
    .replace(/[\#]{5}\s(.+)/g, "<h5 class='font-bold text-lg'>$1</h5>")
    .replace(/[\#]{4}\s(.+)/g, "<h4 class='font-bold text-xl'>$1</h4>")
    .replace(/[\#]{3}\s(.+)/g, "<h3 class='font-bold text-2xl'>$1</h3>")
    .replace(/[\#]{2}\s(.+)/g, "<h2 class='font-bold text-3xl'>$1</h2>")
    .replace(/[\#]{1}\s(.+)/g, "<h1 class='font-bold text-4xl'>$1</h1>")
    .replace(
      /^\|\s(.+)/gm,
      "<blockquote class='markdown-quote'>$1</blockquote>"
    )
    .replace(
      /```*([^]+?.*?[^]+?[^]+?)```/g,
      "<div class='markdown-codeblock'><pre>$1</pre></div>"
    )
    .replace(/[\`]{1}([^\`]+)[\`]{1}/g, "<code class='markdown-code'>$1</code>")
    .replace(/\_\_(.*)\_\_/gim, '<u>$1</u>')
    .replace(/\~\~(.*)\~\~/gim, '<del>$1</del>')
    .replace(/\-\-\-/gim, "<hr class='markdown-divider'>")
    .replace(/[\*\_]{1}([^\*\_]+)[\*\_]{1}/g, '<i>$1</i>')
    .replace(/^\s*(\n)?(.+)/gm, function (markdown) {
      return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(markdown)
        ? markdown
        : '<p>' + markdown + '</p>'
    })

  return htmlText.trim()
}

export const resizeImage = (
  base64Str: string,
  maxWidth = 500,
  maxHeight = 250
): Promise<string> => {
  return new Promise((resolve) => {
    let img = new Image()
    img.src = base64Str
    img.onload = () => {
      const MAX_WIDTH = maxWidth
      const MAX_HEIGHT = maxHeight
      let canvas = document.createElement('canvas')
      let width = img.width
      let height = img.height

      if (maxWidth === maxHeight) {
        width = MAX_WIDTH
        height = MAX_HEIGHT
      } else if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width
          width = MAX_WIDTH
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height
          height = MAX_HEIGHT
        }
      }
      canvas.width = width
      canvas.height = height
      let ctx = canvas.getContext('2d')
      ctx!.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL())
    }
  })
}
