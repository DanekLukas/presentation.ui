import { LanguageContext } from '../contexts/LanguageContext'
import { Link } from 'react-router-dom'
import { Typography } from 'antd'
import { gql, useQuery } from '@apollo/client'
import { useLocation, useNavigate } from 'react-router-dom'
import Article from './Article'
import Education from './Education'
import Job from './Job'
import Patent from './Patent'
import React, { useContext, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import Residency from './Residency'

const query = {
  getLogins: gql`
    query getUsersLogins {
      getUsersLogins {
        login
        name
      }
    }
  `,
  getData: gql`
    query getData($login: String, $language: String, $orderBy: String) {
      getUserByLogin(login: $login) {
        error
        data {
          name
        }
        message
      }
      allArticlesByLogin(login: $login, language: $language, orderBy: $orderBy) {
        error
        data {
          id
          title
          content
          links
        }
        message
      }
      allEducationRangesByLogin(login: $login, language: $language, orderBy: $orderBy) {
        error
        data {
          title
          description
          degree
          started
          finished
        }
        message
      }
      getIntroductionByLogin(login: $login, language: $language) {
        error
        data {
          content
        }
        message
      }
      allJobRangesByLogin(login: $login, language: $language, orderBy: $orderBy) {
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
      allPatentsByLogin(login: $login, language: $language, orderBy: $orderBy) {
        error
        data {
          number
          title
          link
        }
        message
      }
      allResidencyRangesByLogin(login: $login, language: $language, orderBy: $orderBy) {
        error
        data {
          title
          description
          started
          finished
        }
        message
      }
    }
  `,
}

export type EducationRow = {
  title: string
  description: string
  degree: string
  started: string
  finished: string
}

export type ResidencyRow = {
  title: string
  description: string
  started: string
  finished: string
}

export type PatentRow = {
  number: string
  title: string
  link: string
}

export type JobRow = {
  id: number
  title: string
  description: string
  position: string
  skills: string
  platform: string
  started: string
  finished: string
}

export type menuItem = { name: string; link: string }

export type ArticleRow = { id: number; title: string; content: string; links: string }

type NameLogin = {
  name: string
  login: string
}

type TCV = {
  user: string | null
  introduction: string | null
  menu: menuItem[] | null
  education: EducationRow[] | null
  residency: ResidencyRow[] | null
  patent: PatentRow[] | null
  job: JobRow[] | null
  article: ArticleRow[] | null
}

const Homepage = () => {
  const navigate = useNavigate()
  const { Title, Link: Lnk } = Typography
  const { getExpression, getLanguage } = useContext(LanguageContext)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const name = useLocation().pathname.substring(1)
  const initCV: TCV = {
    user: null,
    introduction: null,
    menu: null,
    article: null,
    education: null,
    residency: null,
    patent: null,
    job: null,
  }

  const menuItems = [
    { link: 'article', name: 'header.projects' },
    { link: 'education', name: 'header.education' },
    { link: 'residency', name: 'header.residency' },
    { link: 'patent', name: 'header.patents' },
    { link: 'job', name: 'header.professional.experience' },
  ]

  const [cv, setCv] = useState<TCV>(initCV)

  const [logins, setLogins] = useState<Array<NameLogin>>()

  const { refetch } = useQuery(query.getLogins, {
    skip: true,
    onCompleted: data => {
      setLogins(data.getUsersLogins)
    },
  })

  const { refetch: refetchUserData } = useQuery(query.getData, {
    variables: { login: name, language: getLanguage(), orderBy: 'id' },
    onCompleted: data => {
      const tmp: TCV = initCV
      if (data.getUserByLogin.message === 'login not found') {
        navigate('/')
      } else tmp.user = data.getUserByLogin.data.name
      if (!data.getIntroductionByLogin.error)
        tmp.introduction = data.getIntroductionByLogin.data.content
      if (!data.allArticlesByLogin.error) tmp.article = data.allArticlesByLogin.data
      if (!data.allEducationRangesByLogin.error) tmp.education = data.allEducationRangesByLogin.data
      if (!data.allResidencyRangesByLogin.error) tmp.residency = data.allResidencyRangesByLogin.data
      if (!data.allPatentsByLogin.error) tmp.patent = data.allPatentsByLogin.data
      if (!data.allJobRangesByLogin.error) tmp.job = data.allJobRangesByLogin.data
      tmp.menu = []
      menuItems.forEach(item => {
        if ((tmp[item.link as keyof typeof tmp]?.length || 0) > 0) tmp.menu.push(item)
      })
      if (tmp.menu.length < 2) tmp.menu = null
      setCv(tmp)
    },
  })

  useEffect(() => {
    // setLogin(name)
    if (!name) refetch()
    else refetchUserData()
  }, [name, refetch, refetchUserData])

  return (
    <>
      {!name && (
        <>
          <ReactMarkdown>{getExpression('Invitation')}</ReactMarkdown>
          {logins?.map((user, index) => (
            <Link to={user.login} key={index}>
              {user.name}
            </Link>
          ))}
        </>
      )}
      {name && (
        <>
          {cv.user && <Title level={2}>{cv.user}</Title>}
          {cv.introduction && <ReactMarkdown>{cv.introduction}</ReactMarkdown>}
          {cv && (
            <div className='menu'>
              {cv.menu?.map((elm, index) => (
                <Lnk href={'#' + elm.link} key={index}>
                  {getExpression(elm.name)}
                </Lnk>
              ))}
            </div>
          )}
          {cv.article && <Article data={cv.article} />}
          {cv.education && <Education data={cv.education} />}
          {cv.residency && <Residency data={cv.residency} />}
          {cv.patent && <Patent data={cv.patent} />}
          {cv.job && <Job data={cv.job} />}
        </>
      )}
    </>
  )
}

export default Homepage
