import styled, { css } from 'styled-components'

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  text-decoration: none;

  ${({ variant }) =>
    variant === 'outline'
      ? css`
          border: 2px solid ${({ theme }) => theme.colors.accent};
          color: ${({ theme }) => theme.colors.accent};
          background: transparent;
          &:hover { background: ${({ theme }) => theme.colors.accentLight}; opacity: 1; }
        `
      : css`
          background: ${({ theme }) => theme.colors.accent};
          color: #fff;
          border: 2px solid transparent;
          &:hover { opacity: 0.85; }
        `}
`

export default Button
