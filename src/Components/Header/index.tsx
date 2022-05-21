import styles from "./styles.module.scss";
import Image from "next/image";
import logo from "../../../public/images/logo-exemplo.png";
import { ActiveLink } from "../ActiveLink";

export function Header(){
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <ActiveLink href="/" activeClassName={styles.active}>
                    <a>
                        <Image 
                            src={logo} 
                            alt="Logotipo do Site"
                            width={180}   
                            height={70} 
                        />
                    </a>
                </ActiveLink>
               
                <nav>
                    <ActiveLink href="/" activeClassName={styles.active}>
                        <a>Home</a>
                    </ActiveLink>
                    <ActiveLink href="/posts" activeClassName={styles.active}>
                        <a>Posts</a>
                    </ActiveLink>
                    <ActiveLink href="/produtos" activeClassName={styles.active}>
                        <a>Produtos</a>
                    </ActiveLink>
                    <ActiveLink href="/sobre" activeClassName={styles.active}>
                        <a>Sobre</a>
                    </ActiveLink>
                </nav>
                <a className={styles.readyButton} type="button" href="https://www.linkedin.com/in/joao-pedro-cabral-sp/">COMEÇAR</a>
            </div>
        </header>
    )
}

