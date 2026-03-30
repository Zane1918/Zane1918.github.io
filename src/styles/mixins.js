import { css } from 'styled-components'

const mixins = {
  flexCenter: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  flexBetween: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  sectionHeading: css`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: clamp(24px, 5vw, 32px);
    font-weight: 800;
    color: ${({ theme }) => theme.colors.navy};
    margin-bottom: 40px;
    &::after {
      content: '';
      display: block;
      width: 60px;
      height: 4px;
      background: ${({ theme }) => theme.colors.accent};
      border-radius: 2px;
      margin-top: 12px;
    }
  `,
  link: css`
    color: ${({ theme }) => theme.colors.accent};
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 13px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: ${({ theme }) => theme.transition};
    &:hover { opacity: 0.8; }
  `,
}

export default mixins
