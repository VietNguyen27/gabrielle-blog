import React from 'react'
import { Emphasize } from '@components/Emphasize'

const HintThree = () => {
  return (
    <>
      <h4 className="mb-3 text-lg font-bold">Editor Basics</h4>
      <ul className="list-disc pl-6 text-gray-800">
        <li className="mb-1 last:mb-0">
          Use <Emphasize>Markdown</Emphasize> to write and format posts.
          <details>
            <summary>Commonly used syntax</summary>
            <div className="mb-4 mt-2 rounded-lg border border-gray-300 bg-gray-50">
              <table className="text-sm leading-tight">
                <colgroup>
                  <col width="65%" />
                  <col width="35%" />
                </colgroup>
                <tbody>
                  <tr>
                    <td className="p-2">
                      # Header
                      <br />
                      ...
                      <br />
                      ###### Header
                    </td>
                    <td className="p-2">
                      H1 Header
                      <br />
                      ...
                      <br />
                      H6 Header
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">_italics_</td>
                    <td className="p-2">
                      <span className="italic">italics</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">**bold**</td>
                    <td className="p-2">
                      <span className="font-bold">bold</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">[Link](https://...)</td>
                    <td className="p-2">
                      <a href="#" className="text-tertiary-500">
                        Link
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">
                      * item 1
                      <br />* item 2
                    </td>
                    <td className="p-2">
                      <ul className="list-disc pl-5">
                        <li>item 1</li>
                        <li>item 2</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">
                      1. item 1
                      <br />
                      2. item 2
                    </td>
                    <td className="p-2">
                      <ol type="1" className="list-decimal pl-5">
                        <li>item 1</li>
                        <li>item 2</li>
                      </ol>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">| quoted text</td>
                    <td className="p-2">
                      <span className="border-0 border-l-2 border-solid pl-2">
                        quoted text
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">
                      <span className="text-lg">`</span>inline code
                      <span className="text-lg">`</span>
                    </td>
                    <td className="p-2">
                      <code className="rounded bg-gray-300/50 p-1">
                        inline code
                      </code>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">
                      <span className="text-lg">```</span>
                      <br />
                      code block
                      <br />
                      <span className="text-lg">```</span>
                    </td>
                    <td className="p-2">
                      <div className="overflow-hidden rounded-md bg-gray-900 p-2 text-xs text-white">
                        <code>code block</code>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">__underlined__</td>
                    <td className="p-2">
                      <u>underlined</u>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">~~strikethrough~~</td>
                    <td className="p-2">
                      <del>strikethrough</del>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </details>
        </li>
        <li className="mb-1 last:mb-0">
          In addition to images for the post's content, you can also drag and
          drop a cover image.
        </li>
      </ul>
    </>
  )
}

export default HintThree
