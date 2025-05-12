import { useMemo } from 'react';
import { LinkProps } from '../../types';
import { ExternalLink } from '../../ExternalLink';
import { InternalLink } from '../../InternalLink';
import { getComponentFromHref } from './logic/getComponentFromHref';

export const useLink = (href: LinkProps['href']) => {
  const Component = useMemo(
    () => getComponentFromHref(href, ExternalLink, InternalLink),
    [href],
  );

  return Component;
};
