import type { NextPage } from 'next'
import Link from 'next/link'
import { client } from 'libs/cms-client'
import styles from 'styles/Home.module.scss'
import { Article } from 'types/articles'

type Props = {
  articles: Article[]
}

const Home: NextPage<Props> = ({ articles }: Props) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>
          <ul>
            {articles &&
              articles.length &&
              articles.map((articles) => (
                <li key={articles.id}>
                  <Link href={`/articles/${articles.id}`}>{articles.title}</Link>
                </li>
              ))}
          </ul>
        </div>
      </main>
    </div>
  )
}

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: 'articles' })

  return {
    props: {
      articles: data.contents,
    },
  }
}

export default Home
