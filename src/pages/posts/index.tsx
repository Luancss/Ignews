import Head from 'next/head'
import styles from './styles.module.scss'
import { GetStaticProps } from 'next'
import Prismic from '@prismicio/client'

export default function Posts()  {
  return (
    <>
    <Head>
      <title>Posts | Ignews</title>
    </Head>
    <main className={styles.container}>
      <div className={styles.posts}>
        <a href=''>
          <time>12 de abril de 2022</time>
          <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
          <p>In this guide, you will learn how to create a Monorepo to manage multiple packages with a shared build, test, and release process.</p>
        </a>
        <a href=''>
          <time>12 de abril de 2022</time>
          <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
          <p>In this guide, you will learn how to create a Monorepo to manage multiple packages with a shared build, test, and release process.</p>
        </a>
        <a href=''>
          <time>12 de abril de 2022</time>
          <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
          <p>In this guide, you will learn how to create a Monorepo to manage multiple packages with a shared build, test, and release process.</p>
        </a>
      </div>
    </main>
    </>
  )
}

 export const getStatisProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    const response = await prismic.query([
      Prismic.predicates.at('document.type', 'publication')
    ], {
      fetch: ['publication.title', 'publication.content'],
      pageSize: 100,
    })

    console.log(JSON.stringify(response, null, 2));
  
    return {
      props: {}
    }
 }
