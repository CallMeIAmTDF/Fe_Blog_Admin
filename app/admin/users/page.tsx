"use client"

import {useEffect, useState} from "react"
import {Lock, MoreHorizontal, Search, Trash2, Unlock, UserCog} from "lucide-react"

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
import {deletePost, lockUser, useDashboardQuery, useUserQuery} from "@/hooks/useAdminQuery";
import {User, UserListResponse} from "@/types/api";
import {useToast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2025-05-18T10:30:00",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    status: "Active",
    lastLogin: "2025-05-17T14:45:00",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "User",
    status: "Inactive",
    lastLogin: "2025-05-10T09:15:00",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    role: "User",
    status: "Active",
    lastLogin: "2025-05-19T08:20:00",
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael@example.com",
    role: "Editor",
    status: "Active",
    lastLogin: "2025-05-18T16:10:00",
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>()
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const {toast} = useToast()
  const {data, isLoading, error} = useUserQuery()
  const router = useRouter()

  useEffect(() => {
    if (data) {
      setUsers(data.data.result)
    }
  }, [data]);

  useEffect(() => {
    if (error || (!isLoading && !data)) {
      router.push("/login")
    }
  }, [error, router])

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }
  if (error || !users) return <div>Error loading users</div>

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId)
    setUser(users.find(u => u.id === userId) || null)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (userToDelete) {
      setDeleteDialogOpen(false)
      setUserToDelete(null)

      if(!user){
        toast({
          title: "Khóa thất bại",
          description: "Khóa người dùng không thành công",
          variant: "destructive",
          duration: 1500
        })
        return;
      }
      const response = await lockUser(userToDelete, user?.is_locked);
      if (response) {
        setUsers(users.map(user =>
            user.id === userToDelete ? { ...user, is_locked: !user?.is_locked } : user
        ));

        toast({
          title: `${user?.is_locked ? "Mở khóa" : "Khóa"} thành công`,
          description: `${user?.is_locked ? "Mở khóa" : "Khóa"} người dùng thành công`,
          duration: 1500
        })
      }else{
        toast({
          title: `${user?.is_locked ? "Mở khóa" : "Khóa"} thất bại`,
          description: `${user?.is_locked ? "Mở khóa" : "Khóa"} người dùng không thành công`,
          variant: "destructive",
          duration: 1500
        })
      }
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          {/*<CardDescription>Manage user accounts and permissions.</CardDescription>*/}
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/*<Button>*/}
            {/*  <UserCog className="mr-2 h-4 w-4" />*/}
            {/*  Add User*/}
            {/*</Button>*/}
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Date Of Birth</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>

                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{user.dob}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          !user.is_locked ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {user.is_locked ? "Locked" : "Active"}
                      </span>
                    </TableCell>

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
                          {/*<DropdownMenuItem>View details</DropdownMenuItem>*/}
                          {/*<DropdownMenuItem>Edit user</DropdownMenuItem>*/}
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteUser(user.id)}>
                            {!user.is_locked ? "Lock" : "Unlock"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No users found.
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
              This action cannot be undone. This will permanently lock the user account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              {
                !user?.is_locked ? (
                        <>
                          <Lock className="mr-2 h-4 w-4" />
                          Lock
                        </>
                ) : (
                    <>
                      <Unlock className="mr-2 h-4 w-4" />
                      Unlock
                    </>
                )
              }
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
