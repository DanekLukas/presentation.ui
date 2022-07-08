import { LanguageContext } from '../contexts/LanguageContext'
import { PatentRow } from './Homepage'
import { Typography } from 'antd'
import React, { useContext } from 'react'

type Props = {
  data?: PatentRow[]
}

const Patent = ({ data }: Props) => {
  const { getExpression } = useContext(LanguageContext)
  const { Paragraph, Title, Link } = Typography

  return (
    <>
      {data.length > 0 && (
        <Title level={4} className='section' id='patent'>
          {getExpression('header.patents')}
        </Title>
      )}
      {data.map((item, index) => (
        <Paragraph key={index}>
          {((elm, link) =>
            link ? (
              <Link href={link} target='_blank' rel='noreferrer'>
                {elm}
              </Link>
            ) : (
              { elm }
            ))(
            <span style={{ display: 'block', float: 'left', fontWeight: 'bold' }}>
              {item.number}
            </span>,
            item.link
          )}
          <span style={{ paddingLeft: '8rem', fontWeight: 'bold' }}>{item.title}</span>
        </Paragraph>
      ))}
    </>
  )
}

export default Patent
