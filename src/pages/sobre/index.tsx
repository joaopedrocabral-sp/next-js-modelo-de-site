import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "./styles.module.scss";
import { getPrismicClient } from "../../services/prismic";
import { RichText } from "prismic-dom";
import Prismic from "@prismicio/client";
import { FaYoutube, FaInstagram, FaLinkedin, FaFacebook} from 'react-icons/fa';
import { WhatsappButton } from "../../Components/WhatsappButton";

type Content = {
  title: string;
  description: string;
  banner: string;
  facebook: string;
  instagram: string;
  youtube: string;
  linkedin: string;
  whatsappNumber: string;
}

interface ContentProps{
  content: Content
}


export default function Sobre({ content }: ContentProps){

    

    return (
      <>
        <Head>
          <title>Quem somos | Minha Empresa</title>
          <meta property="og:url" content="https://next-js-modelo-de-site.vercel.app/sobre" />
          <meta property="og:title" content="Página Sobre da Empresa" />
          <meta property="og:description" content="Exemplo de site para Empresas." />
          <meta name="description" content="Este é um exemplo de site para Empresas." />
        </Head>
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <section className={styles.ctaText}>
              <h1>{content.title}</h1>
              <div className={styles.postContent} id="aboutText" dangerouslySetInnerHTML={{ __html: content.description }}></div>

              <a href={content.youtube}>
                <FaYoutube size={40} />
              </a>

              <a href={content.instagram}>
                <FaInstagram size={40} />
              </a>

              <a href={content.facebook}>
                <FaFacebook size={40} />
              </a>

              <a href={content.linkedin}>
                <FaLinkedin size={40} />
              </a>
            </section>

            <img src={content.banner} alt="Sobre Sujeito Programador" />
          </div>
          <WhatsappButton link={content.whatsappNumber} />
        </main>
      </>
    );
}



export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();
  
    const response = await prismic.query([
      Prismic.Predicates.at('document.type', 'about')
    ]);

    const responseTwo = await prismic.query([
      Prismic.Predicates.at("document.type", "whatsapp")
    ]);

    const { whatsapp_number } = responseTwo.results[0].data;
    
    const {
      title,
      description,
      banner,
      facebook,
      instagram,
      youtube,
      linkedin,
    } = response.results[0].data;
  
    const content = {
      title: RichText.asText(title),
      description: RichText.asText(description),
      banner: banner.url,
      facebook: facebook.url,
      instagram: instagram.url,
      youtube: youtube.url,
      linkedin: linkedin.url,
      whatsappNumber: RichText.asText(whatsapp_number),
    };
  
    return{
      props:{
        content
      },
      revalidate: 60 * 30
    }
  }