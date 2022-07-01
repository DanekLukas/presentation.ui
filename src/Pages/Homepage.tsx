import { LanguageContext } from '../contexts/LanguageContext'
import { Typography } from 'antd'
import Article from './Article'
import Job from './Job'
import React, { useContext } from 'react'
import ReactMarkdown from 'react-markdown'

const Homepage = () => {
  const { getExpression } = useContext(LanguageContext)
  const { Title } = Typography

  return (
    <>
      <Title level={2}>{getExpression('lukas.intro')}</Title>
      <ReactMarkdown>{getExpression('lukas.introduces')}</ReactMarkdown>
      <ReactMarkdown>{getExpression('professional.experience')}</ReactMarkdown>
      <Job />
      <Article />
    </>
  )
}

export default Homepage
