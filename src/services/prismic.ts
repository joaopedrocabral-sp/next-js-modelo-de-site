import Prismic from "@prismicio/client";

export function getPrismicClient(req?: unknown){
    const prismic = Prismic.client(process.env.NEXT_PUBLIC_PRIVATE_API_URL, {
        req,
    })
    return prismic;
}