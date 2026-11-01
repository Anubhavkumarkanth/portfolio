export interface SocialLink {
  label: string
  href: string
  handle: string
}

/** A downloadable resume. */
export interface ResumeLink {
  /** Path inside /public, without a leading slash. */
  href: string
  /** Name the browser saves the file under. */
  fileName: string
  /** Full name, used on the larger buttons ("Data Analyst resume"). */
  label: string
}

/** Hero copy, resume and SEO for the page. */
export interface Persona {
  role: string
  /** The big hero line. */
  headline: string
  /** One or two sentences under the headline. */
  intro: string
  resume: ResumeLink
  /** Small proof numbers under the hero. */
  stats: Stat[]
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

export interface Profile {
  name: string
  location: string
  availability: string
  email: string
  /** Display form of the phone number, e.g. "+91 72238 27840". */
  phone: string
  /** Same number in tel: form, digits and a leading + only. */
  phoneHref: string
  socials: {
    github: SocialLink
    linkedin: SocialLink
  }
  /** Short About paragraphs, in plain English. */
  about: string[]
  data: Persona
  /** Offered only in the QA section. */
  qaResume: ResumeLink
}

export interface Stat {
  value: string
  label: string
}

export interface ToolChoice {
  /** The tool used. */
  pick: string
  /** The more common option it was picked over. */
  over: string
  /** Why, in one plain sentence. */
  because: string
}

export interface Shot {
  /** Path inside /public, without a leading slash. */
  src: string
  alt: string
  caption: string
  width: number
  height: number
}

export interface Project {
  slug: string
  name: string
  /** One catchy line that makes a recruiter read on. */
  hook: string
  /** Two short sentences: what it is and what it found. */
  summary: string
  /** Three headline numbers. */
  results: Stat[]
  /** "Used X instead of Y, because…" */
  choices: ToolChoice[]
  tools: string[]
  /** First one is shown on the page; the rest in the case study. */
  shots: Shot[]
  links: { github: string; demo?: string }
  /** Case study: the question, in plain English. */
  question: string
  /** Case study: what I did, step by step. */
  steps: string[]
  /** Case study: what the data showed. */
  findings: string[]
  /** Case study: what it can't do. */
  limits: string[]
  /** Optional note on who did what. */
  credit?: string
  /** Interactive extra shown in the case study. */
  extra?: 'sip-playground'
  evaluation?: {
    caption: string
    rows: { model: string; mae: number; r2: number; best?: boolean }[]
  }
}

export interface SkillGroup {
  title: string
  /** What I use it for, in plain words. */
  plain: string
  items: string[]
}

export interface Experience {
  company: string
  role: string
  /** YYYY-MM */
  start: string
  /** YYYY-MM, or "present" */
  end: string
  location: string
  highlights: string[]
}

export interface Education {
  degree: string
  field: string
  institution: string
  university: string
  location: string
  graduation: string
}

export interface Certification {
  name: string
  issuer: string
  date: string
  note: string
  /** Path inside /public (no leading slash) or a full URL. */
  href?: string
}
