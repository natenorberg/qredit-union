import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import LoanForm from "../components/LoanForm"

const IndexPage = () => (
  <Layout>
    <SEO title="Loan Application" />
    <LoanForm />
  </Layout>
)

export default IndexPage
