import type { OmikujiRepository } from '@/application/omikujiService'
import type { FortuneResult } from '@/domain/omikuji'
import { Omikuji } from '@/domain/omikuji'

export class InMemoryOmikujiRepository implements OmikujiRepository {
  private omikuji = new Omikuji()

  draw(): FortuneResult {
    return this.omikuji.draw()
  }
}
