import masterData from '@data/master_data.json';

function normalizeFooterLink(link) {
  return {
    label: link.label,
    url: link.url,
    icon: link.icon ?? 'link',
    external: link.external ?? /^https?:\/\//i.test(link.url),
  };
}

export function getFooterLinks() {
  const links = masterData.meta.footer?.links ?? [];
  return links.map(normalizeFooterLink);
}
