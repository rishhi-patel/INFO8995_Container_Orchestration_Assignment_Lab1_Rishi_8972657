"use client"

import type React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { Plus, Edit, Trash2, Eye, UserIcon, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

interface User {
  id: number
  first_name: string
  last_name: string
  email?: string
  created_at?: string
  updated_at?: string
}

export default function UserDashboard() {
  // Initialize users as empty array to prevent map error
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Form states
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [showUserDetails, setShowUserDetails] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  // Form data
  const [newUser, setNewUser] = useState({ first_name: "", last_name: "" })
  const [editUser, setEditUser] = useState({ first_name: "", last_name: "" })

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get("/user")

      // Ensure response data is an array
      const userData = response.data
      if (Array.isArray(userData)) {
        setUsers(userData)
      } else {
        // Handle case where API returns object with users array
        setUsers(userData.users || userData.data || [])
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch users")
      setUsers([]) // Ensure users remains an array on error
    } finally {
      setLoading(false)
    }
  }

  // Fetch single user details
  const fetchUserDetails = async (id: number) => {
    try {
      setActionLoading(`details-${id}`)
      const response = await axios.get(`/user/${id}`)
      setSelectedUser(response.data)
      setShowUserDetails(true)
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch user details")
    } finally {
      setActionLoading(null)
    }
  }

  // Add new user
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setActionLoading("add")
      await axios.post("/user", newUser)
      setNewUser({ first_name: "", last_name: "" })
      setShowAddForm(false)
      fetchUsers()
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add user")
    } finally {
      setActionLoading(null)
    }
  }

  // Edit user
  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingUser) return

    try {
      setActionLoading("edit")
      await axios.put(`/user/${editingUser.id}`, editUser)
      setShowEditForm(false)
      setEditingUser(null)
      fetchUsers()
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update user")
    } finally {
      setActionLoading(null)
    }
  }

  // Delete user
  const handleDeleteUser = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return

    try {
      setActionLoading(`delete-${id}`)
      await axios.delete(`/user/${id}`)
      fetchUsers()
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete user")
    } finally {
      setActionLoading(null)
    }
  }

  // Open edit form
  const openEditForm = (user: User) => {
    setEditingUser(user)
    setEditUser({ first_name: user.first_name, last_name: user.last_name })
    setShowEditForm(true)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600 mt-1">Manage your users efficiently</p>
            </div>
            <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>Create a new user by filling out the form below.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddUser} className="space-y-4">
                  <div>
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      value={newUser.first_name}
                      onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      value={newUser.last_name}
                      onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={actionLoading === "add"}>
                      {actionLoading === "add" && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                      Add User
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
            <Button variant="outline" size="sm" className="ml-auto" onClick={() => setError(null)}>
              Dismiss
            </Button>
          </Alert>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            <span className="ml-2 text-gray-500">Loading users...</span>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-gray-600">Total Users:</span>
                    <Badge variant="secondary">{Array.isArray(users) ? users.length : 0}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Users Grid */}
            {!Array.isArray(users) || users.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <UserIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                  <p className="text-gray-500 mb-4">Get started by adding your first user.</p>
                  <Button onClick={() => setShowAddForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {users.map((user) => (
                  <Card key={user.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <UserIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg truncate">
                            {user.first_name} {user.last_name}
                          </CardTitle>
                          <CardDescription>ID: {user.id}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => fetchUserDetails(user.id)}
                          disabled={actionLoading === `details-${user.id}`}
                        >
                          {actionLoading === `details-${user.id}` ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Eye className="h-3 w-3" />
                          )}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => openEditForm(user)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={actionLoading === `delete-${user.id}`}
                        >
                          {actionLoading === `delete-${user.id}` ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Trash2 className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {/* Edit User Dialog */}
        <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>Update the user information below.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditUser} className="space-y-4">
              <div>
                <Label htmlFor="edit_first_name">First Name</Label>
                <Input
                  id="edit_first_name"
                  value={editUser.first_name}
                  onChange={(e) => setEditUser({ ...editUser, first_name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit_last_name">Last Name</Label>
                <Input
                  id="edit_last_name"
                  value={editUser.last_name}
                  onChange={(e) => setEditUser({ ...editUser, last_name: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowEditForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={actionLoading === "edit"}>
                  {actionLoading === "edit" && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Update User
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* User Details Dialog */}
        <Dialog open={showUserDetails} onOpenChange={setShowUserDetails}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>Complete information for the selected user.</DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <UserIcon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {selectedUser.first_name} {selectedUser.last_name}
                    </h3>
                    <p className="text-gray-500">User ID: {selectedUser.id}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">First Name</Label>
                    <p className="mt-1">{selectedUser.first_name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Last Name</Label>
                    <p className="mt-1">{selectedUser.last_name}</p>
                  </div>
                  {selectedUser.email && (
                    <div className="col-span-2">
                      <Label className="text-sm font-medium text-gray-500">Email</Label>
                      <p className="mt-1">{selectedUser.email}</p>
                    </div>
                  )}
                  {selectedUser.created_at && (
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Created</Label>
                      <p className="mt-1">{new Date(selectedUser.created_at).toLocaleDateString()}</p>
                    </div>
                  )}
                  {selectedUser.updated_at && (
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Updated</Label>
                      <p className="mt-1">{new Date(selectedUser.updated_at).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => openEditForm(selectedUser)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit User
                  </Button>
                  <Button variant="outline" onClick={() => setShowUserDetails(false)}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
