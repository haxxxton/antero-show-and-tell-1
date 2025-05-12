import { LinkProps } from "../../../types/LinkProps";
import { getIsExternalLink } from "./getIsExternalLink";

export const getComponentFromHref = <C>(
  href: LinkProps['href'],
  externalComponent: C,
  internalComponent: C,
): C => {
  const isExternalLink = getIsExternalLink(href);
  if (isExternalLink) {
    return externalComponent;
  }
  return internalComponent;
};
