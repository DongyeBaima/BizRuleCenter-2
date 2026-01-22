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
    FolderTree,
    Plus,
    Search,
    Trash2,
    X,
} from 'lucide-react'
import * as React from 'react'

const initialModelRuleSets = [
  {
    id: '1',
    name: '华东天猫订单规则',
    code: 'EAST_TMALL_ORDER_RULES',
    bizScenarioId: '1',
    bizScenarioName: '订单创建校验',
    bizModelId: '1',
    bizModelName: '订单模型',
    identityValues: { region: '华东', channel: '天猫' },
    fieldRuleSetCount: 8,
    status: 'ACTIVE',
    updatedAt: '2026-01-20',
  },
  {
    id: '2',
    name: '华南京东订单规则',
    code: 'SOUTH_JD_ORDER_RULES',
    bizScenarioId: '1',
    bizScenarioName: '订单创建校验',
    bizModelId: '1',
    bizModelName: '订单模型',
    identityValues: { region: '华南', channel: '京东' },
    fieldRuleSetCount: 6,
    status: 'ACTIVE',
    updatedAt: '2026-01-19',
  },
  {
    id: '3',
    name: '全国通用商品规则',
    code: 'GLOBAL_PRODUCT_RULES',
    bizScenarioId: '3',
    bizScenarioName: '商品上架校验',
    bizModelId: '2',
    bizModelName: '商品模型',
    identityValues: { category: '通用' },
    fieldRuleSetCount: 5,
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

export default function BizModelRuleSetsPage() {
  const [modelRuleSets, setModelRuleSets] = React.useState(initialModelRuleSets)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedRuleSet, setSelectedRuleSet] = React.useState<typeof initialModelRuleSets[0] | null>(null)
  const [showCreateModal, setShowCreateModal] = React.useState(false)
  const [newRuleSet, setNewRuleSet] = React.useState({
    name: '',
    code: '',
  })

  const filteredRuleSets = modelRuleSets.filter(
    (rs) =>
      rs.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rs.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateRuleSet = () => {
    if (newRuleSet.name && newRuleSet.code) {
      const ruleSet = {
        id: String(modelRuleSets.length + 1),
        name: newRuleSet.name,
        code: newRuleSet.code,
        bizScenarioId: '1',
        bizScenarioName: '订单创建校验',
        bizModelId: '1',
        bizModelName: '订单模型',
        identityValues: {},
        fieldRuleSetCount: 0,
        status: 'DRAFT',
        updatedAt: new Date().toISOString().split('T')[0],
      }
      setModelRuleSets([ruleSet, ...modelRuleSets])
      setNewRuleSet({ name: '', code: '' })
      setShowCreateModal(false)
    }
  }

  const handleDeleteRuleSet = (id: string) => {
    setModelRuleSets(modelRuleSets.filter((rs) => rs.id !== id))
    if (selectedRuleSet?.id === id) {
      setSelectedRuleSet(null)
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64">
        <Header
          title="模型规则集管理"
          description="业务身份定位的规则集配置"
          actions={
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              新建模型规则集
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
                      <FolderTree className="h-5 w-5 text-primary" />
                      模型规则集列表
                    </CardTitle>
                    <CardDescription>共 {filteredRuleSets.length} 个模型规则集</CardDescription>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="搜索模型规则集..."
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
                      <TableHead>所属场景</TableHead>
                      <TableHead>关联模型</TableHead>
                      <TableHead>字段规则集数</TableHead>
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
                          <Badge variant="outline">{ruleSet.bizScenarioName}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{ruleSet.bizModelName}</Badge>
                        </TableCell>
                        <TableCell>{ruleSet.fieldRuleSetCount}</TableCell>
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

            {selectedRuleSet && (
              <Card className="w-96 animate-slide-in">
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
                  <div className="flex items-center gap-2 mt-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded">{selectedRuleSet.code}</code>
                    {getStatusBadge(selectedRuleSet.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">所属场景</p>
                    <Badge variant="outline">{selectedRuleSet.bizScenarioName}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">关联模型</p>
                    <Badge variant="secondary">{selectedRuleSet.bizModelName}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">业务身份值</p>
                    <code className="block p-2 bg-muted rounded text-xs">
                      {JSON.stringify(selectedRuleSet.identityValues, null, 2)}
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
                  <CardTitle>新建模型规则集</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setShowCreateModal(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>创建业务身份定位的规则集</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">规则集名称 *</label>
                  <Input
                    placeholder="如：华东天猫订单规则"
                    value={newRuleSet.name}
                    onChange={(e) => setNewRuleSet({ ...newRuleSet, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">规则集编码 *</label>
                  <Input
                    placeholder="如：EAST_TMALL_ORDER_RULES"
                    value={newRuleSet.code}
                    onChange={(e) => setNewRuleSet({ ...newRuleSet, code: e.target.value.toUpperCase() })}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setShowCreateModal(false)}>
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
