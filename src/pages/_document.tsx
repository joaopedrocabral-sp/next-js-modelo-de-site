import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document{
    render(){
        return(
            <Html lang="pt-br">
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700;900&display=swap" rel="stylesheet" />
                    <link rel="shortcut icon" href="/favicon.png" type="image/png" />
                    <meta property="og:locale" content="pt_BR" />
                    <meta property="og:type" content="website"/>
                    <meta name="keywords" content="Exemplo de Site"></meta>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}