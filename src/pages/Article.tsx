import { ArticleRow } from './Homepage'
import { LanguageContext } from '../contexts/LanguageContext'
import { Typography } from 'antd'
import React, { useContext } from 'react'
import ReactMarkdown from 'react-markdown'

type Props = {
  data: ArticleRow[]
}

const Article = ({ data }: Props) => {
  const { getExpression } = useContext(LanguageContext)
  const { Link, Paragraph, Title } = Typography

  return (
    <>
      {data.length > 0 && (
        <Title level={4} className='section' id='article'>
          {getExpression('header.projects')}
        </Title>
      )}
      {data.map((item, index) => (
        <Paragraph key={index}>
          <Title level={4}>{item.title}</Title>
          <ReactMarkdown>{item.content}</ReactMarkdown>
          <Link>{item.links}</Link>
        </Paragraph>
      ))}
    </>
  )
}

export default Article
