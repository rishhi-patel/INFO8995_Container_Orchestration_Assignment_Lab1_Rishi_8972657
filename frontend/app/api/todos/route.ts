import { type NextRequest, NextResponse } from "next/server"

let todos: Array<{
  id: string
  text: string
  completed: boolean
  createdAt: string
}> = []

// GET /api/todos - Fetch all todos
export async function GET() {
  return NextResponse.json(todos)
}

// POST /api/todos - Create a new todo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text } = body

    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json(
        { error: "Text is required and must be a non-empty string" },
        { status: 400 }
      )
    }

    const newTodo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    }

    todos.unshift(newTodo)

    return NextResponse.json(newTodo, { status: 201 })
  } catch (error) {
    console.error("Error creating todo:", error)
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    )
  }
}

// DELETE /api/todos - Delete all todos
export async function DELETE() {
  try {
    todos = []
    return NextResponse.json({ message: "All todos deleted" })
  } catch (error) {
    console.error("Error deleting todos:", error)
    return NextResponse.json(
      { error: "Failed to delete todos" },
      { status: 500 }
    )
  }
}
