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

const initialBizRules = [
  {
    id: '1',
    name: '华东订单金额校验',
    code: 'EAST_ORDER_AMOUNT_CHECK',
    ruleTemplateId: '1',
    ruleTemplateName: '金额非空校验',
    bizRuleSetId: '1',
    bizRuleSetName: '订单金额校验规则集',
    priority: 0,
    params: { minAmount: 0, maxAmount: 100000 },
    status: 'ACTIVE',
    updatedAt: '2026-01-20',
  },
  {
    id: '2',
    name: '天猫订单状态校验',
    code: 'TMALL_ORDER_STATUS_CHECK',
    ruleTemplateId: '3',
    ruleTemplateName: '订单状态校验',
    bizRuleSetId: '2',
    bizRuleSetName: '订单状态校验规则集',
    priority: 1,
    params: { allowedStatus: ['CREATED', 'PAID'] },
    status: 'ACTIVE',
    updatedAt: '2026-01-19',
  },
  {
    id: '3',
    name: 'VIP用户折扣计算',
    code: 'VIP_DISCOUNT_CALC',
    ruleTemplateId: '4',
    ruleTemplateName: '折扣计算',
    bizRuleSetId: '1',
    bizRuleSetName: '订单金额校验规则集',
    priority: 2,
    params: { discountRate: 0.85 },
    status: 'DRAFT',
    updatedAt: '2026-01-18',
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

export default function BizRulesPage() {
  const [bizRules, setBizRules] = React.useState(initialBizRules)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedBizRule, setSelectedBizRule] = React.useState<typeof initialBizRules[0] | null>(null)
  const [showCreateModal, setShowCreateModal] = React.useState(false)
  const [newBizRule, setNewBizRule] = React.useState({
    name: '',
    code: '',
  })

  const filteredBizRules = bizRules.filter(
    (rule) =>
      rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateBizRule = () => {
    if (newBizRule.name && newBizRule.code) {
      const bizRule = {
        id: String(bizRules.length + 1),
        name: newBizRule.name,
        code: newBizRule.code,
        ruleTemplateId: '1',
        ruleTemplateName: '金额非空校验',
        bizRuleSetId: '1',
        bizRuleSetName: '订单金额校验规则集',
        priority: 0,
        params: {},
        status: 'DRAFT',
        updatedAt: new Date().toISOString().split('T')[0],
      }
      setBizRules([bizRule, ...bizRules])
      setNewBizRule({ name: '', code: '' })
      setShowCreateModal(false)
    }
  }

  const handleDeleteBizRule = (id: string) => {
    setBizRules(bizRules.filter((r) => r.id !== id))
    if (selectedBizRule?.id === id) {
      setSelectedBizRule(null)
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64">
        <Header
          title="业务规则管理"
          description="规则模板的业务化实例"
          actions={
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              新建业务规则
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
                      业务规则列表
                    </CardTitle>
                    <CardDescription>共 {filteredBizRules.length} 个业务规则</CardDescription>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="搜索业务规则..."
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
                      <TableHead>规则模板</TableHead>
                      <TableHead>所属规则集</TableHead>
                      <TableHead>优先级</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead className="w-[100px]">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBizRules.map((rule) => (
                      <TableRow
                        key={rule.id}
                        className={`cursor-pointer ${selectedBizRule?.id === rule.id ? 'bg-muted' : ''}`}
                        onClick={() => setSelectedBizRule(rule)}
                      >
                        <TableCell className="font-medium">{rule.name}</TableCell>
                        <TableCell>
                          <code className="text-xs bg-muted px-2 py-1 rounded">{rule.code}</code>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{rule.ruleTemplateName}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{rule.bizRuleSetName}</Badge>
                        </TableCell>
                        <TableCell>{rule.priority}</TableCell>
                        <TableCell>{getStatusBadge(rule.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBizRule(rule)
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
                                handleDeleteBizRule(rule.id)
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

            {selectedBizRule && (
              <Card className="w-96 animate-slide-in">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{selectedBizRule.name}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setSelectedBizRule(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded">{selectedBizRule.code}</code>
                    {getStatusBadge(selectedBizRule.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">规则模板</p>
                    <Badge variant="outline">{selectedBizRule.ruleTemplateName}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">所属规则集</p>
                    <Badge variant="secondary">{selectedBizRule.bizRuleSetName}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">参数配置</p>
                    <code className="block p-2 bg-muted rounded text-xs">
                      {JSON.stringify(selectedBizRule.params, null, 2)}
                    </code>
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
                  <CardTitle>新建业务规则</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setShowCreateModal(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>创建规则模板的业务化实例</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">规则名称 *</label>
                  <Input
                    placeholder="如：华东订单金额校验"
                    value={newBizRule.name}
                    onChange={(e) => setNewBizRule({ ...newBizRule, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">规则编码 *</label>
                  <Input
                    placeholder="如：EAST_ORDER_AMOUNT_CHECK"
                    value={newBizRule.code}
                    onChange={(e) => setNewBizRule({ ...newBizRule, code: e.target.value.toUpperCase() })}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setShowCreateModal(false)}>
                    取消
                  </Button>
                  <Button className="flex-1" onClick={handleCreateBizRule}>
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
