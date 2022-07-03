import { LanguageContext } from '../contexts/LanguageContext'
import { MenuContext } from '../contexts/MenuContext'
import { menuItem } from '../contexts/MenuProvider'
import Article from './Article'
import Education from './Education'
import Homepage from './Homepage'
import Introduction from './Introduction'
import Job from './Job'
import Patent from './Patent'
import React, { useContext } from 'react'
import User from './User'

type Props = {
  name?: string
}

const Main = ({ name }: Props) => {
  const Menu = ({ name }: Props) => {
    return (
      <>
        {menu?.sort(srt).map((elm, index) => (
          <a href={'#' + elm.link} key={index} className='menu'>
            {getExpression(elm.name)}
          </a>
        ))}
      </>
    )
  }

  const containers = [User, Introduction, Menu, Education, Patent, Job, Article]
  const names = containers.map(elm => elm.name.toLowerCase())
  const { getExpression } = useContext(LanguageContext)
  const { menu } = useContext(MenuContext)

  const srt = (a: menuItem, b: menuItem): number => names.indexOf(a.link) - names.indexOf(b.link)

  return (
    <>
      <Homepage name={name} /*containers={containers}*/ />
    </>
  )
}

export default Main
