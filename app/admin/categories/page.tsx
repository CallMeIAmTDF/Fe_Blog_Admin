"use client"

import {useEffect, useState} from "react"
import { Edit, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {useCategoryQuery, useDashboardQuery} from "@/hooks/useAdminQuery";
import {CategoryResponse} from "@/types/api";

// Mock category data
const mockCategories = [
  { id: 1, name: "Technology", slug: "technology", postCount: 15, status: "Active" },
  { id: 2, name: "Health", slug: "health", postCount: 8, status: "Active" },
  { id: 3, name: "Travel", slug: "travel", postCount: 12, status: "Active" },
  { id: 4, name: "Food", slug: "food", postCount: 0, status: "Inactive" },
  { id: 5, name: "Finance", slug: "finance", postCount: 5, status: "Active" },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryResponse[]>()
  const {data, isLoading, error} = useCategoryQuery()
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [categoryToEdit, setCategoryToEdit] = useState<any>(null)
  const [newCategory, setNewCategory] = useState({ name: "", slug: "" })

  useEffect(() => {
    if (data) {
      setCategories(data.data)
    }
  }, [data]);


  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }
  if (error || !categories) return <div>Error loading data</div>


  const filteredCategories = categories.filter(
    (category) =>
      category.cname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.cdesc.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteCategory = (categoryId: number) => {
    // setCategoryToDelete(categoryId)
    // setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // if (categoryToDelete) {
    //   setCategories(categories.filter((category) => category.id !== categoryToDelete))
    //   setDeleteDialogOpen(false)
    //   setCategoryToDelete(null)
    // }
  }

  const handleEditCategory = (category: any) => {
    // setCategoryToEdit({ ...category })
    // setEditDialogOpen(true)
  }

  const saveEditedCategory = () => {
    // if (categoryToEdit) {
    //   setCategories(categories.map((category) => (category.id === categoryToEdit.id ? categoryToEdit : category)))
    //   setEditDialogOpen(false)
    //   setCategoryToEdit(null)
    // }
  }

  const handleAddCategory = () => {
    // const newId = Math.max(...categories.map((c) => c.id)) + 1
    // setCategories([
    //   ...categories,
    //   {
    //     id: newId,
    //     name: newCategory.name,
    //     slug: newCategory.slug || newCategory.name.toLowerCase().replace(/\s+/g, "-"),
    //     postCount: 0,
    //     status: "Active",
    //   },
    // ])
    // setAddDialogOpen(false)
    // setNewCategory({ name: "", slug: "" })
  }

  const generateSlug = (name: string) => {
    // return name.toLowerCase().replace(/\s+/g, "-")
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Category Management</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Manage content categories for your blog.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search categories..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/*<Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>*/}
            {/*  <DialogTrigger asChild>*/}
            {/*    <Button>*/}
            {/*      <Plus className="mr-2 h-4 w-4" />*/}
            {/*      Add Category*/}
            {/*    </Button>*/}
            {/*  </DialogTrigger>*/}
            {/*  <DialogContent>*/}
            {/*    <DialogHeader>*/}
            {/*      <DialogTitle>Add New Category</DialogTitle>*/}
            {/*      <DialogDescription>Create a new category for your content.</DialogDescription>*/}
            {/*    </DialogHeader>*/}
            {/*    <div className="grid gap-4 py-4">*/}
            {/*      <div className="grid grid-cols-4 items-center gap-4">*/}
            {/*        <Label htmlFor="name" className="text-right">*/}
            {/*          Name*/}
            {/*        </Label>*/}
            {/*        <Input*/}
            {/*          id="name"*/}
            {/*          value={newCategory.name}*/}
            {/*          onChange={(e) => {*/}
            {/*            setNewCategory({*/}
            {/*              ...newCategory,*/}
            {/*              name: e.target.value,*/}
            {/*              slug: generateSlug(e.target.value),*/}
            {/*            })*/}
            {/*          }}*/}
            {/*          className="col-span-3"*/}
            {/*        />*/}
            {/*      </div>*/}
            {/*      <div className="grid grid-cols-4 items-center gap-4">*/}
            {/*        <Label htmlFor="slug" className="text-right">*/}
            {/*          Slug*/}
            {/*        </Label>*/}
            {/*        <Input*/}
            {/*          id="slug"*/}
            {/*          value={newCategory.slug}*/}
            {/*          onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}*/}
            {/*          className="col-span-3"*/}
            {/*        />*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*    <DialogFooter>*/}
            {/*      <Button variant="outline" onClick={() => setAddDialogOpen(false)}>*/}
            {/*        Cancel*/}
            {/*      </Button>*/}
            {/*      <Button onClick={handleAddCategory} disabled={!newCategory.name}>*/}
            {/*        Add Category*/}
            {/*      </Button>*/}
            {/*    </DialogFooter>*/}
            {/*  </DialogContent>*/}
            {/*</Dialog>*/}
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Posts</TableHead>
                {/*<TableHead>Status</TableHead>*/}
                {/*<TableHead className="text-right">Actions</TableHead>*/}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.cname}</TableCell>
                    <TableCell>{category.cdesc}</TableCell>
                    <TableCell>{category.postCount}</TableCell>
                    {/*<TableCell>*/}
                    {/*  <Badge variant={category.status === "Active" ? "default" : "secondary"}>{category.status}</Badge>*/}
                    {/*</TableCell>*/}
                    {/*<TableCell className="text-right">*/}
                    {/*  <DropdownMenu>*/}
                    {/*    <DropdownMenuTrigger asChild>*/}
                    {/*      <Button variant="ghost" className="h-8 w-8 p-0">*/}
                    {/*        <span className="sr-only">Open menu</span>*/}
                    {/*        <MoreHorizontal className="h-4 w-4" />*/}
                    {/*      </Button>*/}
                    {/*    </DropdownMenuTrigger>*/}
                    {/*    <DropdownMenuContent align="end">*/}
                    {/*      <DropdownMenuLabel>Actions</DropdownMenuLabel>*/}
                    {/*      <DropdownMenuSeparator />*/}
                    {/*      <DropdownMenuItem onClick={() => handleEditCategory(category)}>*/}
                    {/*        <Edit className="mr-2 h-4 w-4" />*/}
                    {/*        Edit*/}
                    {/*      </DropdownMenuItem>*/}
                    {/*      <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteCategory(category.id)}>*/}
                    {/*        <Trash2 className="mr-2 h-4 w-4" />*/}
                    {/*        Delete*/}
                    {/*      </DropdownMenuItem>*/}
                    {/*    </DropdownMenuContent>*/}
                    {/*  </DropdownMenu>*/}
                    {/*</TableCell>*/}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No categories found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the category. Posts in this category may become
              uncategorized.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Make changes to the category details.</DialogDescription>
          </DialogHeader>
          {categoryToEdit && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={categoryToEdit.name}
                  onChange={(e) => setCategoryToEdit({ ...categoryToEdit, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-slug" className="text-right">
                  Slug
                </Label>
                <Input
                  id="edit-slug"
                  value={categoryToEdit.slug}
                  onChange={(e) => setCategoryToEdit({ ...categoryToEdit, slug: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <select
                  id="edit-status"
                  value={categoryToEdit.status}
                  onChange={(e) => setCategoryToEdit({ ...categoryToEdit, status: e.target.value })}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveEditedCategory}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
