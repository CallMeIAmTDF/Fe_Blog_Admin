"use client"

import {useEffect, useState} from "react"
import { Eye, MoreHorizontal, Search, Trash2 } from "lucide-react"

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
import { Badge } from "@/components/ui/badge"
import {deletePost, usePostQuery} from "@/hooks/useAdminQuery";
import {BlogPost} from "@/types/api";
import { useToast } from "@/hooks/use-toast";
import HtmlPreviewModal from "@/app/admin/posts/components/PostDetailModal";


export default function PostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>()
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<string | null>(null)
  const {data, isLoading, error} = usePostQuery()
  const [previewHtml, setPreviewHtml] = useState<string | null>(null)
  const {toast} = useToast()

  useEffect(() => {
    if (data) {
      // setPosts(data.data.content)

      const filteredPosts = data.data.content?.filter((post: BlogPost) => post.id !== "")
      setPosts(filteredPosts)
    }
  }, [data]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }
  if (error || !posts) return <div>Error loading dashboard</div>

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.userResponse.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeletePost = (postId: string) => {
    setPostToDelete(postId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (postToDelete) {
      setDeleteDialogOpen(false)
      setPostToDelete(null)

      const response = await deletePost(postToDelete);
      if (response) {
        setPosts(posts.filter((post) => post.id !== postToDelete));
        toast({
          title: "Xóa thành công",
          description: "Xóa bài viết thành công",
          duration: 1500
        })
      }else{
        toast({
          title: "Xóa thất bại",
          description: "Xóa bài viết không thành công",
          variant: "destructive",
          duration: 1500
        })
      }
    }
  }

  const getStatusBadge = (sensitive: boolean) => {
    if (sensitive) {
      return <Badge variant="destructive">Sensitive</Badge>
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Post Management</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Posts</CardTitle>
          <CardDescription>Manage blog posts and content.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search posts..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Sensitive Content</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Views</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{post.category}</TableCell>
                    <TableCell>{post.userResponse.name}</TableCell>
                    <TableCell>{getStatusBadge(post.hasSensitiveContent)}</TableCell>
                    <TableCell>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "—"}</TableCell>
                    <TableCell>{post.viewsCount.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setPreviewHtml(post.content)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeletePost(post.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No posts found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {previewHtml && (
          <HtmlPreviewModal
              htmlContent={previewHtml}
              triggerText=""
          />
      )}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the post and remove it from our servers.
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
    </div>
  )
}
