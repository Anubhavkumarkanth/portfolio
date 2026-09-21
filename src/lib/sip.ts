// A TypeScript port of the SIP Friction Analyzer's engine (engine/simulation.py
// and engine/friction.py), used for the illustrative charts on this site.
// Same compounding loop and the same metric formulas; only pause and
// reduce-by-factor events are supported here.

export interface SipScenario {
  monthlyAmount: number
  /** Expected annual return as a fraction, e.g. 0.12 */
  annualReturn: number
  years: number
  pause?: { startMonth: number; months: number }
  reduce?: { startMonth: number; months: number; factor: number }
}

export interface SipPoint {
  year: number
  ideal: number
  actual: number
}

export interface SipResult {
  points: SipPoint[]
  ideal: number
  actual: number
  expectedContribution: number
  actualContribution: number
  /** Contribution Compliance Rate, 0–1 */
  ccr: number
  /** Compounding loss due to friction */
  cld: number
  disciplineScore: number
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

const inWindow = (month: number, w?: { startMonth: number; months: number }) =>
  !!w && w.months > 0 && month >= w.startMonth && month < w.startMonth + w.months

export function simulateSip({ monthlyAmount, annualReturn, years, pause, reduce }: SipScenario): SipResult {
  const monthlyReturn = annualReturn / 12
  const totalMonths = years * 12

  let ideal = 0
  let actual = 0
  let expectedContribution = 0
  let actualContribution = 0
  const points: SipPoint[] = [{ year: 0, ideal: 0, actual: 0 }]

  for (let month = 1; month <= totalMonths; month++) {
    let contribution = monthlyAmount
    if (inWindow(month, pause)) contribution = 0
    // Discrete events override a pause in the Python engine, so reduce wins here too.
    if (reduce && inWindow(month, reduce)) contribution = monthlyAmount * reduce.factor

    ideal = (ideal + monthlyAmount) * (1 + monthlyReturn)
    actual = (actual + contribution) * (1 + monthlyReturn)
    expectedContribution += monthlyAmount
    actualContribution += contribution

    if (month % 12 === 0) points.push({ year: month / 12, ideal, actual })
  }

  // friction.py: calculate_ccr, calculate_cld, calculate_discipline_score
  const ccr = expectedContribution <= 0 ? 1 : clamp(actualContribution / expectedContribution, 0, 1)
  const cld = Math.max(0, ideal - actual)
  const cldRatio = ideal > 0 ? clamp(cld / ideal, 0, 1) : 0
  const disciplineScore = clamp(100 - (40 * (1 - ccr) + 60 * cldRatio), 0, 100)

  return { points, ideal, actual, expectedContribution, actualContribution, ccr, cld, disciplineScore }
}

/** The scenario used for the card preview: ₹10,000/month, 12% p.a., 20 years. */
export const previewScenario: SipScenario = {
  monthlyAmount: 10_000,
  annualReturn: 0.12,
  years: 20,
  pause: { startMonth: 25, months: 12 },
  reduce: { startMonth: 85, months: 12, factor: 0.5 },
}
