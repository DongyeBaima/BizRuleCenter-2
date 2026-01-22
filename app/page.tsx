'use client'

import { Header, Sidebar } from '@/components/layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Activity,
    AlertCircle,
    ArrowUpRight,
    CheckCircle2,
    Clock,
    Database,
    FileCode,
    FolderTree,
    Layers,
    Target,
    Zap,
} from 'lucide-react'
import Link from 'next/link'

// 模拟统计数据
const stats = [
  {
    title: '业务模型',
    value: 12,
    change: '+2',
    icon: Database,
    href: '/biz-models',
    color: 'text-blue-400',
  },
  {
    title: '能力',
    value: 28,
    change: '+5',
    icon: Zap,
    href: '/capabilities',
    color: 'text-yellow-400',
  },
  {
    title: '规则模板',
    value: 56,
    change: '+8',
    icon: FileCode,
    href: '/rules',
    color: 'text-green-400',
  },
  {
    title: '业务规则集',
    value: 34,
    change: '+3',
    icon: Layers,
    href: '/biz-rule-sets',
    color: 'text-purple-400',
  },
  {
    title: '业务场景',
    value: 8,
    change: '+1',
    icon: Target,
    href: '/biz-scenarios',
    color: 'text-pink-400',
  },
  {
    title: '模型规则集',
    value: 45,
    change: '+6',
    icon: FolderTree,
    href: '/biz-model-rule-sets',
    color: 'text-cyan-400',
  },
]

// 模拟最近活动
const recentActivities = [
  {
    id: 1,
    type: 'create',
    target: '订单金额校验规则',
    category: '规则模板',
    time: '5分钟前',
    user: '张三',
  },
  {
    id: 2,
    type: 'update',
    target: '华东天猫订单规则',
    category: '模型规则集',
    time: '15分钟前',
    user: '李四',
  },
  {
    id: 3,
    type: 'publish',
    target: '订单创建校验场景',
    category: '业务场景',
    time: '1小时前',
    user: '王五',
  },
  {
    id: 4,
    type: 'create',
    target: '价格范围校验',
    category: '业务规则',
    time: '2小时前',
    user: '赵六',
  },
]

// 模拟执行统计
const executionStats = {
  total: 15680,
  success: 15234,
  failed: 446,
  avgTime: '45ms',
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64">
        <Header title="仪表盘" description="系统概览和统计信息" />
        
        <div className="p-6 space-y-6 animate-fade-in">
          {/* 统计卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Link key={stat.title} href={stat.href}>
                  <Card className="hover:border-primary/50 cursor-pointer transition-all group">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="mt-3">
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-muted-foreground">{stat.title}</p>
                          <Badge variant="secondary" className="text-xs">
                            {stat.change}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 执行统计 */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  执行统计
                </CardTitle>
                <CardDescription>今日规则执行情况</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm">总执行次数</span>
                  </div>
                  <span className="font-semibold">{executionStats.total.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-success/20">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    </div>
                    <span className="text-sm">成功</span>
                  </div>
                  <span className="font-semibold text-success">{executionStats.success.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-destructive/20">
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    </div>
                    <span className="text-sm">失败</span>
                  </div>
                  <span className="font-semibold text-destructive">{executionStats.failed.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-warning/20">
                      <Clock className="h-4 w-4 text-warning" />
                    </div>
                    <span className="text-sm">平均耗时</span>
                  </div>
                  <span className="font-semibold">{executionStats.avgTime}</span>
                </div>
              </CardContent>
            </Card>

            {/* 最近活动 */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>最近活动</CardTitle>
                    <CardDescription>系统最近的配置变更记录</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    查看全部
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${
                          activity.type === 'create' ? 'bg-success/20' :
                          activity.type === 'update' ? 'bg-warning/20' :
                          'bg-primary/20'
                        }`}>
                          {activity.type === 'create' ? (
                            <CheckCircle2 className={`h-4 w-4 ${
                              activity.type === 'create' ? 'text-success' :
                              activity.type === 'update' ? 'text-warning' :
                              'text-primary'
                            }`} />
                          ) : activity.type === 'update' ? (
                            <Activity className="h-4 w-4 text-warning" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{activity.target}</p>
                          <p className="text-xs text-muted-foreground">
                            {activity.category} · {activity.user}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 三层架构概览 */}
          <Card>
            <CardHeader>
              <CardTitle>三层架构概览</CardTitle>
              <CardDescription>系统采用三层模型架构，职责分明</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-lg border border-border bg-muted/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <Database className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="font-semibold">基础层</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    定义可复用的原子能力和规则模板
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>业务模型</span>
                      <Badge variant="secondary">12</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>能力</span>
                      <Badge variant="secondary">28</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>规则模板</span>
                      <Badge variant="secondary">56</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border bg-muted/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <Layers className="h-5 w-5 text-purple-400" />
                    </div>
                    <h3 className="font-semibold">业务规则层</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    规则的业务化实例和执行编排
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>业务规则集</span>
                      <Badge variant="secondary">34</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>业务规则</span>
                      <Badge variant="secondary">128</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border bg-muted/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-pink-500/20">
                      <Target className="h-5 w-5 text-pink-400" />
                    </div>
                    <h3 className="font-semibold">业务层</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    场景化配置体验，批量定位规则集
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>业务场景</span>
                      <Badge variant="secondary">8</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>模型规则集</span>
                      <Badge variant="secondary">45</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>字段规则集</span>
                      <Badge variant="secondary">156</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
