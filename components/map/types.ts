export type Region = 'East Africa' | 'West Africa' | 'Central Africa' | 'Southern Africa'

export interface CountryProject {
  title: string
  location: string
  summary: string
  outcome: string
  partners: string[]
  evidence: string[]
  methods: string[]
  timeline?: string
  budget_scope?: string
  key_deliverables?: string[]
}

export interface CountryRecord {
  id?: number
  name: string
  geoName?: string
  code: string
  region: Region
  projects: number
  engagement: number
  overview: string
  focus: string[]
  impact: string[]
  locations: string[]
  stats: Array<{ label: string; value: string }>
  workDone: string[]
}

export interface DetailedCountryRecord extends CountryRecord {
  projectBlueprints?: CountryProject[]
}

export const regionFill = (region: Region) => {
  switch (region) {
    case 'West Africa':
      return 'rgba(180, 83, 9, 0.30)'
    case 'Central Africa':
      return 'rgba(22, 101, 52, 0.28)'
    case 'Southern Africa':
      return 'rgba(22, 163, 74, 0.24)'
    default:
      return 'rgba(15, 61, 49, 0.34)'
  }
}

export const formatFarmers = (engagement: number) => `${Math.round(engagement / 1000)}K+`

export const cityCoordinates: Record<string, [number, number]> = {
  'Nairobi': [36.8219, -1.2921],
  'Kisumu': [34.7617, -0.0917],
  'Nakuru': [36.0800, -0.3031],
  'Kitui': [38.0106, -1.3694],
  'Tharaka Nithi': [37.9833, -0.2500],
  'Kampala': [32.5825, 0.3476],
  'Gulu': [32.2989, 2.7667],
  'Mbarara': [30.6545, -0.6105],
  'Dar es Salaam': [39.2622, -6.7924],
  'Dodoma': [35.7516, -6.1630],
  'Morogoro': [37.6668, -8.3685],
  'Njombe': [34.7667, -9.3333],
  'Arusha': [36.6833, -3.3667],
  'Msimba Farm': [37.2833, -7.0333],
  'Kigali': [30.0619, -1.9441],
  'Musanze': [29.6349, -1.4998],
  'Huye': [29.7434, -2.5966],
  'Addis Ababa': [38.7469, 9.0227],
  'Hawassa': [38.4805, 7.0504],
  'Bahir Dar': [37.3939, 11.5936],
  'Lusaka': [28.2833, -15.4167],
  'Chipata': [32.6500, -13.6333],
  'Ndola': [28.6366, -12.9587],
  'Accra': [-0.1870, 5.6037],
  'Kumasi': [-1.6244, 6.6884],
  'Tamale': [-0.8393, 9.4008],
  'Kinshasa': [15.3150, -4.3317],
  'Goma': [29.2215, -1.6585],
  'Lubumbashi': [27.4794, -11.6609],
  'Bukavu': [28.8628, -2.5083],
  'Abuja': [7.3986, 9.0765],
  'Kano': [8.5167, 11.9964],
  'Ibadan': [3.8996, 7.3775],
  'Bujumbura': [29.3561, -3.3822],
  'Gitega': [29.9246, -3.4270],
  'Ngozi': [29.8306, -2.8797],
  'East Africa corridor': [34.0, 0.0],
  'Eastern and Southern DRC': [27.0, -6.0],
  'West Africa': [2.0, 9.0],
  'Southern Africa corridor': [29.0, -16.0],
  'Nigeria': [8.0, 10.0],
  'Ghana / regional': [-1.0, 8.0],
}

