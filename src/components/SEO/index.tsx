import { DefaultSeo } from "next-seo"


// Could be typed
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