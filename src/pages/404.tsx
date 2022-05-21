import Link from "next/link";
import styles from "../styles/fourOhFour.module.scss";

export default function Custom404(){
    return(
        <>
        <div className={styles.container}>
        <h1 className={styles.title}>404 - Página Não Encontrada</h1>
            <Link href="/">
                <button>Voltar para Home</button>
            </Link>
        </div>
            
        </>
    )
}