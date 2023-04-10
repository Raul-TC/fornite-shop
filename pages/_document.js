import { Html, Head, Main, NextScript } from 'next/document'

export default function Document () {
  return (
    <Html lang='es'>
      <Head />
      <body className='dark:bg-background-black bg-[#f2f2f2]'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
