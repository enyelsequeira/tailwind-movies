import { DefaultSeo } from "next-seo"


type Props = {
  title: string,
  description: string
}

// Could be typed
const SEOComponent = ({ title, description }: Props) => {

  const SEO = {
    title: title,
    description: description
  }
  return (
    <DefaultSeo {...SEO} />
  )

}

export default SEOComponent