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
    ChevronRight,
    Edit,
    Eye,
    FolderTree,
    Plus,
    Search,
    Target,
    Trash2,
    X,
} from 'lucide-react'
import * as React from 'react'

// 模拟业务场景数据
const initialScenarios = [
  {
    id: '1',
    name: '订单创建校验',
    code: 'ORDER_CREATE_VALIDATION',
    bizModelId: '1',
    bizModelName: '订单模型',
    description: '订单创建时的字段校验场景',
    status: 'ACTIVE',
    identityFields: [
      { fieldCode: 'region', fieldName: '地区', index: 1 },
      { fieldCode: 'channel', fieldName: '渠道', index: 2 },
      { fieldCode: 'bizType', fieldName: '业务类型', index: 3 },
    ],
    subScenarios: [
      { code: 'NORMAL', name: '普通订单' },
      { code: 'PROMOTION', name: '促销订单' },
    ],
    ruleSetCount: 12,
    updatedAt: '2026-01-20',
  },
  {
    id: '2',
    name: '订单金额优化',
    code: 'ORDER_AMOUNT_OPTIMIZATION',
    bizModelId: '1',
    bizModelName: '订单模型',
    description: '订单金额计算和优化场景',
    status: 'ACTIVE',
    identityFields: [
      { fieldCode: 'region', fieldName: '地区', index: 1 },
      { fieldCode: 'userLevel', fieldName: '用户等级', index: 2 },
    ],
    subScenarios: [],
    ruleSetCount: 8,
    updatedAt: '2026-01-19',
  },
  {
    id: '3',
    name: '商品上架校验',
    code: 'PRODUCT_PUBLISH_VALIDATION',
    bizModelId: '2',
    bizModelName: '商品模型',
    description: '商品上架前的数据校验',
    status: 'DRAFT',
    identityFields: [
      { fieldCode: 'category', fieldName: '类目', index: 1 },
    ],
    subScenarios: [],
    ruleSetCount: 5,
    updatedAt: '2026-01-18',
  },
  {
    id: '4',
    name: '支付风控校验',
    code: 'PAYMENT_RISK_VALIDATION',
    bizModelId: '4',
    bizModelName: '支付模型',
    description: '支付交易的风险校验',
    status: 'ACTIVE',
    identityFields: [
      { fieldCode: 'payMethod', fieldName: '支付方式', index: 1 },
      { fieldCode: 'amount', fieldName: '金额范围', index: 2 },
    ],
    subScenarios: [
      { code: 'SMALL', name: '小额支付' },
      { code: 'LARGE', name: '大额支付' },
    ],
    ruleSetCount: 15,
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

export default function BizScenariosPage() {
  const [scenarios, setScenarios] = React.useState(initialScenarios)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedScenario, setSelectedScenario] = React.useState<typeof initialScenarios[0] | null>(null)
  const [showCreateModal, setShowCreateModal] = React.useState(false)
  const [newScenario, setNewScenario] = React.useState({
    name: '',
    code: '',
    description: '',
    bizModelId: '',
  })

  const filteredScenarios = scenarios.filter(
    (scenario) =>
      scenario.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scenario.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateScenario = () => {
    if (newScenario.name && newScenario.code) {
      const scenario = {
        id: String(scenarios.length + 1),
        name: newScenario.name,
        code: newScenario.code,
        bizModelId: newScenario.bizModelId || '1',
        bizModelName: '订单模型',
        description: newScenario.description,
        status: 'DRAFT',
        identityFields: [],
        subScenarios: [],
        ruleSetCount: 0,
        updatedAt: new Date().toISOString().split('T')[0],
      }
      setScenarios([scenario, ...scenarios])
      setNewScenario({ name: '', code: '', description: '', bizModelId: '' })
      setShowCreateModal(false)
    }
  }

  const handleDeleteScenario = (id: string) => {
    setScenarios(scenarios.filter((s) => s.id !== id))
    if (selectedScenario?.id === id) {
      setSelectedScenario(null)
    }
  }

  const handleActivate = (id: string) => {
    setScenarios(scenarios.map((s) =>
      s.id === id ? { ...s, status: 'ACTIVE' } : s
    ))
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64">
        <Header
          title="业务场景管理"
          description="定义业务场景，关联业务模型，配置业务身份和子场景"
          actions={
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              新建场景
            </Button>
          }
        />

        <div className="p-6 animate-fade-in">
          <div className="flex gap-6">
            {/* 场景列表 */}
            <Card className="flex-1">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      场景列表
                    </CardTitle>
                    <CardDescription>共 {filteredScenarios.length} 个业务场景</CardDescription>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="搜索场景..."
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
                      <TableHead>场景名称</TableHead>
                      <TableHead>编码</TableHead>
                      <TableHead>关联模型</TableHead>
                      <TableHead>身份字段</TableHead>
                      <TableHead>规则集数</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead className="w-[100px]">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredScenarios.map((scenario) => (
                      <TableRow
                        key={scenario.id}
                        className={`cursor-pointer ${selectedScenario?.id === scenario.id ? 'bg-muted' : ''}`}
                        onClick={() => setSelectedScenario(scenario)}
                      >
                        <TableCell className="font-medium">{scenario.name}</TableCell>
                        <TableCell>
                          <code className="text-xs bg-muted px-2 py-1 rounded">{scenario.code}</code>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{scenario.bizModelName}</Badge>
                        </TableCell>
                        <TableCell>{scenario.identityFields.length}</TableCell>
                        <TableCell>{scenario.ruleSetCount}</TableCell>
                        <TableCell>{getStatusBadge(scenario.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedScenario(scenario)
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
                                handleDeleteScenario(scenario.id)
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

            {/* 场景详情面板 */}
            {selectedScenario && (
              <Card className="w-[420px] animate-slide-in">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{selectedScenario.name}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setSelectedScenario(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded">{selectedScenario.code}</code>
                    {getStatusBadge(selectedScenario.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">描述</p>
                    <p className="text-sm">{selectedScenario.description}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">关联模型</p>
                    <Badge variant="secondary">{selectedScenario.bizModelName}</Badge>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">业务身份字段</p>
                    {selectedScenario.identityFields.length > 0 ? (
                      <div className="space-y-2">
                        {selectedScenario.identityFields.map((field) => (
                          <div
                            key={field.fieldCode}
                            className="flex items-center justify-between p-2 rounded-lg bg-muted/50 text-sm"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">#{field.index}</span>
                              <span className="font-medium">{field.fieldName}</span>
                            </div>
                            <code className="text-xs bg-background px-2 py-0.5 rounded">{field.fieldCode}</code>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">暂无业务身份字段</p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">子场景</p>
                    {selectedScenario.subScenarios.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedScenario.subScenarios.map((sub) => (
                          <Badge key={sub.code} variant="outline">
                            {sub.name}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">暂无子场景</p>
                    )}
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FolderTree className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">模型规则集</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{selectedScenario.ruleSetCount}</Badge>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      编辑
                    </Button>
                    {selectedScenario.status === 'DRAFT' && (
                      <Button 
                        className="flex-1"
                        onClick={() => handleActivate(selectedScenario.id)}
                      >
                        发布
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* 创建场景弹窗 */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <Card className="w-[500px] animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>新建业务场景</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowCreateModal(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>创建新的业务场景配置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">场景名称 *</label>
                  <Input
                    placeholder="如：订单创建校验"
                    value={newScenario.name}
                    onChange={(e) => setNewScenario({ ...newScenario, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">场景编码 *</label>
                  <Input
                    placeholder="如：ORDER_CREATE_VALIDATION"
                    value={newScenario.code}
                    onChange={(e) => setNewScenario({ ...newScenario, code: e.target.value.toUpperCase() })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">描述</label>
                  <Input
                    placeholder="场景描述信息"
                    value={newScenario.description}
                    onChange={(e) => setNewScenario({ ...newScenario, description: e.target.value })}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowCreateModal(false)}
                  >
                    取消
                  </Button>
                  <Button className="flex-1" onClick={handleCreateScenario}>
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
