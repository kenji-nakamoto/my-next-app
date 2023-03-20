import type { NextPage, GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { client } from 'libs/cms-client'
import { Article } from 'types/articles'

type Props = {
  article: Article
}

const ArticleId: NextPage<Props> = ({ article }) => {
  return (
    <main>
      <h1>{article.title}</h1>
      <p>{article.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${article.body}`,
        }}
      />
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get({ endpoint: 'articles' }),
    paths = data.contents.map((content: Article) => `/articles/${content.id}`)

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props> = async (context: GetStaticPropsContext) => {
  const { id } = context.params || {},
    contentId = Array.isArray(id) ? id[0] : id,
    data = await client.get({ endpoint: 'articles', contentId: contentId })

  return {
    props: {
      article: data,
    },
  }
}

export default ArticleId
