'use client'

import { cn } from '@/lib/utils'
import {
    ChevronDown,
    ChevronRight,
    Database,
    GitBranch,
    Layers,
    LayoutDashboard,
    Settings,
    Target
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'

interface NavItem {
  title: string
  href?: string
  icon: React.ElementType
  children?: { title: string; href: string }[]
}

const navigation: NavItem[] = [
  {
    title: '仪表盘',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: '基础层',
    icon: Database,
    children: [
      { title: '业务模型', href: '/biz-models' },
      { title: '能力管理', href: '/capabilities' },
      { title: '规则模板', href: '/rules' },
    ],
  },
  {
    title: '业务规则层',
    icon: Layers,
    children: [
      { title: '业务规则集', href: '/biz-rule-sets' },
      { title: '业务规则', href: '/biz-rules' },
    ],
  },
  {
    title: '业务层',
    icon: Target,
    children: [
      { title: '业务场景', href: '/biz-scenarios' },
      { title: '模型规则集', href: '/biz-model-rule-sets' },
      { title: '字段规则集', href: '/biz-field-rule-sets' },
    ],
  },
  {
    title: '系统设置',
    href: '/settings',
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [openGroups, setOpenGroups] = React.useState<string[]>(['基础层', '业务规则层', '业务层'])

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    )
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-sidebar">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
          <GitBranch className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-base font-semibold text-foreground">规则中心</h1>
          <p className="text-xs text-muted-foreground">BizRuleCenter</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto h-[calc(100vh-4rem)]">
        {navigation.map((item) => {
          const Icon = item.icon
          const isOpen = openGroups.includes(item.title)
          const hasChildren = item.children && item.children.length > 0

          if (hasChildren) {
            const isChildActive = item.children?.some((child) => pathname === child.href)
            return (
              <div key={item.title} className="space-y-1">
                <button
                  onClick={() => toggleGroup(item.title)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isChildActive
                      ? 'bg-sidebar-hover text-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-hover hover:text-foreground'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </div>
                  {isOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                {isOpen && (
                  <div className="ml-4 space-y-1 border-l border-sidebar-border pl-4">
                    {item.children?.map((child) => {
                      const isActive = pathname === child.href
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'flex items-center rounded-lg px-3 py-2 text-sm transition-colors',
                            isActive
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-sidebar-foreground hover:bg-sidebar-hover hover:text-foreground'
                          )}
                        >
                          {child.title}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          }

          const isActive = pathname === item.href
          return (
            <Link
              key={item.title}
              href={item.href || '/'}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-sidebar-foreground hover:bg-sidebar-hover hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
