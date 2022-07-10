import { LanguageContext } from '../contexts/LanguageContext'
import { PatentRow } from './Homepage'
import { Typography } from 'antd'
import React, { useContext } from 'react'

type Props = {
  data?: PatentRow[]
}

const Patent = ({ data }: Props) => {
  const { getExpression } = useContext(LanguageContext)
  const { Title, Link } = Typography

  return (
    <>
      {data.length > 0 && (
        <Title level={4} className='section' id='patent'>
          {getExpression('header.patents')}
        </Title>
      )}
      {data.map((item, index) => (
        <Title level={5} className='cv-property' key={index}>
          {item.link ? (
            <Link href={item.link} target='_blank' rel='noreferrer'>
              {item.number}
            </Link>
          ) : (
            <div>{item.number}</div>
          )}
          <span>{item.title}</span>
        </Title>
      ))}
    </>
  )
}

export default Patent
