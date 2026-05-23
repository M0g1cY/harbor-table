'use client';

import { useRef, useImperativeHandle, forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';

/**
 * MagneticButton - 可复用的磁吸按钮组件
 *
 * 功能：
 * - 包裹任意子节点
 * - 支持所有原生 button 属性
 * - 自动应用 useMagnetic hook
 * - disabled 状态下禁用磁吸效果
 * - 保持 focus-visible 样式
 * - 正确处理外部 ref 与内部 ref 的合并
 */

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, className = '', disabled = false, ...props }, externalRef) => {
    // 内部 ref 用于 useMagnetic hook
    const internalRef = useRef<HTMLButtonElement>(null);

    // 将内部 ref 暴露给外部 ref (用于 Hero intro 动画)
    useImperativeHandle(externalRef, () => internalRef.current!);

    // 应用磁吸效果 (使用内部 ref)
    useMagnetic({ buttonRef: internalRef, disabled });

    return (
      <button
        ref={internalRef}
        className={className}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

MagneticButton.displayName = 'MagneticButton';

export default MagneticButton;
