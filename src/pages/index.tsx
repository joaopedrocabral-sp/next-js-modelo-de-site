import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "../styles/home.module.scss";
import { getPrismicClient } from "../services/prismic";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";

import Image from "next/image";
import techsImage from "../../public/images/techs.svg";
import { WhatsappButton } from "../Components/WhatsappButton";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

type Content ={
  title: string;
  whatsappNumber: string;
  titleContent: string;
  linkAction: string;
  mobileTitle: string;
  mobileContent: string;
  mobileBanner: string;
  webTitle: string;
  webContent: string;
  webBanner: string;
}

interface ContentProps{
  content: Content
}

export default function Home({ content }: ContentProps) {

  useEffect(()=>{
    AOS.init();
  }, [])
  
  return (
    <>
      <Head>
        <title>Home | Meu Projeto</title> 
        <meta property="og:url" content="https://next-js-modelo-de-site.vercel.app/" />
        <meta property="og:title" content="Página Inicial da Empresa" />
        <meta property="og:description" content="Exemplo de site para Empresas." />
        <meta name="description" content="Este é um exemplo de site para Empresas." />
      </Head>
      <main className={styles.container}>
        <div data-aos="fade-down" data-aos-duration="1500" className={styles.containerHeader}>
          <section className={styles.ctaText}>
            <h1>{content.title}</h1>
            <span>{content.titleContent}</span>
            <a href={content.linkAction}>
              <button>
                COMEÇAR AGORA!
              </button>
            </a>
          </section>
          <img src="/images/under-construction.png" alt="Conteúdos da sua empresa" />
        </div>

        <hr className={styles.divisor} />

        <div  className={styles.sectionContent}> 
          <section>
            <h2>{content.mobileTitle}</h2>
            <span>{content.mobileContent}</span>
          </section>
          <img data-aos="fade-right" data-aos-delay="150" src={content.mobileBanner} alt="Conteúdos desenvolvimento de Apps" />
        </div>

        <hr className={styles.divisor} />

        <div  className={styles.sectionContent}> 
          <img data-aos="fade-right" data-aos-delay="150" src={content.webBanner} alt="Conteúdos desenvolvimento de aplicações Web" />
          <section>
            <h2 className={styles.secondImage}>{content.webTitle}</h2>
            <span>{content.webContent}</span>
          </section>
        </div>

        <hr className={styles.divisor} />

        <div  className={styles.nextLevelContent}>
          <Image data-aos="flip-left" src={techsImage} alt="Tecnologias" />
          <h2>Mais de <span className={styles.alunos}>15 mil</span> já levaram sua carreira ao próximo nivel.</h2>
          <span>E você vai perder a chance de evoluir de uma vez por todas?</span>
          <a href={content.linkAction}>
            <button>COMEÇAR AGORA!</button>
          </a>
        </div>
        <WhatsappButton link={content.whatsappNumber}/>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.Predicates.at("document.type", "home")
  ]);

  const responseTwo = await prismic.query([
    Prismic.Predicates.at("document.type", "whatsapp")
  ]);

  const {
    title, sub_title, link_action,
    mobile, mobile_content, mobile_banner,
    title_web, web_content, web_banner
  } = response.results[0].data;

  const { whatsapp_number } = responseTwo.results[0].data;

  const content = {
    title: RichText.asText(title),
    whatsappNumber: RichText.asText(whatsapp_number),
    titleContent: RichText.asText(sub_title),
    linkAction: link_action.url,
    mobileTitle: RichText.asText(mobile),
    mobileContent: RichText.asText(mobile_content),
    mobileBanner: mobile_banner.url,
    webTitle: RichText.asText(title_web),
    webContent: RichText.asText(web_content),
    webBanner: web_banner.url,
  }

  return{
    props:{
      content
    },
    revalidate: 60 * 2
  }
}