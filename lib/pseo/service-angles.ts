/** Service-specific copy angles for matrix page generation */
export interface ServiceAngle {
  description: (parent: string, serviceLabel: string, wiSuffix: string) => string
  intro: (parent: string, serviceLower: string, wiSuffix: string) => string
  body: (parent: string, serviceLower: string, wiSuffix: string, parentIntro: string) => string
  wiBodyExtra?: (parent: string, serviceLower: string) => string
  keywords: (parent: string, parentLower: string, serviceLabel: string, serviceLower: string, wiSuffix: string) => string[]
}

const defaultAngle: ServiceAngle = {
  description: (parent, serviceLabel, wiSuffix) =>
    `${serviceLabel} for ${parent}${wiSuffix} businesses — custom software, business systems, and automation from SuchGrime.`,
  intro: (parent, serviceLower, wiSuffix) =>
    `We help ${parent}${wiSuffix} businesses with ${serviceLower} — custom applications, workflow automation, and systems built around how you actually operate.`,
  body: (parent, serviceLower, wiSuffix, parentIntro) =>
    `${parent}${wiSuffix} operators need systems that scale without adding headcount. Our ${serviceLower} engagements combine custom engineering with technical SEO foundations.${parentIntro ? ` ${parentIntro.slice(0, 180)}${parentIntro.length > 180 ? "…" : ""}` : ""} We scope every project around measurable outcomes — fewer spreadsheet hours, faster lead response, and systems built to rank for ${parent} + ${serviceLower} searches.`,
  keywords: (parent, parentLower, serviceLabel, serviceLower, wiSuffix) => [
    `${serviceLabel} ${parent}${wiSuffix}`,
    `${parent} ${serviceLower}`,
    `${parent}${wiSuffix} ${serviceLower}`,
    `${serviceLower} ${parentLower}`,
  ],
}

export const serviceAngles: Record<string, ServiceAngle> = {
  "custom-software": {
    description: (parent, _serviceLabel, wiSuffix) =>
      `Custom business software and applications for ${parent}${wiSuffix} — internal dashboards, customer portals, CRMs, and operational tools built for how you work.`,
    intro: (parent, _serviceLower, wiSuffix) =>
      `We engineer custom business applications for ${parent}${wiSuffix} operators — internal dashboards, customer portals, employee tools, inventory systems, and CRMs that replace spreadsheets and manual work.`,
    body: (parent, _serviceLower, wiSuffix, parentIntro) =>
      `${parent}${wiSuffix} businesses outgrow off-the-shelf software fast. We build custom applications — dashboards, portals, scheduling systems, and lead tracking platforms — engineered around your exact workflow.${parentIntro ? ` ${parentIntro.slice(0, 160)}${parentIntro.length > 160 ? "…" : ""}` : ""} Every engagement targets measurable outcomes: fewer spreadsheet hours, faster operations, and software your team actually uses.`,
    wiBodyExtra: (parent, _serviceLower) =>
      ` Wisconsin's manufacturing, healthcare, and service businesses need software built for Midwest operations — not Silicon Valley templates. SuchGrime is Milwaukee-based and builds custom business applications for ${parent} operators statewide.`,
    keywords: (parent, parentLower, _serviceLabel, _serviceLower, wiSuffix) => [
      `custom business software ${parent}${wiSuffix}`,
      `${parentLower} custom software development`,
      `small business app development ${parentLower}`,
      `${parent} custom business applications`,
      `custom CRM development ${parentLower}`,
      ...(wiSuffix ? [`custom software development wisconsin ${parentLower}`] : []),
    ],
  },
  "ai-automation": {
    description: (parent, _serviceLabel, wiSuffix) =>
      `Business automation and AI workflows for ${parent}${wiSuffix} — lead routing, CRM automation, AI assistants, and workflow systems that eliminate manual work.`,
    intro: (parent, _serviceLower, wiSuffix) =>
      `We build AI automation and workflow systems for ${parent}${wiSuffix} businesses — lead routing, automated follow-up, CRM wiring, data sync, and reporting pipelines that run while your team focuses on growth.`,
    body: (parent, _serviceLower, wiSuffix, parentIntro) =>
      `${parent}${wiSuffix} operators lose hours to manual data entry, disconnected tools, and spreadsheet workflows. We automate lead intake, CRM updates, follow-up sequences, and reporting — connecting your existing SaaS stack or building custom pipelines when off-the-shelf tools fall short.${parentIntro ? ` ${parentIntro.slice(0, 160)}${parentIntro.length > 160 ? "…" : ""}` : ""}`,
    wiBodyExtra: (parent, _serviceLower) =>
      ` SuchGrime is Milwaukee-based and partners with Wisconsin businesses across ${parent} and statewide — building automation that reduces manual work and helps small teams operate like much larger companies.`,
    keywords: (parent, parentLower, _serviceLabel, _serviceLower, wiSuffix) => [
      `business automation ${parent}${wiSuffix}`,
      `${parentLower} business automation`,
      `workflow automation ${parentLower}`,
      `AI automation ${parentLower}`,
      `business process automation ${parentLower}`,
      ...(wiSuffix ? [`business automation wisconsin ${parentLower}`] : []),
    ],
  },
  "web-development": {
    description: (parent, serviceLabel, wiSuffix) =>
      `${serviceLabel} for ${parent}${wiSuffix} businesses — high-performance websites and web applications engineered as the front door to your custom systems.`,
    intro: (parent, serviceLower, wiSuffix) =>
      `We build high-performance websites and web applications for ${parent}${wiSuffix} businesses — the entry point that often leads to custom software, automation, and internal tools as you scale.`,
    body: (parent, serviceLower, wiSuffix, parentIntro) =>
      `${parent}${wiSuffix} businesses need websites that convert and perform — not template sites that slow down and disappear from search. Our ${serviceLower} work uses Next.js, structured SEO, and Core Web Vitals optimization. Many clients start with a website and expand into custom dashboards, portals, and automation as operations grow.${parentIntro ? ` ${parentIntro.slice(0, 160)}${parentIntro.length > 160 ? "…" : ""}` : ""}`,
    keywords: (parent, parentLower, serviceLabel, serviceLower, wiSuffix) => [
      `${parent} web development`,
      `${parentLower} website design`,
      `${serviceLabel} ${parent}${wiSuffix}`,
      `${parent} ${serviceLower}`,
      `${parentLower} business website`,
    ],
  },
  "ecommerce-booking": {
    description: (parent, serviceLabel, wiSuffix) =>
      `${serviceLabel} for ${parent}${wiSuffix} — online booking, checkout flows, and conversion paths that connect to your operations.`,
    intro: (parent, serviceLower, wiSuffix) =>
      `We build e-commerce and booking systems for ${parent}${wiSuffix} businesses — appointment scheduling, checkout flows, and client-facing portals wired to your backend.`,
    body: (parent, serviceLower, wiSuffix, parentIntro) =>
      `${parent}${wiSuffix} service businesses need booking and checkout systems that actually work — not plugins that break under load. Our ${serviceLower} engagements include custom scheduling backends, payment integration, and notification workflows.${parentIntro ? ` ${parentIntro.slice(0, 160)}${parentIntro.length > 160 ? "…" : ""}` : ""}`,
    keywords: (parent, parentLower, serviceLabel, serviceLower, wiSuffix) => [
      `${parent} online booking system`,
      `${parentLower} ecommerce development`,
      `${serviceLabel} ${parent}${wiSuffix}`,
      `${parent} ${serviceLower}`,
      `appointment scheduling ${parentLower}`,
    ],
  },
}

export function getServiceAngle(slug: string): ServiceAngle {
  return serviceAngles[slug] ?? defaultAngle
}

/** Matrix pages for high-value services get a sitemap priority boost */
export const highValueMatrixServices = new Set(["custom-software", "ai-automation"])
