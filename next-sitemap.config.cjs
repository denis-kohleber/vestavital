const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://www.vestavital.de'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/articles-sitemap.xml', '/admin/*', '/articles/*', '/datenschutz', '/impressum', '/kontakt', '/articles', '/admin', '/categories'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/admin/*'],
      },
    ],
    additionalSitemaps: [`${SITE_URL}/articles-sitemap.xml`],
  },
}
