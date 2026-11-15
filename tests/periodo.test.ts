import { describe, it, expect } from 'vitest';
import { obterPeriodo } from '../src/domain/rules/periodo.rules';

describe('obterPeriodo', () => {
  it('data antes do dia 25: período começou no mês anterior', () => {
    expect(obterPeriodo('2026-11-15')).toEqual({ inicio: '2026-10-25', fim: '2026-11-24' });
  })

  it('dia 24: ainda é o período anterior', () => {
    expect(obterPeriodo('2026-11-24')).toEqual({ inicio: '2026-10-25', fim: '2026-11-24' });
  })

  it('dia 25: começa um novo período', () => {
    expect(obterPeriodo('2026-11-25')).toEqual({ inicio: '2026-11-25', fim: '2026-12-24' });
  })

  it('fim do ano: período vira para janeiro', () => {
    expect(obterPeriodo('2026-12-30')).toEqual({ inicio: '2026-12-25', fim: '2027-01-24' });
  })

  it('início do ano: período começou em dezembro', () => {
    expect(obterPeriodo('2027-01-10')).toEqual({ inicio: '2026-12-25', fim: '2027-01-24' });
  })
})