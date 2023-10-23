import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link'
import Image from 'next/image'


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>XPath Tester</title>
      </Head>

      <main>
      <Image
      src="/images/logo.png"
      width={100}
      height={100}
      alt="AI generated LOGO"
    />
        <h1 className={styles.title}>
          XPath Tester
        </h1>

       

        <div className={styles.grid}>
          <Link href="env" className={styles.card}>
            <h3>Environment Setup &rarr;</h3>
            <p>Create your setup environment to configure the test creation.</p>
          </Link>

          <Link href="create" className={styles.card}>
            <h3>Test Creation &rarr;</h3>
            <p>Create tests for a particular Yang model and assign vale.</p>
          </Link>

          <Link href="test" className={styles.card}>
            <h3>Test Execution &rarr;</h3>
            <p>Execute tests for a particular Yang model and assign values.</p>
          </Link>
        </div>
      </main>



      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
