import styled from 'styled-components'

const Tag = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.accentLight};
  color: ${({ theme }) => theme.colors.navy};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  font-weight: 500;
`

export default Tag
