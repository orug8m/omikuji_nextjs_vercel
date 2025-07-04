import type { FortuneResult } from '@/domain/omikuji'

export interface OmikujiRepository {
  draw(): FortuneResult
}

export class OmikujiService {
  constructor(private omikujiRepository: OmikujiRepository) {}

  drawFortune(): FortuneResult {
    return this.omikujiRepository.draw()
  }
}
