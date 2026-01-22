'use client'

import { Header, Sidebar } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
    Bell,
    Database,
    Key,
    Save,
    Settings,
    Shield,
    User,
} from 'lucide-react'
import * as React from 'react'

export default function SettingsPage() {
  const [settings, setSettings] = React.useState({
    systemName: '业务规则中心',
    adminEmail: 'admin@example.com',
    maxRulesPerSet: '100',
    cacheEnabled: true,
    logLevel: 'INFO',
  })

  const handleSave = () => {
    // 保存设置逻辑
    console.log('Settings saved:', settings)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64">
        <Header
          title="系统设置"
          description="配置系统参数和偏好设置"
          actions={
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              保存设置
            </Button>
          }
        />

        <div className="p-6 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 基础设置 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  基础设置
                </CardTitle>
                <CardDescription>系统基本配置信息</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">系统名称</label>
                  <Input
                    value={settings.systemName}
                    onChange={(e) => setSettings({ ...settings, systemName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">管理员邮箱</label>
                  <Input
                    type="email"
                    value={settings.adminEmail}
                    onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* 规则配置 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  规则配置
                </CardTitle>
                <CardDescription>规则引擎相关配置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">规则集最大规则数</label>
                  <Input
                    type="number"
                    value={settings.maxRulesPerSet}
                    onChange={(e) => setSettings({ ...settings, maxRulesPerSet: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">日志级别</label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={settings.logLevel}
                    onChange={(e) => setSettings({ ...settings, logLevel: e.target.value })}
                  >
                    <option value="DEBUG">DEBUG</option>
                    <option value="INFO">INFO</option>
                    <option value="WARN">WARN</option>
                    <option value="ERROR">ERROR</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">启用缓存</p>
                    <p className="text-xs text-muted-foreground">缓存规则编译结果</p>
                  </div>
                  <button
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.cacheEnabled ? 'bg-primary' : 'bg-muted'
                    }`}
                    onClick={() => setSettings({ ...settings, cacheEnabled: !settings.cacheEnabled })}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.cacheEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* 安全设置 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  安全设置
                </CardTitle>
                <CardDescription>系统安全相关配置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-muted/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">API 密钥管理</p>
                      <p className="text-xs text-muted-foreground">管理系统 API 访问密钥</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">管理</Button>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">用户权限</p>
                      <p className="text-xs text-muted-foreground">配置用户角色和权限</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">配置</Button>
                </div>
              </CardContent>
            </Card>

            {/* 通知设置 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  通知设置
                </CardTitle>
                <CardDescription>系统通知和告警配置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-muted/50 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">邮件通知</p>
                    <p className="text-xs text-muted-foreground">规则执行失败时发送邮件</p>
                  </div>
                  <button
                    className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary"
                  >
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                  </button>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">钉钉通知</p>
                    <p className="text-xs text-muted-foreground">重要事件推送到钉钉群</p>
                  </div>
                  <button
                    className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted"
                  >
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
