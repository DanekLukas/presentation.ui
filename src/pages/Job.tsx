import { JobRow } from './Homepage'
import { LanguageContext } from '../contexts/LanguageContext'
import { Typography } from 'antd'
import React, { useContext } from 'react'
import ReactMarkdown from 'react-markdown'

type Props = {
  data: JobRow[]
}

const Job = ({ data }: Props) => {
  const { getExpression } = useContext(LanguageContext)
  const { Paragraph, Title } = Typography

  return (
    <>
      {data.length > 0 && (
        <Title level={4} className='section' id='job'>
          {getExpression('header.professional.experience')}
        </Title>
      )}
      {data.map((item, index) => (
        <Paragraph key={index} className='job'>
          <Title level={5} className='cv-property'>
            <span>
              {item.started} {item.started !== item.finished && `- ${item.finished}`}
            </span>
            <span>{item.title}</span>
          </Title>
          <ReactMarkdown>
            {`>${item['description' as keyof typeof item]}  
            
            \n${['position', 'skills', 'platform']
              .map(key => `${getExpression(key)}: **${item[key as keyof typeof item]}**`)
              .join('  \n ')}`}
          </ReactMarkdown>
        </Paragraph>
      ))}
    </>
  )
}

export default Job
