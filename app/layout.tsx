import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '业务规则中心 | BizRuleCenter',
  description: '基于业务模型的规则管理和执行平台，支持字段级别校验与优化规则的配置和运行',
  keywords: '业务规则,规则引擎,业务模型,规则管理',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
