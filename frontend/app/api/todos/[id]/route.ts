import { type NextRequest, NextResponse } from "next/server"

const todos: Array<{
  id: string
  text: string
  completed: boolean
  createdAt: string
}> = []

// GET /api/todos/[id] - Fetch a specific todo
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const todo = todos.find((t) => t.id === params.id)

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 })
    }

    return NextResponse.json(todo)
  } catch (error) {
    console.error("Error fetching todo:", error)
    return NextResponse.json({ error: "Failed to fetch todo" }, { status: 500 })
  }
}

// PATCH /api/todos/[id] - Update a todo (toggle completion or update text)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const todoIndex = todos.findIndex((t) => t.id === params.id)

    if (todoIndex === -1) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 })
    }

    const body = await request.json().catch(() => ({}))
    const { text, completed } = body

    // Update the todo
    if (text !== undefined) {
      if (typeof text !== "string" || !text.trim()) {
        return NextResponse.json(
          { error: "Text must be a non-empty string" },
          { status: 400 }
        )
      }
      todos[todoIndex].text = text.trim()
    }

    if (completed !== undefined) {
      if (typeof completed !== "boolean") {
        return NextResponse.json(
          { error: "Completed must be a boolean" },
          { status: 400 }
        )
      }
      todos[todoIndex].completed = completed
    }

    // If no body provided, toggle completion
    if (Object.keys(body).length === 0) {
      todos[todoIndex].completed = !todos[todoIndex].completed
    }

    return NextResponse.json(todos[todoIndex])
  } catch (error) {
    console.error("Error updating todo:", error)
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    )
  }
}

// DELETE /api/todos/[id] - Delete a specific todo
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const todoIndex = todos.findIndex((t) => t.id === params.id)

    if (todoIndex === -1) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 })
    }

    const deletedTodo = todos.splice(todoIndex, 1)[0]

    return NextResponse.json({
      message: "Todo deleted successfully",
      todo: deletedTodo,
    })
  } catch (error) {
    console.error("Error deleting todo:", error)
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    )
  }
}
