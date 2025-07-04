/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import type { FortuneResult } from '@/domain/omikuji'

interface OmikujiBoxProps {
  isShaking: boolean
  result: FortuneResult | null
}

const shake = keyframes`
  0%, 100% {
    transform: translateX(0) translateY(0) rotate(0deg);
  }
  10% {
    transform: translateX(-5px) translateY(-5px) rotate(-1deg);
  }
  20% {
    transform: translateX(5px) translateY(5px) rotate(1deg);
  }
  30% {
    transform: translateX(-5px) translateY(5px) rotate(-1deg);
  }
  40% {
    transform: translateX(5px) translateY(-5px) rotate(1deg);
  }
  50% {
    transform: translateX(-3px) translateY(-3px) rotate(-0.5deg);
  }
  60% {
    transform: translateX(3px) translateY(3px) rotate(0.5deg);
  }
  70% {
    transform: translateX(-3px) translateY(3px) rotate(-0.5deg);
  }
  80% {
    transform: translateX(3px) translateY(-3px) rotate(0.5deg);
  }
  90% {
    transform: translateX(-1px) translateY(-1px) rotate(-0.25deg);
  }
`

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const omikujiBoxStyle = (isShaking: boolean) => css`
  width: 192px;
  height: 192px;
  background: linear-gradient(to bottom, #92400e, #78350f);
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid #a16207;
  ${
    isShaking &&
    css`
    animation: ${shake} 0.5s ease-in-out infinite;
  `
  }
`

const innerBoxStyle = css`
  width: 128px;
  height: 128px;
  background-color: #fef3c7;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const getResultStyle = (result: FortuneResult | null) => {
  let color = '#000'

  if (result) {
    switch (result) {
      case '大吉':
        color = '#dc2626'
        break
      case '中吉':
      case '小吉':
      case '吉':
        color = '#ea580c'
        break
      case '凶':
      case '大凶':
        color = '#4b5563'
        break
    }
  }

  return css`
    font-size: 2.25rem;
    font-weight: bold;
    color: ${color};
  `
}

const defaultTextStyle = css`
  font-size: 1.5rem;
  color: #92400e;
`

const resultContainerStyle = css`
  margin-top: 1rem;
  padding: 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`

const resultTextStyle = css`
  font-size: 1.125rem;
  color: #374151;
  text-align: center;
`

export default function OmikujiBox({ isShaking, result }: OmikujiBoxProps) {
  return (
    <div css={containerStyle}>
      <div css={omikujiBoxStyle(isShaking)}>
        <div css={innerBoxStyle}>
          {result ? (
            <span css={getResultStyle(result)}>{result}</span>
          ) : (
            <span css={defaultTextStyle}>おみくじ</span>
          )}
        </div>
      </div>

      {result && (
        <div css={resultContainerStyle}>
          <p css={resultTextStyle}>あなたの運勢は「{result}」です！</p>
        </div>
      )}
    </div>
  )
}
