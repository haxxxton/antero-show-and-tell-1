import { memo } from 'react';
import { useLink } from './hooks/useLink';
import { LinkProps } from './types/LinkProps';

const LinkComponent = ({ className, children, href, title }: LinkProps) => {
  const Component = useLink(href);

  return (
    <Component className={className} href={href} title={title}>
      {children}
    </Component>
  );
};

export const Link = memo(LinkComponent);
