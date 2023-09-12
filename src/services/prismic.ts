import Prismic from '@prismicio/client'

export function getPrismicClient(req: unknown) {
  const prismic = Prismic.client(
    process.env.PRISMIC_ENDPOINT,
    {
      req,
      acessToken: process.env.PRISMIC_ACESS_TOKEN
    }
  )
  return prismic;
}