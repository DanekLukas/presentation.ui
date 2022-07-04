import { LanguageContext } from '../contexts/LanguageContext'
import { Link } from 'react-router-dom'
import { MenuContext } from '../contexts/MenuContext'
import { Typography } from 'antd'
import { gql, useQuery } from '@apollo/client'
import { menuItem } from '../contexts/MenuProvider'
import { setMessage } from '../components/Message/messageActionCreators'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Article from './Article'
import Education from './Education'
import Introduction from './Introduction'
import Job from './Job'
import Patent from './Patent'
import React, {
  FunctionComponentElement,
  JSXElementConstructor,
  ReactElement,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import ReactMarkdown from 'react-markdown'

const query = {
  getUsersLogins: gql`
    query getUsersLogins {
      getUsersLogins {
        login
        name
      }
    }
  `,
  getUser: gql`
    query getUserByLogin($login: String) {
      getUserByLogin(login: $login) {
        error
        data {
          name
        }
        message
      }
    }
  `,
}

type NameLogin = {
  name: string
  login: string
}

type Props = {
  name?: string
}

const Homepage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { Title } = Typography
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const name = useLocation().pathname.substring(1)
  const [login, setLogin] = useState<string>()
  const [logins, setLogins] = useState<Array<NameLogin>>()
  const [user, setUser] = useState<string>()
  const { refetch } = useQuery(query.getUsersLogins, {
    skip: true,
    onCompleted: data => {
      setLogins(data.getUsersLogins)
    },
  })
  const { getExpression } = useContext(LanguageContext)
  const srt = useCallback(
    (a: menuItem, b: menuItem): number => {
      return names.indexOf(a.link) - names.indexOf(b.link)
    },
    // eslint-disable-next-line
    []
  )

  const { refetch: refetchUserData } = useQuery(query.getUser, {
    variables: { login: name },
    onCompleted: data => {
      console.info(data)
      if (data.getUserByLogin.error) {
        // dispatch(setMessage(data.getUserByLogin.message))
        if (data.getUserByLogin.message === 'login not found') {
          setLogin(undefined)
          navigate('/')
        }
        return
      }
      setUser(data.getUserByLogin.data.name)
      setLogin(name)
    },
  })

  const Menu = useCallback(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { menu } = useContext(MenuContext)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { getExpression } = useContext(LanguageContext)
    if (menu.length < 2) return null
    return (
      <div className='menu'>
        {menu?.sort(srt).map((elm, index) => (
          <a href={'#' + elm.link} key={index}>
            {getExpression(elm.name)}
          </a>
        ))}
      </div>
    )
  }, [srt])

  const containers = useMemo(() => [Introduction, Menu, Education, Patent, Job, Article], [Menu])
  //next line after product compilation does not work
  // const names = containers.map(elm => elm.name.toLowerCase())
  const names = useMemo(() => ['introduction', 'menu', 'education', 'patent', 'job', 'article'], [])

  const [elms, setElms] =
    useState<
      Array<
        | FunctionComponentElement<Props>[]
        | ReactElement<{ name: string }, string | JSXElementConstructor<any>>
      >
    >()

  useEffect(() => {
    // setLogin(name)
    if (!name) refetch()
    else refetchUserData()
  }, [login, name, refetch, refetchUserData])

  useEffect(() => {
    const prepareElms = () => {
      const elems = containers.map((elm, index) => createElement(elm, { name: login, key: index }))
      setElms(elems)
    }
    if (!elms && login && user) {
      prepareElms()
    }
  }, [login, elms, containers, user])

  return (
    <>
      {login && elms?.map(elm => elm)}
      {!login && (
        <>
          {(login && user && <Title level={2}>{user}</Title>) || null}
          <ReactMarkdown>{getExpression('Invitation')}</ReactMarkdown>
          {logins?.map((user, index) => (
            <Link to={user.login} key={index}>
              {user.name}
            </Link>
          ))}
        </>
      )}
    </>
  )
}

export default Homepage
