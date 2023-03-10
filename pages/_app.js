import '../styles/globals.css'
import { ThemeProvider } from '../context/Theme'
import Header from '../components/Header'
import Container from '../components/Layout'

export default function App ({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Header />
      <Container>
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  )
}
