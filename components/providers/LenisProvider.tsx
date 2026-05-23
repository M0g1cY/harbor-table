'use client';

import { ReactNode } from 'react';
import { useLenis } from '@/hooks/useLenis';

/**
 * LenisProvider - 全站平滑滚动 Provider
 *
 * 作用：
 * - 在 client 边界初始化 Lenis（保持 layout.tsx 仍是 server component）
 * - 不渲染额外 DOM 包裹，仅在树中执行 useLenis 的副作用
 * - 子组件树照常渲染
 */
export default function LenisProvider({ children }: { children: ReactNode }) {
  useLenis();
  return <>{children}</>;
}
