import { memo } from 'react';
import { LinkProps } from '../../types';

const ExternalLinkComponent = ({ className, children, href, title }: LinkProps) => (
  <a
    className={className}
    href={href}
    title={title}
    target="_blank"
    rel="noreferrer"
  >
    {children}
  </a>
);

export const ExternalLink = memo(ExternalLinkComponent);
