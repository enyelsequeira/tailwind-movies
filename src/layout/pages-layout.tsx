import { Main, SEOComponent } from "@/components"
import { ReactNode } from "react"
import Layout from "."


type Props = {
  seoProps?: {
    title: string,
    description: string
  }
  children: ReactNode
}

const PageLayout = ({ seoProps, children }: Props) => {
  return (
    <Layout>
      <SEOComponent {...seoProps} />
      <Main movie>
        {children}
      </Main>
    </Layout>
  )
}

export default PageLayout