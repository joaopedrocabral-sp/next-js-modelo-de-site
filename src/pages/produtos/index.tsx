import styles from "./styles.module.scss";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { FiChevronLeft, FiChevronsLeft, FiChevronRight,FiChevronsRight } from "react-icons/fi";
import { GetStaticProps } from "next";
import { getPrismicClient } from "../../services/prismic";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

type Product = {
    slug: string;
    title: string;
    cover: string;
    price: string;
}

interface ProductProps{
    products: Product[];
    page: string;
    totalPage: string;
    content: any;
}

export default function Products({products: produtos, page, totalPage, content}: ProductProps){
    const [products, setProducts] = useState(produtos || []);
    const [currentPage, setCurrentPage] = useState(Number(page))

    //Buscar novos Produtos quando mudar de página
    async function reqProduct(pageNumber: number){
        const prismic = getPrismicClient();
        const response = await prismic.query([
            Prismic.Predicates.at("document.type", "product")
        ], {
            orderings: "[document.last_publication_date desc]", //Ordenar pelo mais recente
            fetch: ["product.title", "product.cover", "product.price"],
            pageSize: 8,
            page: String(pageNumber),
        })
        return response;
    }

    async function navigatePage(pageNumber: number){
        const response = await reqProduct(pageNumber);

        if(response.results.length === 0){
            return;
        }

        const getProducts = response.results.map(product => {
            return{
                slug: product.uid,
                title: RichText.asText(product.data.title),
                cover: product.data.cover.url,
                price: RichText.asText(product.data.price),
                }
            }   
        )

        setCurrentPage(pageNumber);
        setProducts(getProducts);
    }

    return (
      <>
        <Head>
          <title>Produtos | Tekizon</title>
          <meta property="og:url" content="https://next-js-modelo-de-site.vercel.app/produtos" />
          <meta property="og:title" content="Página Produtos da Empresa" />
          <meta property="og:description" content="Exemplo de site para Empresas." />
          <meta name="description" content="Este é um exemplo de site para Empresas." />
        </Head>
        <main className={styles.container}>
          <div className={styles.products}>
            {products.map((product) => (
                <div className={styles.produto} key={product.slug}>
                  <div>
                    <Image
                      src={product.cover}
                      alt={product.title}
                      width={200}
                      height={300}
                      quality={100}
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOceAQAAewBV8186UYAAAAASUVORK5CYII="
                    />
                    <strong>{product.title}</strong>
                  </div>
                  <div>
                    <p>R$ {product.price}</p>
                    <Link
                      href={`https://api.whatsapp.com/send?phone=55${content.whatsappNumber}&text=Estava vendo esse(a) ${product.title}`}
                    >
                      <button>
                        <FaWhatsapp size={20} />
                        <span>WhatsApp</span>
                      </button>
                    </Link>
                  </div>
                </div>
            ))}
          </div>
          <div className={styles.buttonNavigate}>
            {Number(currentPage) >= 2 && (
              <div>
                <button onClick={() => navigatePage(1)}>
                  <FiChevronsLeft size={25} color="#FFF" />
                </button>
                <button onClick={() => navigatePage(Number(currentPage - 1))}>
                  <FiChevronLeft size={25} color="#FFF" />
                </button>
              </div>
            )}
            {Number(currentPage) < Number(totalPage) && (
              <div>
                <button onClick={() => navigatePage(Number(currentPage + 1))}>
                  <FiChevronRight size={25} color="#FFF" />
                </button>
                <button onClick={() => navigatePage(Number(totalPage))}>
                  <FiChevronsRight size={25} color="#FFF" />
                </button>
              </div>
            )}
          </div>
        </main>
      </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();

    const response = await prismic.query([
        Prismic.Predicates.at("document.type", "product")
    ], {
        orderings: "[document.last_publication_date desc]", //Ordenar pelo mais recente
        fetch: ["product.title", "product.cover", "product.price"],
        pageSize: 8,
    });

    const products = response.results.map(product => {
        return{
            slug: product.uid,
            title: RichText.asText(product.data.title),
            cover: product.data.cover.url,
            price: RichText.asText(product.data.price),
            }
        }   
    )

    const responseTwo = await prismic.query([
        Prismic.Predicates.at("document.type", "whatsapp")
    ]);

    const { whatsapp_number } = responseTwo.results[0].data;

    const content = {
        whatsappNumber: RichText.asText(whatsapp_number)
    } 

    return{
        props:{
            products,
            page: response.page,
            totalPage: response.total_pages,
            content,
        },
        revalidate: 60 * 30
    }
}