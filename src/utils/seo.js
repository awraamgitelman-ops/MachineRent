/**
 * Dynamic SEO helper for updating document meta tags, canonical links, and Open Graph data
 */
export function setPageSeo({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  schemaData = null
}) {
  const DOMAIN = 'https://agrorentex.com';
  const fullTitle = title.includes('AGRO RENTEX') ? title : `${title} | AGRO RENTEX`;
  document.title = fullTitle;

  // Meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && description) {
    metaDesc.setAttribute('content', description);
  }

  // Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  const fullCanonical = canonicalUrl ? (canonicalUrl.startsWith('http') ? canonicalUrl : `${DOMAIN}${canonicalUrl}`) : DOMAIN;
  canonical.setAttribute('href', fullCanonical);

  // Open Graph Title & Description & URL
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', fullTitle);

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription && description) ogDescription.setAttribute('content', description);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', fullCanonical);

  const ogImgEl = document.querySelector('meta[property="og:image"]');
  if (ogImgEl && ogImage) ogImgEl.setAttribute('content', ogImage);

  // Twitter
  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', fullTitle);

  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc && description) twDesc.setAttribute('content', description);

  const twImg = document.querySelector('meta[name="twitter:image"]');
  if (twImg && ogImage) twImg.setAttribute('content', ogImage);

  // Dynamic Schema.org JSON-LD
  let schemaScript = document.getElementById('dynamic-page-schema');
  if (schemaData) {
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'dynamic-page-schema';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(schemaData);
  } else if (schemaScript) {
    schemaScript.remove();
  }
}
