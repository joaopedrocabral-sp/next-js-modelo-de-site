import { AppProps } from "next/app";
import "../styles/global.scss";
import { Header } from "../Components/Header"
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";
import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import Cookies from 'js-cookie'

function MyApp({ Component, pageProps }: AppProps	) {

  //Verificar se existe o cookie, se existir injetar o GTM
  useEffect(() => {
    if(getCookieConsentValue() === "true"){
      const script = document.createElement('script');
      script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-XXXXXXX');`

      document.getElementsByTagName('head')[0].appendChild(script);
    }
  },[]);


  return (
    <>
      <Header />
      <Component {...pageProps} />
      <CookieConsent
        onAccept={() => CookieAccept()}
        location="none"
        buttonText="Aceito! 😉"
        enableDeclineButton
        style={{ background: "#2B373B", width:"90%", left: "50%", bottom: "15px", borderRadius: "15px", wordWrap: "break-word", transform: "translate(-50%, 0)", maxWidth: "1000px", justifyContent: "space-around", alignItems: "center", padding: "0.5rem 0" }}
        buttonStyle={{ background: "#1fa4e5", color: "#ffffff", fontSize: "1.2rem", borderRadius: "10px", padding: "0.3rem 1.7rem", margin: "0.5rem" }}
        declineButtonStyle={{color: "#ffffff", fontSize: "0.8rem", borderRadius: "10px", padding: "0.5rem 1rem", margin: "0.5rem"}}
        declineButtonText="Não aceito 👎"
        expires={180}
        contentStyle={{flex: "1 0 250"}}
      >
        Este site usa cookies para melhorar a experiência do usuário.{" "}
        <p style={{ fontSize: "10px", width: "fit-content"  }}>Leia nossa <a style={{color: "#1fa4e5" }} href="https://www.linkedin.com/in/joao-pedro-cabral-sp/" >política de privacidade</a></p>
      </CookieConsent>
    </>
  );
}


//Injetar tag manager quando aceitar o cookie
function CookieAccept(){
  const script = document.createElement('script');
  script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-XXXXXXX');`

  document.getElementsByTagName('head')[0].appendChild(script);
}


export default MyApp;
