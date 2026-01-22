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
    Layers,
    Play,
    Plus,
    Search,
    Trash2,
    X,
} from 'lucide-react'
import * as React from 'react'

// 模拟业务规则集数据
const initialRuleSets = [
  {
    id: '1',
    name: '订单金额校验规则集',
    code: 'ORDER_AMOUNT_VALIDATION_SET',
    bizModelId: '1',
    bizModelName: '订单模型',
    executeStrategy: 'SERIAL',
    outputAggregateStrategy: 'MERGE',
    priority: 0,
    rulesCount: 5,
    status: 'ACTIVE',
    version: '1.0.0',
    updatedAt: '2026-01-20',
  },
  {
    id: '2',
    name: '订单状态校验规则集',
    code: 'ORDER_STATUS_VALIDATION_SET',
    bizModelId: '1',
    bizModelName: '订单模型',
    executeStrategy: 'FAIL_FAST',
    outputAggregateStrategy: 'FIRST_SUCCESS',
    priority: 1,
    rulesCount: 3,
    status: 'ACTIVE',
    version: '1.1.0',
    updatedAt: '2026-01-19',
  },
  {
    id: '3',
    name: '商品价格优化规则集',
    code: 'PRODUCT_PRICE_OPTIMIZATION_SET',
    bizModelId: '2',
    bizModelName: '商品模型',
    executeStrategy: 'PARALLEL',
    outputAggregateStrategy: 'MERGE',
    priority: 0,
    rulesCount: 4,
    status: 'DRAFT',
    version: '1.0.0',
    updatedAt: '2026-01-18',
  },
  {
    id: '4',
    name: '支付风控规则集',
    code: 'PAYMENT_RISK_CONTROL_SET',
    bizModelId: '4',
    bizModelName: '支付模型',
    executeStrategy: 'SERIAL',
    outputAggregateStrategy: 'LAST',
    priority: 0,
    rulesCount: 8,
    status: 'ACTIVE',
    version: '2.0.0',
    updatedAt: '2026-01-17',
  },
]

// 模拟规则数据
const mockRules = [
  { id: '1', name: '金额非空校验', ruleType: 'VALIDATION', priority: 0, status: 'ACTIVE' },
  { id: '2', name: '金额范围校验', ruleType: 'VALIDATION', priority: 1, status: 'ACTIVE' },
  { id: '3', name: '金额格式校验', ruleType: 'VALIDATION', priority: 2, status: 'ACTIVE' },
  { id: '4', name: '金额优化计算', ruleType: 'OPTIMIZATION', priority: 3, status: 'ACTIVE' },
  { id: '5', name: '折扣应用', ruleType: 'OPTIMIZATION', priority: 4, status: 'DRAFT' },
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

const getStrategyBadge = (strategy: string) => {
  const colors: Record<string, string> = {
    SERIAL: 'bg-blue-500/20 text-blue-400',
    PARALLEL: 'bg-green-500/20 text-green-400',
    FAIL_FAST: 'bg-orange-500/20 text-orange-400',
    MERGE: 'bg-purple-500/20 text-purple-400',
    LAST: 'bg-cyan-500/20 text-cyan-400',
    FIRST_SUCCESS: 'bg-pink-500/20 text-pink-400',
  }
  const labels: Record<string, string> = {
    SERIAL: '串行',
    PARALLEL: '并行',
    FAIL_FAST: '快速失败',
    MERGE: '合并',
    LAST: '取最后',
    FIRST_SUCCESS: '首个成功',
  }
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[strategy]}`}>
      {labels[strategy]}
    </span>
  )
}

export default function BizRuleSetsPage() {
  const [ruleSets, setRuleSets] = React.useState(initialRuleSets)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedRuleSet, setSelectedRuleSet] = React.useState<typeof initialRuleSets[0] | null>(null)
  const [showCreateModal, setShowCreateModal] = React.useState(false)
  const [newRuleSet, setNewRuleSet] = React.useState({
    name: '',
    code: '',
    executeStrategy: 'SERIAL',
    outputAggregateStrategy: 'MERGE',
  })

  const filteredRuleSets = ruleSets.filter(
    (ruleSet) =>
      ruleSet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ruleSet.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateRuleSet = () => {
    if (newRuleSet.name && newRuleSet.code) {
      const ruleSet = {
        id: String(ruleSets.length + 1),
        name: newRuleSet.name,
        code: newRuleSet.code,
        bizModelId: '1',
        bizModelName: '订单模型',
        executeStrategy: newRuleSet.executeStrategy,
        outputAggregateStrategy: newRuleSet.outputAggregateStrategy,
        priority: 0,
        rulesCount: 0,
        status: 'DRAFT',
        version: '1.0.0',
        updatedAt: new Date().toISOString().split('T')[0],
      }
      setRuleSets([ruleSet, ...ruleSets])
      setNewRuleSet({ name: '', code: '', executeStrategy: 'SERIAL', outputAggregateStrategy: 'MERGE' })
      setShowCreateModal(false)
    }
  }

  const handleDeleteRuleSet = (id: string) => {
    setRuleSets(ruleSets.filter((rs) => rs.id !== id))
    if (selectedRuleSet?.id === id) {
      setSelectedRuleSet(null)
    }
  }

  const handleActivate = (id: string) => {
    setRuleSets(ruleSets.map((rs) =>
      rs.id === id ? { ...rs, status: 'ACTIVE' } : rs
    ))
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64">
        <Header
          title="业务规则集管理"
          description="BizRule 的集合，定义执行策略和出参聚合策略"
          actions={
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              新建规则集
            </Button>
          }
        />

        <div className="p-6 animate-fade-in">
          <div className="flex gap-6">
            {/* 规则集列表 */}
            <Card className="flex-1">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="h-5 w-5 text-primary" />
                      规则集列表
                    </CardTitle>
                    <CardDescription>共 {filteredRuleSets.length} 个业务规则集</CardDescription>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="搜索规则集..."
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
                      <TableHead>规则集名称</TableHead>
                      <TableHead>编码</TableHead>
                      <TableHead>关联模型</TableHead>
                      <TableHead>执行策略</TableHead>
                      <TableHead>聚合策略</TableHead>
                      <TableHead>规则数</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead className="w-[100px]">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRuleSets.map((ruleSet) => (
                      <TableRow
                        key={ruleSet.id}
                        className={`cursor-pointer ${selectedRuleSet?.id === ruleSet.id ? 'bg-muted' : ''}`}
                        onClick={() => setSelectedRuleSet(ruleSet)}
                      >
                        <TableCell className="font-medium">{ruleSet.name}</TableCell>
                        <TableCell>
                          <code className="text-xs bg-muted px-2 py-1 rounded">{ruleSet.code}</code>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{ruleSet.bizModelName}</Badge>
                        </TableCell>
                        <TableCell>{getStrategyBadge(ruleSet.executeStrategy)}</TableCell>
                        <TableCell>{getStrategyBadge(ruleSet.outputAggregateStrategy)}</TableCell>
                        <TableCell>{ruleSet.rulesCount}</TableCell>
                        <TableCell>{getStatusBadge(ruleSet.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedRuleSet(ruleSet)
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
                                handleDeleteRuleSet(ruleSet.id)
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

            {/* 规则集详情面板 */}
            {selectedRuleSet && (
              <Card className="w-[420px] animate-slide-in">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{selectedRuleSet.name}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setSelectedRuleSet(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <code className="text-xs bg-muted px-2 py-1 rounded">{selectedRuleSet.code}</code>
                    {getStatusBadge(selectedRuleSet.status)}
                    <Badge variant="outline">v{selectedRuleSet.version}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">关联模型</p>
                      <Badge variant="secondary">{selectedRuleSet.bizModelName}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">优先级</p>
                      <p className="text-sm font-medium">{selectedRuleSet.priority}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">执行策略</p>
                      {getStrategyBadge(selectedRuleSet.executeStrategy)}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">聚合策略</p>
                      {getStrategyBadge(selectedRuleSet.outputAggregateStrategy)}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">包含规则 ({mockRules.length})</p>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {mockRules.map((rule) => (
                        <div
                          key={rule.id}
                          className="flex items-center justify-between p-2 rounded-lg bg-muted/50 text-sm"
                        >
                          <div className="flex items-center gap-2">
                            <FileCode className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{rule.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={rule.ruleType === 'VALIDATION' ? 'default' : 'secondary'} className="text-xs">
                              {rule.ruleType === 'VALIDATION' ? '校验' : '优化'}
                            </Badge>
                            {rule.status === 'ACTIVE' ? (
                              <span className="w-2 h-2 rounded-full bg-success" />
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-muted-foreground" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      编辑
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Play className="h-4 w-4 mr-2" />
                      测试
                    </Button>
                    {selectedRuleSet.status === 'DRAFT' && (
                      <Button onClick={() => handleActivate(selectedRuleSet.id)}>
                        发布
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* 创建规则集弹窗 */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <Card className="w-[500px] animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>新建业务规则集</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowCreateModal(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>创建新的业务规则集配置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">规则集名称 *</label>
                  <Input
                    placeholder="如：订单金额校验规则集"
                    value={newRuleSet.name}
                    onChange={(e) => setNewRuleSet({ ...newRuleSet, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">规则集编码 *</label>
                  <Input
                    placeholder="如：ORDER_AMOUNT_VALIDATION_SET"
                    value={newRuleSet.code}
                    onChange={(e) => setNewRuleSet({ ...newRuleSet, code: e.target.value.toUpperCase() })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">执行策略</label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={newRuleSet.executeStrategy}
                      onChange={(e) => setNewRuleSet({ ...newRuleSet, executeStrategy: e.target.value })}
                    >
                      <option value="SERIAL">串行执行</option>
                      <option value="PARALLEL">并行执行</option>
                      <option value="FAIL_FAST">快速失败</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">聚合策略</label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={newRuleSet.outputAggregateStrategy}
                      onChange={(e) => setNewRuleSet({ ...newRuleSet, outputAggregateStrategy: e.target.value })}
                    >
                      <option value="MERGE">合并</option>
                      <option value="LAST">取最后</option>
                      <option value="FIRST_SUCCESS">首个成功</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowCreateModal(false)}
                  >
                    取消
                  </Button>
                  <Button className="flex-1" onClick={handleCreateRuleSet}>
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
