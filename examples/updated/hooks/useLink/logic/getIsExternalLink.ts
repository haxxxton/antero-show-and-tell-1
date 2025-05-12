export const getIsExternalLink = (href: string) => {
  const externalUrlRegex = /^(https?):?\/\/.+/;
  return externalUrlRegex.test(href);
};
