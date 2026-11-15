import { describe, it, expect } from 'vitest';
import { adicionarDias, listarDatas, obterSegundaDaSemana } from '../src/shared/datas.shared';

describe('datas', () => {
  it('adiciona dias virando o mês', () => {
    expect(adicionarDias('2026-11-30', 1)).toBe('2026-12-01');
  })

  it('adiciona dias virando o ano', () => {
    expect(adicionarDias('2026-12-31', 1)).toBe('2027-01-01');
  })

  it('lista datas de um intervalo, inclusive as pontas', () => {
    expect(listarDatas('2026-11-28', '2026-12-02')).toEqual([
      '2026-11-28',
      '2026-11-29',
      '2026-11-30',
      '2026-12-01',
      '2026-12-02',
    ])
  })

  it('segunda-feira da semana de um domingo', () => {
    expect(obterSegundaDaSemana('2026-11-15')).toBe('2026-11-09');
  })

  it('segunda-feira da semana de uma segunda', () => {
    expect(obterSegundaDaSemana('2026-11-09')).toBe('2026-11-09');
  })
})