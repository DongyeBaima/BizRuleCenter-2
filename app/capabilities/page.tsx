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
    Plus,
    Search,
    Trash2,
    X,
    Zap,
} from 'lucide-react'
import * as React from 'react'

const initialCapabilities = [
  {
    id: '1',
    name: '非空校验',
    code: 'NOT_NULL',
    description: '校验字段值不为空',
    category: 'VALIDATION',
    status: 'ACTIVE',
    rulesCount: 12,
    updatedAt: '2026-01-20',
  },
  {
    id: '2',
    name: '范围校验',
    code: 'RANGE_CHECK',
    description: '校验数值在指定范围内',
    category: 'VALIDATION',
    status: 'ACTIVE',
    rulesCount: 8,
    updatedAt: '2026-01-19',
  },
  {
    id: '3',
    name: '枚举校验',
    code: 'ENUM_CHECK',
    description: '校验值在枚举列表中',
    category: 'VALIDATION',
    status: 'ACTIVE',
    rulesCount: 6,
    updatedAt: '2026-01-18',
  },
  {
    id: '4',
    name: '数值计算',
    code: 'NUMERIC_CALC',
    description: '执行数值计算和转换',
    category: 'OPTIMIZATION',
    status: 'ACTIVE',
    rulesCount: 5,
    updatedAt: '2026-01-17',
  },
  {
    id: '5',
    name: '字符串处理',
    code: 'STRING_PROC',
    description: '字符串格式化和处理',
    category: 'OPTIMIZATION',
    status: 'DRAFT',
    rulesCount: 3,
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

const getCategoryBadge = (category: string) => {
  return category === 'VALIDATION' 
    ? <Badge variant="default">校验类</Badge>
    : <Badge variant="secondary">优化类</Badge>
}

export default function CapabilitiesPage() {
  const [capabilities, setCapabilities] = React.useState(initialCapabilities)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedCapability, setSelectedCapability] = React.useState<typeof initialCapabilities[0] | null>(null)
  const [showCreateModal, setShowCreateModal] = React.useState(false)
  const [newCapability, setNewCapability] = React.useState({
    name: '',
    code: '',
    description: '',
    category: 'VALIDATION',
  })

  const filteredCapabilities = capabilities.filter(
    (cap) =>
      cap.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cap.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateCapability = () => {
    if (newCapability.name && newCapability.code) {
      const capability = {
        id: String(capabilities.length + 1),
        name: newCapability.name,
        code: newCapability.code,
        description: newCapability.description,
        category: newCapability.category,
        status: 'DRAFT',
        rulesCount: 0,
        updatedAt: new Date().toISOString().split('T')[0],
      }
      setCapabilities([capability, ...capabilities])
      setNewCapability({ name: '', code: '', description: '', category: 'VALIDATION' })
      setShowCreateModal(false)
    }
  }

  const handleDeleteCapability = (id: string) => {
    setCapabilities(capabilities.filter((c) => c.id !== id))
    if (selectedCapability?.id === id) {
      setSelectedCapability(null)
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64">
        <Header
          title="能力管理"
          description="定义可复用的原子能力"
          actions={
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              新建能力
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
                      <Zap className="h-5 w-5 text-primary" />
                      能力列表
                    </CardTitle>
                    <CardDescription>共 {filteredCapabilities.length} 个能力</CardDescription>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="搜索能力..."
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
                      <TableHead>能力名称</TableHead>
                      <TableHead>编码</TableHead>
                      <TableHead>分类</TableHead>
                      <TableHead>关联规则数</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>更新时间</TableHead>
                      <TableHead className="w-[100px]">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCapabilities.map((cap) => (
                      <TableRow
                        key={cap.id}
                        className={`cursor-pointer ${selectedCapability?.id === cap.id ? 'bg-muted' : ''}`}
                        onClick={() => setSelectedCapability(cap)}
                      >
                        <TableCell className="font-medium">{cap.name}</TableCell>
                        <TableCell>
                          <code className="text-xs bg-muted px-2 py-1 rounded">{cap.code}</code>
                        </TableCell>
                        <TableCell>{getCategoryBadge(cap.category)}</TableCell>
                        <TableCell>{cap.rulesCount}</TableCell>
                        <TableCell>{getStatusBadge(cap.status)}</TableCell>
                        <TableCell className="text-muted-foreground">{cap.updatedAt}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedCapability(cap)
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
                                handleDeleteCapability(cap.id)
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

            {selectedCapability && (
              <Card className="w-96 animate-slide-in">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{selectedCapability.name}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setSelectedCapability(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded">{selectedCapability.code}</code>
                    {getStatusBadge(selectedCapability.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">描述</p>
                    <p className="text-sm">{selectedCapability.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">分类</p>
                      {getCategoryBadge(selectedCapability.category)}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">关联规则数</p>
                      <p className="text-sm font-medium">{selectedCapability.rulesCount}</p>
                    </div>
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
                  <CardTitle>新建能力</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setShowCreateModal(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>创建新的原子能力</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">能力名称 *</label>
                  <Input
                    placeholder="如：非空校验"
                    value={newCapability.name}
                    onChange={(e) => setNewCapability({ ...newCapability, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">能力编码 *</label>
                  <Input
                    placeholder="如：NOT_NULL"
                    value={newCapability.code}
                    onChange={(e) => setNewCapability({ ...newCapability, code: e.target.value.toUpperCase() })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">分类</label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newCapability.category}
                    onChange={(e) => setNewCapability({ ...newCapability, category: e.target.value })}
                  >
                    <option value="VALIDATION">校验类</option>
                    <option value="OPTIMIZATION">优化类</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">描述</label>
                  <Input
                    placeholder="能力描述"
                    value={newCapability.description}
                    onChange={(e) => setNewCapability({ ...newCapability, description: e.target.value })}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setShowCreateModal(false)}>
                    取消
                  </Button>
                  <Button className="flex-1" onClick={handleCreateCapability}>
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
