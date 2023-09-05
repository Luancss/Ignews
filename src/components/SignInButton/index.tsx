import { FaGithub } from "react-icons/fa";
import styles from "./styles.module.scss";
import { FiX } from "react-icons/fi";
import { useSession, signIn, signOut } from "next-auth/react"
// import { SessionProvider } from "next-auth/react"



export function SignInButton() {
  const { data: session } = useSession()
  console.log(session);
  

  return session ? (
    <button type="button" className={styles.signInButton} onClick={() => {signOut()}}>
      <FaGithub color="#04d361" />
      {session.user.name}
      <FiX color="#737388" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      onClick={() => signIn("github")}
      className={styles.signInButton}
    >
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
}
