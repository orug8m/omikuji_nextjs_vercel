export type FortuneResult = '大吉' | '中吉' | '小吉' | '吉' | '凶' | '大凶'

export class Omikuji {
  private readonly results: FortuneResult[] = [
    '大吉',
    '中吉',
    '小吉',
    '吉',
    '凶',
    '大凶',
  ]

  draw(): FortuneResult {
    const randomIndex = Math.floor(Math.random() * this.results.length)
    return this.results[randomIndex]
  }
}
