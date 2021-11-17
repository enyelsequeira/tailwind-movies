import { DefaultSeo } from "next-seo"


const SEOComponent = ({ title, description }) => {

  const SEO = {
    title: title,
    description: description
  }
  return (
    <DefaultSeo {...SEO} />
  )

}

export default SEOComponent