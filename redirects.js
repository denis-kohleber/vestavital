const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // alle IE-Browser
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // alle Seiten außer /ie-incompatible.html
  }

  // If site is without "www", redirect to "www"
  const wwwRedirect = {
    source: '/:path*',
    has: [
      {
        type: 'host',
        value: 'vestavital.de', // Host ohne www
      },
    ],
    destination: 'https://www.vestavital.de/:path*', // Mit www
    permanent: true, // Permanente Weiterleitung
  }

  const redirects = [internetExplorerRedirect, wwwRedirect]

  return redirects
}

export default redirects
