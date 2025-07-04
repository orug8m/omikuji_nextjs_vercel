/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import { css, keyframes } from '@emotion/react'
import OmikujiBox from '@/components/OmikujiBox'
import type { FortuneResult } from '@/domain/omikuji'
import { OmikujiService } from '@/application/omikujiService'
import { InMemoryOmikujiRepository } from '@/infrastructure/omikujiRepository'

const mainContainerStyle = css`
  min-height: 100vh;
  background: linear-gradient(to bottom, #e0f2fe, #b3e5fc);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`

const headerStyle = css`
  text-align: center;
  margin-bottom: 2rem;
`

const titleStyle = css`
  font-size: 2.25rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1rem;
`

const subtitleStyle = css`
  font-size: 1.125rem;
  color: #4b5563;
`

const omikujiContainerStyle = css`
  margin-bottom: 2rem;
`

const buttonStyle = css`
  padding: 1rem 2rem;
  background-color: #dc2626;
  color: white;
  font-weight: bold;
  font-size: 1.125rem;
  border-radius: 8px;
  border: none;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transform: scale(1);
  transition: all 200ms ease;
  cursor: pointer;

  &:hover {
    background-color: #b91c1c;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`

const waitingTextStyle = css`
  text-align: center;
  color: #4b5563;
  animation: ${pulse} 2s ease-in-out infinite;
`

export default function Home() {
  const [result, setResult] = useState<FortuneResult | null>(null)
  const [isShaking, setIsShaking] = useState(false)
  const [showButton, setShowButton] = useState(true)
  const [isFirstDraw, setIsFirstDraw] = useState(true)

  const omikujiService = new OmikujiService(new InMemoryOmikujiRepository())

  const handleDrawOmikuji = async () => {
    setShowButton(false)
    setIsShaking(true)
    setResult(null)

    // シャカシャカアニメーション (2秒)
    setTimeout(() => {
      setIsShaking(false)
      const newResult = omikujiService.drawFortune()
      setResult(newResult)
      setIsFirstDraw(false)

      // 3秒後にボタンを再表示
      setTimeout(() => {
        setShowButton(true)
      }, 3000)
    }, 2000)
  }

  return (
    <div css={mainContainerStyle}>
      <div css={headerStyle}>
        <h1 css={titleStyle}>🎋 おみくじアプリ</h1>
        <p css={subtitleStyle}>今日の運勢を占ってみましょう！</p>
      </div>

      <div css={omikujiContainerStyle}>
        <OmikujiBox isShaking={isShaking} result={result} />
      </div>

      {showButton && (
        <button type="button" onClick={handleDrawOmikuji} css={buttonStyle}>
          {isFirstDraw ? 'おみくじを引く' : '再度おみくじを引く'}
        </button>
      )}

      {!showButton && !isShaking && result && (
        <div css={waitingTextStyle}>次のおみくじまで少々お待ちください...</div>
      )}
    </div>
  )
}
