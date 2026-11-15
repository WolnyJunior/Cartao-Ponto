import { describe, it, expect } from 'vitest'
import { converterHoraParaMinuto, formatarMinutoParaHora } from '../src/shared/tempo.shared'

describe('tempo', () => {
    it('converte hora para minutos', () => {
        expect(converterHoraParaMinuto('08:30')).toBe(510)
    })

    it('formata minutos para hora', () => {
        expect(formatarMinutoParaHora(510)).toBe('08:30')
    })
})