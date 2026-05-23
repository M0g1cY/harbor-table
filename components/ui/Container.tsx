import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Container - 统一布局容器
 * 使用 globals.css 中的 .site-container 纯 CSS 类
 * 避免 Tailwind utility 在 flex 父容器或 v4 arbitrary value 解析下的不稳定行为
 *
 * Desktop: max-width 1440px, padding 64px
 * Tablet: padding 40px
 * Mobile: padding 24px
 */
export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`site-container ${className}`.trim()}>
      {children}
    </div>
  );
}
