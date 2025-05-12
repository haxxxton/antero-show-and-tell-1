import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { memo } from 'react';
import { LinkProps } from '../../types';
import useIsPathSelected from '~/hooks/useIsPathSelected';

const InternalLinkComponent = ({ className, children, href, title }: LinkProps) => {
  const isSelected = useIsPathSelected(href);

  return (
    <Link
      className={clsx(className, isSelected && 'active')}
      to={href}
      title={title}
    >
      {children}
    </Link>
  );
};

export const InternalLink = memo(InternalLinkComponent);
