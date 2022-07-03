import { LanguageContext } from '../contexts/LanguageContext'
import { MenuContext } from '../contexts/MenuContext'
import { menuItem } from '../contexts/MenuProvider'
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
import User from './User'

type Props = {
  name?: string
}

const Homepage = ({ name }: Props) => {
  const { getExpression } = useContext(LanguageContext)
  const srt = useCallback(
    (a: menuItem, b: menuItem): number => names.indexOf(a.link) - names.indexOf(b.link),
    // eslint-disable-next-line
    []
  )

  const Menu = useCallback(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { menu } = useContext(MenuContext)
    return (
      <div className='menu'>
        {menu?.sort(srt).map((elm, index) => (
          <a href={'#' + elm.link} key={index} className='menu'>
            {getExpression(elm.name)}
          </a>
        ))}
      </div>
    )
  }, [getExpression, srt])

  const containers = useMemo(
    () => [User, Introduction, Menu, Education, Patent, Job, Article],
    [Menu]
  )
  const names = containers.map(elm => elm.name.toLowerCase())

  const [login, setLogin] = useState(name)
  const [elms, setElms] =
    useState<
      Array<
        | FunctionComponentElement<Props>[]
        | ReactElement<{ name: string }, string | JSXElementConstructor<any>>
      >
    >()

  useEffect(() => {
    if (!login) {
      setLogin(name)
    }
  }, [login, name])

  useEffect(() => {
    const prepareElms = () => {
      const elems = containers.map((elm, index) => createElement(elm, { name: login, key: index }))
      setElms(elems)
    }
    if (!elms) {
      prepareElms()
    }
  }, [login, elms, containers])

  return <>{elms?.map(elm => elm)}</>
}

export default Homepage
