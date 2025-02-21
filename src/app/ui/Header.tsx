/**
 * Header component that serves as a wrapper for header elements.
 *
 * @component
 * @example
 * <Header className="header-class">
 *   <Header.Root className="root-class">
 *     <Header.Content className="content-class">
 *       Your content here
 *     </Header.Content>
 *   </Header.Root>
 * </Header>
 *
 * @param {string} [className] - Optional class name for the header element.
 * @param {ReactNode} children - The content to be rendered inside the header.
 *
 * @returns {JSX.Element} The rendered header component.
 */
import React, { FC, ReactNode } from "react";

interface HeaderProps {
  className?: string;
  children: ReactNode;
}

export const Header: FC<HeaderProps> & {
  Root: FC<{ children: ReactNode; className?: string }>;
  Content: FC<{ children: ReactNode; className?: string }>;
} = ({ className, children }) => {
  return <header className={className}>{children}</header>;
};

Header.Root = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <div className={`${className}`}>{children}</div>;

Header.Content = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <div className={`${className}`}>{children}</div>;
