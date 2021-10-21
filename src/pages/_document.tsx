import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

class MyDocument extends Document {

  render() {
    const meta = {
      title: 'Enyel Sequeira',

    }
    return (
      <Html lang="en">
        <Head>
          {/* <meta name="robots" content="follow, index" />
          <meta name="description" content={meta.description} />
          <meta property="og:site_name" content={meta.title} />
          <meta property="og:description" content={meta.description} />
          <meta property="og:title" content={meta.title} />
          <meta property="og:image" content={meta.image} />
          <link rel="icon" href={meta.image} sizes="32x32" /> */}
          <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;500;600;700;800;900&family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap" rel="stylesheet" />
        </Head>
        <body className="max-w-screen-2xl border-4 border-red-200 mx-auto bg-light-background-primary dark:bg-dark-background-primary">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument