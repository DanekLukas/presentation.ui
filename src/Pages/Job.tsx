import { LanguageContext } from '../contexts/LanguageContext'
import { Typography } from 'antd'
import { gql, useQuery } from '@apollo/client'
import { setMessage } from '../components/Message/messageActionCreators'
import { useDispatch } from 'react-redux'
import React, { useContext, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

type JobRow = {
  id: number
  title: string
  description: string
  position: string
  skills: string
  platform: string
  started: string
  finished: string
}

const query = {
  getJobs: gql`
    query Jobs($language: String, $orderBy: String) {
      allJobsRanges(language: $language, orderBy: $orderBy) {
        error
        data {
          id
          title
          description
          position
          skills
          platform
          started
          finished
        }
        message
      }
    }
  `,
}

const Job = () => {
  const dispatch = useDispatch()
  const { getExpression, getLanguage } = useContext(LanguageContext)
  const [keptData, setKeptData] = useState<Array<JobRow>>([])
  const { Paragraph, Title } = Typography

  const { refetch: refetchJobsData } = useQuery(query.getJobs, {
    skip: true,
    onCompleted: allJobsData => {
      if (allJobsData.allJobsRanges.error) {
        dispatch(setMessage(allJobsData.allJobsRanges.message))
        return
      }
      const datas: Array<JobRow> = []
      Object.keys(allJobsData.allJobsRanges.data).forEach(key =>
        datas.push({
          ...allJobsData.allJobsRanges.data[key],
          ...{ action: '', key: `jobs_${allJobsData.allJobsRanges.data[key].id}` },
        })
      )
      setKeptData(datas)
    },
  })

  useEffect(() => {
    refetchJobsData({ language: getLanguage(), orderBy: 'started' })
  }, [refetchJobsData, getLanguage])

  return (
    <>
      {keptData.map((item, index) => (
        <Paragraph key={index}>
          <Title level={5}>
            <span style={{ display: 'block', float: 'left' }}>
              {item.started} - {item.finished}
            </span>{' '}
            <span style={{ paddingLeft: '8rem' }}>{item.title}</span>
          </Title>
          <ReactMarkdown>
            {`>${item['description' as keyof typeof item]}  
            
            \n${['position', 'skills', 'platform']
              .map(key => `${getExpression(key)}: **${item[key as keyof typeof item]}**`)
              .join('  \n ')}`}
          </ReactMarkdown>
        </Paragraph>
      ))}
      {!keptData.length && <Title>{getExpression('noJob')}</Title>}
    </>
  )
}

export default Job
