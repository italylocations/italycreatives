export interface ApplicationData {
  basedInRome: string           // 'yes' | 'no' | 'available'
  editorialsLast12Months: string // '0' | '1-2' | '3-5' | '6-10' | '10+'
  hasPortfolioSite: boolean     // derived: real website vs Instagram-only
  credits: string[]             // 3 credit strings (magazine + issue + link combined)
  verifiedCredits: number       // count of credits with actual http links (0��3)
  workedInternationally: boolean
  dayRateMin: string
  availabilityPerMonth: string  // '1-5' | '6-10' | '11-15' | '15+'
  hasPartitaIva: boolean
  canProvideInsurance: boolean
  englishLevel: string          // 'basic' | 'conversational' | 'fluent' | 'native'
  englishSelfDescription: string
  challengeResponse: string
  specialization: string
}

export function calculateScore(data: ApplicationData): number {
  let score = 0

  // --- LOCATION (15 points) ---
  if (data.basedInRome === 'yes') score += 15
  else if (data.basedInRome === 'available') score += 8
  // 'no' = 0

  // --- EDITORIAL CREDITS (25 points) ---
  const editorialsMap: Record<string, number> = {
    '0': 0,
    '1-2': 8,
    '3-5': 15,
    '6-10': 22,
    '10+': 25,
  }
  score += editorialsMap[data.editorialsLast12Months] ?? 0

  // --- VERIFIED CREDITS (15 points) ---
  // Each credit with a real http link = 5 points, max 15
  score += Math.min(data.verifiedCredits * 5, 15)

  // --- INTERNATIONAL EXPERIENCE (10 points) ---
  if (data.workedInternationally) score += 10

  // --- PORTFOLIO (10 points) ---
  // Has a real website (not just Instagram) = 10
  if (data.hasPortfolioSite) score += 10

  // --- ENGLISH LEVEL (10 points) ---
  const englishMap: Record<string, number> = {
    basic: 0,
    conversational: 4,
    fluent: 8,
    native: 10,
  }
  score += englishMap[data.englishLevel] ?? 0

  // --- AVAILABILITY (5 points) ---
  const availabilityMap: Record<string, number> = {
    '1-5': 1,
    '6-10': 3,
    '11-15': 4,
    '15+': 5,
  }
  score += availabilityMap[data.availabilityPerMonth] ?? 0

  // --- PROFESSIONAL SETUP (10 points) ---
  if (data.hasPartitaIva) score += 5
  if (data.canProvideInsurance) score += 5

  return Math.min(score, 100)
}

export function classifyScore(score: number): string {
  if (score >= 80) return 'A — Priority Review'
  if (score >= 60) return 'B — Strong Candidate'
  if (score >= 40) return 'C — Consider'
  return 'D — Archive'
}

/** Extract the single letter tier from classifyScore output */
export function getTierLetter(score: number): string {
  return classifyScore(score).charAt(0)
}
