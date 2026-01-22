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
    Layers,
    Plus,
    Search,
    Trash2,
    X,
} from 'lucide-react'
import * as React from 'react'

const initialFieldRuleSets = [
  {
    id: '1',
    fieldCode: 'amount',
    fieldName: '订单金额',
    bizModelRuleSetId: '1',
    bizModelRuleSetName: '华东天猫订单规则',
    bizRuleSetId: '1',
    bizRuleSetName: '订单金额校验规则集',
    status: 'ACTIVE',
    updatedAt: '2026-01-20',
  },
  {
    id: '2',
    fieldCode: 'status',
    fieldName: '订单状态',
    bizModelRuleSetId: '1',
    bizModelRuleSetName: '华东天猫订单规则',
    bizRuleSetId: '2',
    bizRuleSetName: '订单状态校验规则集',
    status: 'ACTIVE',
    updatedAt: '2026-01-19',
  },
  {
    id: '3',
    fieldCode: 'price',
    fieldName: '商品价格',
    bizModelRuleSetId: '3',
    bizModelRuleSetName: '全国通用商品规则',
    bizRuleSetId: '3',
    bizRuleSetName: '商品价格优化规则集',
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

export default function BizFieldRuleSetsPage() {
  const [fieldRuleSets, setFieldRuleSets] = React.useState(initialFieldRuleSets)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedRuleSet, setSelectedRuleSet] = React.useState<typeof initialFieldRuleSets[0] | null>(null)
  const [showCreateModal, setShowCreateModal] = React.useState(false)
  const [newRuleSet, setNewRuleSet] = React.useState({
    fieldCode: '',
    fieldName: '',
  })

  const filteredRuleSets = fieldRuleSets.filter(
    (rs) =>
      rs.fieldName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rs.fieldCode.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateRuleSet = () => {
    if (newRuleSet.fieldCode && newRuleSet.fieldName) {
      const ruleSet = {
        id: String(fieldRuleSets.length + 1),
        fieldCode: newRuleSet.fieldCode,
        fieldName: newRuleSet.fieldName,
        bizModelRuleSetId: '1',
        bizModelRuleSetName: '华东天猫订单规则',
        bizRuleSetId: '1',
        bizRuleSetName: '订单金额校验规则集',
        status: 'DRAFT',
        updatedAt: new Date().toISOString().split('T')[0],
      }
      setFieldRuleSets([ruleSet, ...fieldRuleSets])
      setNewRuleSet({ fieldCode: '', fieldName: '' })
      setShowCreateModal(false)
    }
  }

  const handleDeleteRuleSet = (id: string) => {
    setFieldRuleSets(fieldRuleSets.filter((rs) => rs.id !== id))
    if (selectedRuleSet?.id === id) {
      setSelectedRuleSet(null)
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64">
        <Header
          title="字段规则集管理"
          description="字段级别的规则集绑定配置"
          actions={
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              新建字段规则集
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
                      <Layers className="h-5 w-5 text-primary" />
                      字段规则集列表
                    </CardTitle>
                    <CardDescription>共 {filteredRuleSets.length} 个字段规则集</CardDescription>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="搜索字段规则集..."
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
                      <TableHead>字段名称</TableHead>
                      <TableHead>字段编码</TableHead>
                      <TableHead>所属模型规则集</TableHead>
                      <TableHead>绑定业务规则集</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>更新时间</TableHead>
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
                        <TableCell className="font-medium">{ruleSet.fieldName}</TableCell>
                        <TableCell>
                          <code className="text-xs bg-muted px-2 py-1 rounded">{ruleSet.fieldCode}</code>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{ruleSet.bizModelRuleSetName}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{ruleSet.bizRuleSetName}</Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(ruleSet.status)}</TableCell>
                        <TableCell className="text-muted-foreground">{ruleSet.updatedAt}</TableCell>
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
                    <CardTitle className="text-base">{selectedRuleSet.fieldName}</CardTitle>
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
                    <code className="text-xs bg-muted px-2 py-1 rounded">{selectedRuleSet.fieldCode}</code>
                    {getStatusBadge(selectedRuleSet.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">所属模型规则集</p>
                    <Badge variant="outline">{selectedRuleSet.bizModelRuleSetName}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">绑定业务规则集</p>
                    <Badge variant="secondary">{selectedRuleSet.bizRuleSetName}</Badge>
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
                  <CardTitle>新建字段规则集</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setShowCreateModal(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>创建字段级别的规则集绑定</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">字段名称 *</label>
                  <Input
                    placeholder="如：订单金额"
                    value={newRuleSet.fieldName}
                    onChange={(e) => setNewRuleSet({ ...newRuleSet, fieldName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">字段编码 *</label>
                  <Input
                    placeholder="如：amount"
                    value={newRuleSet.fieldCode}
                    onChange={(e) => setNewRuleSet({ ...newRuleSet, fieldCode: e.target.value })}
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
