/**
 * Animation Constants - 全站统一动画参数
 * 所有 GSAP / Framer Motion 动画从这里读取，避免魔法数字
 */

/** 缓动函数 - 与 globals.css 中 --ease-out 保持一致 */
export const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';

/** 标准时长 (秒) */
export const DURATION = {
  fast: 0.3,
  base: 0.8,
  slow: 1.4,
} as const;

/** Hero 入场动画专用参数 */
export const HERO_INTRO = {
  /** 字符 stagger 间隔 (秒) - 克制不花哨 */
  charStagger: 0.04,
  /** 元素之间的入场间隔 (秒) */
  elementStagger: 0.12,
  /** 标题动画时长 (秒) */
  titleDuration: 1.2,
  /** 背景图入场时长 (秒) */
  backgroundDuration: 1.6,
  /** 装饰元素动画时长 (秒) */
  detailDuration: 0.9,
  /** 时间轴整体延迟 (秒) - 让首屏先稳一帧再播 */
  startDelay: 0.1,
} as const;

/** ScrollTrigger 动画参数 - Phase 2 统一常量 */
export const SCROLL_TRIGGER = {
  // 触发位置
  startDefault: 'top 80%',
  startEarly: 'top 85%',
  startLate: 'top 75%',
  startMid: 'top 70%',

  // 动画时长 (秒)
  labelDuration: 0.8,
  titleDuration: 0.9,
  cardDuration: 1.0,
  elementDuration: 0.8,
  lineDuration: 1.2,

  // Stagger 间隔 (秒)
  staggerShort: 0.1,   // 表单字段
  staggerBase: 0.12,   // 信息块、Footer 栏
  staggerLong: 0.15,   // 卡片、文章

  // 位移距离 (px)
  revealYShort: 20,    // 版权行等轻量元素
  revealYSmall: 30,    // 小元素（label、表单字段、Footer 栏）
  revealYBase: 40,     // 标准元素（标题、引言）
  revealYLarge: 60,    // 大元素（Logo）
  revealYLong: 80,     // 卡片
  revealXBase: 40,     // 横向位移（Philosophy 文章、Reservation 信息块）

  // 其他
  blurInitial: 8,      // Philosophy 引言初始模糊 (px)
  parallaxRange: 80,   // Parallax 位移范围 (px)：-40px → 40px
  scaleInitial: 1.05,  // Menu 卡片初始缩放
} as const;

/** Magnetic Button 参数 - Phase 3B */
export const MAGNETIC = {
  /** 磁吸强度系数 (0-1) */
  strength: 0.35,
  /** 磁吸半径 (px) - 超出此距离不触发 */
  radius: 80,
  /** 位移插值速度 (0-1) - 越小越平滑 */
  lerp: 0.18,
} as const;

/** prefers-reduced-motion 检测 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
