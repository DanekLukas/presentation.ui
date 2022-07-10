import { LanguageContext } from '../contexts/LanguageContext'
import { Link } from 'react-router-dom'
import { Typography } from 'antd'
import { useLocation } from 'react-router-dom'
import Language from './Language'
import Message from '../components/Message'
import React, { useContext } from 'react'

const { Title } = Typography

const Header = () => {
  const { getExpression } = useContext(LanguageContext)
  return (
    <>
      <Title>
        {useLocation().pathname.length > 1 ? (
          <Link to={''}>{getExpression('pageTitle')}</Link>
        ) : (
          getExpression('pageTitle')
        )}
      </Title>
      <Message />
      <div className='language-menu'>
        <Language />
      </div>
    </>
  )
}

export default Header
