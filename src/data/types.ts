import type { LucideIcon } from 'lucide-react'

export interface SocialLink {
  label: string
  href: string
  handle: string
}

export interface Profile {
  name: string
  initials: string
  role: string
  /** Rendered after the role in the hero: "Software Engineer — backend, full-stack & data." */
  specialties: string[]
  /** 1–2 sentence introduction shown in the hero. */
  intro: string
  /** One line used in the footer and social previews. */
  tagline: string
  location: string
  availability: string
  email: string
  /** Display form of the phone number, e.g. "+91 72238 27840". */
  phone: string
  /** Same number in tel: form, digits and a leading + only. */
  phoneHref: string
  resume: {
    /** Path inside /public, without a leading slash. */
    href: string
    fileName: string
  }
  socials: {
    github: SocialLink
    linkedin: SocialLink
  }
  /** Roles being applied for, grouped. Shown unranked. */
  targetRoles: { group: string; roles: string[] }[]
  /** Short list shown in the hero "core stack" strip. */
  coreStack: string[]
  about: {
    paragraphs: string[]
    facts: { label: string; value: string }[]
  }
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

export interface SkillItem {
  name: string
  /** True when the skill appears in the internship or project work, not only in the skills list. */
  applied?: boolean
}

export interface SkillCategory {
  id: string
  title: string
  icon: LucideIcon
  description: string
  items: SkillItem[]
  extra?: { label: string; items: string[] }
  appliedIn: string[]
  wide?: boolean
}

export interface ProjectEvaluationRow {
  model: string
  mae: number
  r2: number
  best?: boolean
}

export interface Project {
  slug: string
  name: string
  /** One-line problem statement. */
  tagline: string
  kind: string
  /** The 20-second version for recruiters. */
  summary: string
  problem: string
  howItWorks: string[]
  architecture: { title: string; detail: string }[]
  features: string[]
  engineering: { title: string; detail: string }[]
  contribution: string[]
  contributionNote?: string
  limitations: string[]
  stack: { group: string; items: string[] }[]
  /** Badges on the project card. */
  tags: string[]
  /** Three short bullets on the project card. */
  highlights: string[]
  links: {
    github?: string
    /** Leave undefined until the project is deployed. The UI shows "not deployed yet". */
    demo?: string
  }
  preview: 'sip' | 'dietbot' | 'oms'
  /** Optional featured SQL, shown on the card and in the case study. */
  sql?: { caption: string; code: string }
  /** Optional list of SQL queries shown in the case study. */
  queries?: { title: string; concepts: string }[]
  evaluation?: {
    caption: string
    rows: ProjectEvaluationRow[]
  }
}

export interface Experience {
  company: string
  role: string
  type: string
  /** YYYY-MM */
  start: string
  /** YYYY-MM, or "present" */
  end: string
  location: string
  summary: string
  highlights: string[]
  metrics: { value: string; label: string }[]
  tech: string[]
}

export interface Education {
  degree: string
  /** Major / branch. Hidden while null. */
  field: string | null
  minor?: string
  institution: string
  /** Affiliating university. Hidden while null. */
  university: string | null
  location: string
  graduation: string
  status?: string
}

export interface Certification {
  name: string
  issuer: string
  date: string
  description: string
  skills: string[]
  /** Paths inside /public (no leading slash) or full URLs. */
  links: { label: string; href: string }[]
}

export type ProofTarget =
  | { label: string; project: string }
  | { label: string; section: string }

export interface Capability {
  title: string
  description: string
  icon: LucideIcon
  proof: ProofTarget[]
}

export interface FocusArea {
  title: string
  description: string
  icon: LucideIcon
  evidence: ProofTarget[]
}
