import '../styles/globals.css'
import { ThemeProvider } from '../context/Theme'
import Header from '../components/Header'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>)
}
