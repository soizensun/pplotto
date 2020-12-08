import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head'
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>pplottlo</title>
      </Head>
      <Component {...pageProps} />
    </>
    
  )
}

export default MyApp
