import React, { forwardRef } from 'react'
import BoldIcon from '@public/static/images/toolbar_bold.svg'
import ItalicIcon from '@public/static/images/toolbar_italic.svg'
import LinkIcon from '@public/static/images/toolbar_link.svg'
import OlIcon from '@public/static/images/toolbar_ol.svg'
import UlIcon from '@public/static/images/toolbar_ul.svg'
import HeadingIcon from '@public/static/images/toolbar_heading.svg'
import QuoteIcon from '@public/static/images/toolbar_quote.svg'
import CodeIcon from '@public/static/images/toolbar_code.svg'
import CodeBlockIcon from '@public/static/images/toolbar_codeblock.svg'
import ImageIcon from '@public/static/images/toolbar_image.svg'
import UnderlineIcon from '@public/static/images/toolbar_underline.svg'
import StrikeIcon from '@public/static/images/toolbar_strike.svg'
import DividerIcon from '@public/static/images/toolbar_divider.svg'
import { insertHtmlAtCaret } from '@utils/utils'
import { Tooltip } from '@components/Tooltip'
import { Button } from '@components/Button'

const toolbarItems = [
  { label: 'Bold', value: 'bold', icon: BoldIcon },
  { label: 'Italic', value: 'italic', icon: ItalicIcon },
  { label: 'Link', value: 'link', icon: LinkIcon },
  { label: 'Ordered list', value: 'ol', icon: OlIcon },
  { label: 'Unordered list', value: 'ul', icon: UlIcon },
  { label: 'Heading', value: 'heading', icon: HeadingIcon },
  { label: 'Quote', value: 'quote', icon: QuoteIcon },
  { label: 'Code', value: 'code', icon: CodeIcon },
  { label: 'Code Block', value: 'codeblock', icon: CodeBlockIcon },
  // { label: 'Image', value: 'image', icon: ImageIcon },
  { label: 'Underline', value: 'underline', icon: UnderlineIcon },
  { label: 'Strikethrough', value: 'strike', icon: StrikeIcon },
  { label: 'Line divider', value: 'divider', icon: DividerIcon },
]

const toolbarItemOptions = {
  bold: {
    syntax: '**',
    insertBetween: true,
  },
  italic: {
    syntax: '_',
    insertBetween: true,
  },
  link: {
    syntax: '[](url)',
  },
  ol: {
    syntax: '1.&nbsp;',
  },
  ul: {
    syntax: '*&nbsp;',
  },
  heading: {
    syntax: '##&nbsp;',
  },
  quote: {
    syntax: '|&nbsp;',
  },
  code: {
    syntax: '`',
    insertBetween: true,
  },
  codeblock: {
    syntax: '<div>```</div>',
    insertBetween: true,
  },
  underline: {
    syntax: '__',
    insertBetween: true,
  },
  strike: {
    syntax: '~~',
    insertBetween: true,
  },
  divider: {
    syntax: '<div><br>---</div>',
  },
}

type TToolbarProps = {
  content: any
}

const Toolbar = forwardRef<HTMLDivElement, TToolbarProps>(
  ({ content }, ref) => {
    const onClick = (e) => {
      const { value } = e.target
      const options = toolbarItemOptions[value]

      if (ref && 'current' in ref && ref.current) {
        ref.current.focus()

        if (options) {
          const { syntax, insertBetween = false } = options

          insertHtmlAtCaret(syntax, insertBetween)
        }
        content.current = ref.current.innerText
      }
    }

    return (
      <div className="sticky -top-1 z-30 mb-4 -ml-8 -mr-8 bg-gray-50 py-1 px-8">
        <div className="flex flex-wrap items-stretch gap-1">
          {toolbarItems.map(({ label, value, icon: Icon }, index) => {
            const className =
              'focus:outline-indigo-500 rounded p-1.5 hover:bg-indigo-100 hover:fill-tertiary-900 focus:bg-indigo-50 focus:outline-1'
            if (value === 'image') {
              return (
                <Tooltip key={index} message={label}>
                  <label role="button" className={className}>
                    <Icon />
                    <input type="file" className="hidden" />
                  </label>
                </Tooltip>
              )
            }

            return (
              <Tooltip key={index} message={label}>
                <Button
                  key={index}
                  variant="quaternary"
                  className="p-1.5"
                  tabIndex={0}
                  value={value}
                  aria-label={label}
                  onClick={onClick}
                >
                  <Icon className="pointer-events-none" />
                </Button>
              </Tooltip>
            )
          })}
        </div>
      </div>
    )
  }
)
Toolbar.displayName = 'Toolbar'

export default Toolbar
