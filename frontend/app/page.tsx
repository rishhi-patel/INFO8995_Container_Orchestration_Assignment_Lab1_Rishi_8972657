"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, CheckCircle2, Circle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Todo {
  id: string
  title: string
  completed: boolean
  createdAt: string
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await fetch("/todos")
      if (response.ok) {
        const data = await response.json()
        setTodos(data)
      }
    } catch (error) {
      console.error("Failed to fetch todos:", error)
      toast({
        title: "Error",
        description: "Failed to fetch todos",
        variant: "destructive",
      })
    }
  }

  const addTodo = async () => {
    if (!newTodo.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTodo.trim() }),
      })

      if (response.ok) {
        const todo = await response.json()
        setTodos((prev) => [todo, ...prev])
        setNewTodo("")
        toast({
          title: "Success",
          description: "Todo added successfully",
        })
      } else {
        throw new Error("Failed to add todo")
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to add todo"
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/todos/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setTodos((prev) => prev.filter((todo) => todo.id !== id))
        toast({
          title: "Success",
          description: "Todo deleted successfully",
        })
      } else {
        throw new Error("Failed to delete todo")
      }
    } catch (error) {
      console.error("Failed to delete todo:", error)
      toast({
        title: "Error",
        description: "Failed to delete todo",
        variant: "destructive",
      })
    }
  }

  const completedCount = todos.filter((todo) => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800">
              Todo Application
            </CardTitle>
            <p className="text-gray-600">
              {completedCount} of {totalCount} tasks completed
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add Todo Form */}
            <div className="flex gap-2">
              <Input
                placeholder="Add a new todo..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addTodo()
                  }
                }}
                className="flex-1"
              />
              <Button
                onClick={addTodo}
                disabled={loading || !newTodo.trim()}
                className="px-6"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>

            {/* Todo List */}
            <div className="space-y-2">
              {todos.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Circle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No todos yet. Add one above to get started!</p>
                </div>
              ) : (
                todos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`flex items-center gap-3 p-4 rounded-lg border transition-all hover:shadow-md ${
                      todo.completed
                        ? "bg-gray-50 border-gray-200"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <span
                      className={`flex-1 ${
                        todo.completed
                          ? "line-through text-gray-500"
                          : "text-gray-800"
                      }`}
                    >
                      {todo.title}
                    </span>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>

            {/* Stats */}
            {todos.length > 0 && (
              <div className="flex justify-between text-sm text-gray-600 pt-4 border-t">
                <span>Total: {totalCount}</span>
                <span>Completed: {completedCount}</span>
                <span>Remaining: {totalCount - completedCount}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
