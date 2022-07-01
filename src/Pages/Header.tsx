import { LanguageContext } from '../contexts/LanguageContext'
import { Typography } from 'antd'
import Language from './Language'
import Message from '../components/Message'
import React, { useContext } from 'react'
import styled from '@emotion/styled'

const { Title } = Typography

const Header = () => {
  const { getExpression } = useContext(LanguageContext)

  return (
    <>
      <Title>{getExpression('danekFamily')}</Title>
      <Message />
      <LanguageWrapper>
        <Language />
      </LanguageWrapper>
    </>
  )
}

const LanguageWrapper = styled.div`
  transform: translate(20rem, -4rem);
  display: inline-block;
`

export default Header
