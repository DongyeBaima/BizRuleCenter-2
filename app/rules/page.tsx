'use client'

import { Header, Sidebar } from '@/components/layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Edit,
    Eye,
    FileCode,
    Plus,
    Search,
    Trash2,
    X,
} from 'lucide-react'
import * as React from 'react'

const initialRules = [
  {
    id: '1',
    name: '金额非空校验',
    code: 'AMOUNT_NOT_NULL',
    capabilityId: '1',
    capabilityName: '非空校验',
    ruleType: 'VALIDATION',
    expression: 'amount != null',
    status: 'ACTIVE',
    version: '1.0.0',
    updatedAt: '2026-01-20',
  },
  {
    id: '2',
    name: '金额范围校验',
    code: 'AMOUNT_RANGE',
    capabilityId: '2',
    capabilityName: '范围校验',
    ruleType: 'VALIDATION',
    expression: 'amount >= 0 && amount <= 1000000',
    status: 'ACTIVE',
    version: '1.0.0',
    updatedAt: '2026-01-19',
  },
  {
    id: '3',
    name: '订单状态校验',
    code: 'ORDER_STATUS_CHECK',
    capabilityId: '3',
    capabilityName: '枚举校验',
    ruleType: 'VALIDATION',
    expression: "status in ['CREATED', 'PAID', 'SHIPPED']",
    status: 'ACTIVE',
    version: '1.1.0',
    updatedAt: '2026-01-18',
  },
  {
    id: '4',
    name: '折扣计算',
    code: 'DISCOUNT_CALC',
    capabilityId: '4',
    capabilityName: '数值计算',
    ruleType: 'OPTIMIZATION',
    expression: 'amount * 0.9',
    status: 'DRAFT',
    version: '1.0.0',
    updatedAt: '2026-01-17',
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'ACTIVE':
      return <Badge variant="active">已激活</Badge>
    case 'DRAFT':
      return <Badge variant="draft">草稿</Badge>
    case 'INACTIVE':
      return <Badge variant="inactive">已停用</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

const getRuleTypeBadge = (type: string) => {
  return type === 'VALIDATION' 
    ? <Badge variant="default">校验</Badge>
    : <Badge variant="secondary">优化</Badge>
}

export default function RulesPage() {
  const [rules, setRules] = React.useState(initialRules)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedRule, setSelectedRule] = React.useState<typeof initialRules[0] | null>(null)
  const [showCreateModal, setShowCreateModal] = React.useState(false)
  const [newRule, setNewRule] = React.useState({
    name: '',
    code: '',
    ruleType: 'VALIDATION',
    expression: '',
  })

  const filteredRules = rules.filter(
    (rule) =>
      rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateRule = () => {
    if (newRule.name && newRule.code) {
      const rule = {
        id: String(rules.length + 1),
        name: newRule.name,
        code: newRule.code,
        capabilityId: '1',
        capabilityName: '非空校验',
        ruleType: newRule.ruleType,
        expression: newRule.expression,
        status: 'DRAFT',
        version: '1.0.0',
        updatedAt: new Date().toISOString().split('T')[0],
      }
      setRules([rule, ...rules])
      setNewRule({ name: '', code: '', ruleType: 'VALIDATION', expression: '' })
      setShowCreateModal(false)
    }
  }

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter((r) => r.id !== id))
    if (selectedRule?.id === id) {
      setSelectedRule(null)
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64">
        <Header
          title="规则模板管理"
          description="定义可复用的规则模板，关联能力"
          actions={
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              新建规则
            </Button>
          }
        />

        <div className="p-6 animate-fade-in">
          <div className="flex gap-6">
            <Card className="flex-1">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileCode className="h-5 w-5 text-primary" />
                      规则列表
                    </CardTitle>
                    <CardDescription>共 {filteredRules.length} 个规则模板</CardDescription>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="搜索规则..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>规则名称</TableHead>
                      <TableHead>编码</TableHead>
                      <TableHead>关联能力</TableHead>
                      <TableHead>类型</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>更新时间</TableHead>
                      <TableHead className="w-[100px]">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRules.map((rule) => (
                      <TableRow
                        key={rule.id}
                        className={`cursor-pointer ${selectedRule?.id === rule.id ? 'bg-muted' : ''}`}
                        onClick={() => setSelectedRule(rule)}
                      >
                        <TableCell className="font-medium">{rule.name}</TableCell>
                        <TableCell>
                          <code className="text-xs bg-muted px-2 py-1 rounded">{rule.code}</code>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{rule.capabilityName}</Badge>
                        </TableCell>
                        <TableCell>{getRuleTypeBadge(rule.ruleType)}</TableCell>
                        <TableCell>{getStatusBadge(rule.status)}</TableCell>
                        <TableCell className="text-muted-foreground">{rule.updatedAt}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedRule(rule)
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteRule(rule.id)
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {selectedRule && (
              <Card className="w-96 animate-slide-in">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{selectedRule.name}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setSelectedRule(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded">{selectedRule.code}</code>
                    {getStatusBadge(selectedRule.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">关联能力</p>
                      <Badge variant="secondary">{selectedRule.capabilityName}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">规则类型</p>
                      {getRuleTypeBadge(selectedRule.ruleType)}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">表达式</p>
                    <code className="block p-2 bg-muted rounded text-xs">{selectedRule.expression}</code>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      编辑
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <Card className="w-[500px] animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>新建规则模板</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setShowCreateModal(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>创建新的规则模板</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">规则名称 *</label>
                  <Input
                    placeholder="如：金额非空校验"
                    value={newRule.name}
                    onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">规则编码 *</label>
                  <Input
                    placeholder="如：AMOUNT_NOT_NULL"
                    value={newRule.code}
                    onChange={(e) => setNewRule({ ...newRule, code: e.target.value.toUpperCase() })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">规则类型</label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newRule.ruleType}
                    onChange={(e) => setNewRule({ ...newRule, ruleType: e.target.value })}
                  >
                    <option value="VALIDATION">校验规则</option>
                    <option value="OPTIMIZATION">优化规则</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">表达式</label>
                  <Input
                    placeholder="规则表达式"
                    value={newRule.expression}
                    onChange={(e) => setNewRule({ ...newRule, expression: e.target.value })}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setShowCreateModal(false)}>
                    取消
                  </Button>
                  <Button className="flex-1" onClick={handleCreateRule}>
                    创建
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
