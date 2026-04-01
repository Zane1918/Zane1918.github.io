import React from 'react'
import styled from 'styled-components'
const config = require('../../config')

const StyledFooter = styled.footer`
  padding: 20px;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.lightSlate};
`

const Footer = ({ t }) => (
  <StyledFooter>
    <p>{t ? t.credit : 'Designed & Built by'} {config.name}</p>
  </StyledFooter>
)

export default Footer
