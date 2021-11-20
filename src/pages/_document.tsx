import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

class MyDocument extends Document {

  render() {

    const meta = {
      image: '/images/placeholder.jpeg'
    }

    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href={meta.image} sizes="32x32" />
          <meta name="robots" content="follow, index" />

          <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;500;600;700;800;900&family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap" rel="stylesheet" />
        </Head>
        <body className="max-w-screen-2xl  mx-auto bg-light-background-primary dark:bg-dark-background-primary">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument