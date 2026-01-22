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
    Database,
    Edit,
    Eye,
    Plus,
    Search,
    Trash2,
    X
} from 'lucide-react'
import * as React from 'react'

interface Field {
  fieldName: string
  fieldType: string
  required: boolean
  description: string
}

interface BizModel {
  id: string
  name: string
  code: string
  description: string
  version: string
  status: string
  fields: Field[]
  updatedAt: string
}

// 模拟业务模型数据
const initialBizModels: BizModel[] = [
  {
    id: '1',
    name: '订单模型',
    code: 'ORDER',
    description: '电商订单业务数据结构',
    version: '1.2.0',
    status: 'ACTIVE',
    fields: [
      { fieldName: 'orderId', fieldType: 'Long', required: true, description: '订单ID' },
      { fieldName: 'amount', fieldType: 'Double', required: true, description: '订单金额' },
      { fieldName: 'status', fieldType: 'String', required: true, description: '订单状态' },
      { fieldName: 'region', fieldType: 'String', required: true, description: '地区' },
      { fieldName: 'channel', fieldType: 'String', required: true, description: '渠道' },
      { fieldName: 'userId', fieldType: 'Long', required: true, description: '用户ID' },
      { fieldName: 'createTime', fieldType: 'Date', required: true, description: '创建时间' },
      { fieldName: 'items', fieldType: 'Array', required: false, description: '商品列表' },
    ],
    updatedAt: '2026-01-20',
  },
  {
    id: '2',
    name: '商品模型',
    code: 'PRODUCT',
    description: '商品信息数据结构',
    version: '1.0.0',
    status: 'ACTIVE',
    fields: [
      { fieldName: 'productId', fieldType: 'Long', required: true, description: '商品ID' },
      { fieldName: 'name', fieldType: 'String', required: true, description: '商品名称' },
      { fieldName: 'price', fieldType: 'Double', required: true, description: '商品价格' },
      { fieldName: 'category', fieldType: 'String', required: true, description: '商品类目' },
    ],
    updatedAt: '2026-01-19',
  },
  {
    id: '3',
    name: '用户模型',
    code: 'USER',
    description: '用户基础信息数据结构',
    version: '2.0.0',
    status: 'ACTIVE',
    fields: [
      { fieldName: 'userId', fieldType: 'Long', required: true, description: '用户ID' },
      { fieldName: 'username', fieldType: 'String', required: true, description: '用户名' },
      { fieldName: 'email', fieldType: 'String', required: false, description: '邮箱' },
    ],
    updatedAt: '2026-01-18',
  },
  {
    id: '4',
    name: '支付模型',
    code: 'PAYMENT',
    description: '支付交易数据结构',
    version: '1.1.0',
    status: 'DRAFT',
    fields: [
      { fieldName: 'paymentId', fieldType: 'Long', required: true, description: '支付ID' },
      { fieldName: 'amount', fieldType: 'Double', required: true, description: '支付金额' },
      { fieldName: 'method', fieldType: 'String', required: true, description: '支付方式' },
    ],
    updatedAt: '2026-01-17',
  },
  {
    id: '5',
    name: '物流模型',
    code: 'LOGISTICS',
    description: '物流配送数据结构',
    version: '1.0.0',
    status: 'INACTIVE',
    fields: [
      { fieldName: 'logisticsId', fieldType: 'Long', required: true, description: '物流ID' },
      { fieldName: 'trackingNo', fieldType: 'String', required: true, description: '物流单号' },
      { fieldName: 'status', fieldType: 'String', required: true, description: '物流状态' },
    ],
    updatedAt: '2026-01-16',
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

export default function BizModelsPage() {
  const [bizModels, setBizModels] = React.useState(initialBizModels)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedModel, setSelectedModel] = React.useState<BizModel | null>(null)
  const [showCreateModal, setShowCreateModal] = React.useState(false)
  const [showFieldModal, setShowFieldModal] = React.useState(false)
  const [newModel, setNewModel] = React.useState({
    name: '',
    code: '',
    description: '',
  })
  const [newField, setNewField] = React.useState({
    fieldName: '',
    fieldType: 'String',
    required: false,
    description: '',
  })

  const filteredModels = bizModels.filter(
    (model) =>
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateModel = () => {
    if (newModel.name && newModel.code) {
      const model: BizModel = {
        id: String(bizModels.length + 1),
        name: newModel.name,
        code: newModel.code,
        description: newModel.description,
        version: '1.0.0',
        status: 'DRAFT',
        fields: [],
        updatedAt: new Date().toISOString().split('T')[0],
      }
      setBizModels([model, ...bizModels])
      setNewModel({ name: '', code: '', description: '' })
      setShowCreateModal(false)
    }
  }

  const handleAddField = () => {
    if (newField.fieldName && selectedModel) {
      const updatedModels = bizModels.map((m) => {
        if (m.id === selectedModel.id) {
          return {
            ...m,
            fields: [...m.fields, newField],
            updatedAt: new Date().toISOString().split('T')[0],
          }
        }
        return m
      })
      setBizModels(updatedModels)
      const updatedModel = updatedModels.find((m) => m.id === selectedModel.id)
      if (updatedModel) {
        setSelectedModel(updatedModel)
      }
      setNewField({ fieldName: '', fieldType: 'String', required: false, description: '' })
      setShowFieldModal(false)
    }
  }

  const handleDeleteField = (fieldName: string) => {
    if (selectedModel) {
      const updatedModels = bizModels.map((m) => {
        if (m.id === selectedModel.id) {
          return {
            ...m,
            fields: m.fields.filter((f) => f.fieldName !== fieldName),
            updatedAt: new Date().toISOString().split('T')[0],
          }
        }
        return m
      })
      setBizModels(updatedModels)
      const updatedModel = updatedModels.find((m) => m.id === selectedModel.id)
      if (updatedModel) {
        setSelectedModel(updatedModel)
      }
    }
  }

  const handleDeleteModel = (id: string) => {
    setBizModels(bizModels.filter((m) => m.id !== id))
    if (selectedModel?.id === id) {
      setSelectedModel(null)
    }
  }

  const handleActivate = (id: string) => {
    setBizModels(bizModels.map((m) => 
      m.id === id ? { ...m, status: 'ACTIVE' } : m
    ))
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64">
        <Header
          title="业务模型管理"
          description="定义业务数据结构，包含字段元信息"
          actions={
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              新建模型
            </Button>
          }
        />

        <div className="p-6 animate-fade-in">
          <div className="flex gap-6">
            {/* 模型列表 */}
            <Card className="flex-1">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-primary" />
                      模型列表
                    </CardTitle>
                    <CardDescription>共 {filteredModels.length} 个业务模型</CardDescription>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="搜索模型..."
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
                      <TableHead>模型名称</TableHead>
                      <TableHead>编码</TableHead>
                      <TableHead>版本</TableHead>
                      <TableHead>字段数</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>更新时间</TableHead>
                      <TableHead className="w-[100px]">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredModels.map((model) => (
                      <TableRow
                        key={model.id}
                        className={`cursor-pointer ${selectedModel?.id === model.id ? 'bg-muted' : ''}`}
                        onClick={() => setSelectedModel(model)}
                      >
                        <TableCell className="font-medium">{model.name}</TableCell>
                        <TableCell>
                          <code className="text-xs bg-muted px-2 py-1 rounded">{model.code}</code>
                        </TableCell>
                        <TableCell>{model.version}</TableCell>
                        <TableCell>{model.fields.length}</TableCell>
                        <TableCell>{getStatusBadge(model.status)}</TableCell>
                        <TableCell className="text-muted-foreground">{model.updatedAt}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedModel(model)
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
                                handleDeleteModel(model.id)
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

            {/* 模型详情面板 */}
            {selectedModel && (
              <Card className="w-96 animate-slide-in">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{selectedModel.name}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setSelectedModel(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded">{selectedModel.code}</code>
                    {getStatusBadge(selectedModel.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">描述</p>
                    <p className="text-sm">{selectedModel.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">版本</p>
                      <p className="text-sm font-medium">{selectedModel.version}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">更新时间</p>
                      <p className="text-sm font-medium">{selectedModel.updatedAt}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-muted-foreground">字段列表 ({selectedModel.fields.length})</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowFieldModal(true)}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        添加字段
                      </Button>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {selectedModel.fields.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-4">暂无字段，点击上方按钮添加</p>
                      ) : (
                        selectedModel.fields.map((field) => (
                          <div
                            key={field.fieldName}
                            className="flex items-center justify-between p-2 rounded-lg bg-muted/50 text-sm group"
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{field.fieldName}</span>
                              {field.required && (
                                <span className="text-destructive text-xs">*</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {field.fieldType}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handleDeleteField(field.fieldName)}
                              >
                                <Trash2 className="h-3 w-3 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      编辑
                    </Button>
                    {selectedModel.status === 'DRAFT' && (
                      <Button 
                        className="flex-1"
                        onClick={() => handleActivate(selectedModel.id)}
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

        {/* 创建模型弹窗 */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <Card className="w-[500px] animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>新建业务模型</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowCreateModal(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>创建新的业务数据结构定义</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">模型名称 *</label>
                  <Input
                    placeholder="如：订单模型"
                    value={newModel.name}
                    onChange={(e) => setNewModel({ ...newModel, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">模型编码 *</label>
                  <Input
                    placeholder="如：ORDER"
                    value={newModel.code}
                    onChange={(e) => setNewModel({ ...newModel, code: e.target.value.toUpperCase() })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">描述</label>
                  <Input
                    placeholder="模型描述信息"
                    value={newModel.description}
                    onChange={(e) => setNewModel({ ...newModel, description: e.target.value })}
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
                  <Button className="flex-1" onClick={handleCreateModel}>
                    创建
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 添加字段弹窗 */}
        {showFieldModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <Card className="w-[500px] animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>添加字段</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowFieldModal(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>为 {selectedModel?.name} 添加新字段</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">字段名称 *</label>
                  <Input
                    placeholder="如：orderId"
                    value={newField.fieldName}
                    onChange={(e) => setNewField({ ...newField, fieldName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">字段类型 *</label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newField.fieldType}
                    onChange={(e) => setNewField({ ...newField, fieldType: e.target.value })}
                  >
                    <option value="String">String</option>
                    <option value="Long">Long</option>
                    <option value="Integer">Integer</option>
                    <option value="Double">Double</option>
                    <option value="Boolean">Boolean</option>
                    <option value="Date">Date</option>
                    <option value="Array">Array</option>
                    <option value="Object">Object</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">描述</label>
                  <Input
                    placeholder="字段描述"
                    value={newField.description}
                    onChange={(e) => setNewField({ ...newField, description: e.target.value })}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="required"
                    checked={newField.required}
                    onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                    className="h-4 w-4 rounded border-input"
                  />
                  <label htmlFor="required" className="text-sm font-medium">必填字段</label>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowFieldModal(false)}
                  >
                    取消
                  </Button>
                  <Button className="flex-1" onClick={handleAddField}>
                    添加
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
