import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import UserContextProvider from '../store/user-context'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </UserContextProvider>
  )
}
