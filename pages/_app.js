import '../styles/globals.css'
import Header from '../components/Header'
import Container from '../components/Layout'

export default function App ({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Container>
        <Component {...pageProps} />
      </Container>
    </>
  )
}
