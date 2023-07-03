import { Element } from 'domhandler/lib/node'
import parse, { DOMNode } from 'html-react-parser'
import Image from 'next/image'

interface ConvertBodyProps {
  contentHTML: string
}

const isElement = (node: DOMNode): node is Element => {
  return node.type === 'tag' // nodeがElement型の場合にはtrue、そうでない場合にはfalseを返す
}

export const ConvertBody = ({ contentHTML }: ConvertBodyProps) => {
  const contentReact = parse(contentHTML, {
    replace: (domNode) => {
      if (isElement(domNode) && domNode.name === 'img') {
        const { src, alt, width, height } = domNode.attribs
        return (
          <div>
            <Image
              style={{ width: 'auto', height: 'auto' }}
              src={src}
              alt={alt}
              width={parseInt(width, 10)}
              height={parseInt(height, 10)}
            />
          </div>
        )
      }
    }
  })
  return <>{contentReact}</>
}
