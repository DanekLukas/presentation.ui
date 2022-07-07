import { EducationRow } from './Homepage'
import { LanguageContext } from '../contexts/LanguageContext'
import { Typography } from 'antd'
import React, { useContext } from 'react'
import ReactMarkdown from 'react-markdown'

type Props = {
  data: EducationRow[]
}

const Education = ({ data }: Props) => {
  const { getExpression } = useContext(LanguageContext)
  const { Paragraph, Title } = Typography

  return (
    <>
      {data.length > 0 && (
        <Title level={4} className='section' id='education'>
          {getExpression('header.education')}
        </Title>
      )}
      {data.map((item, index) => (
        <Paragraph key={index}>
          <Title level={5}>
            <span style={{ display: 'block', float: 'left' }}>
              {item.started} - {item.finished}
            </span>
            <span style={{ paddingLeft: '8rem' }}>{item.title}</span>
            <span style={{ display: 'block', float: 'right' }}>{item.degree}</span>
          </Title>
          <ReactMarkdown>{item.description}</ReactMarkdown>
        </Paragraph>
      ))}
    </>
  )
}

export default Education
