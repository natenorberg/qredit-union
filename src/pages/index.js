import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import LoanForm from "../components/LoanForm"

const IndexPage = () => (
  <Layout>
    <SEO title="Loan Application" />
    <LoanForm />
  </Layout>
)

export default IndexPage
