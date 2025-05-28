const db = require("../config/db")

exports.getAllTodos = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM todos")
    res.status(200).json(result.rows)
  } catch (error) {
    console.error("Error fetching todos:", error.message)
    res.status(500).json({ error: "Failed to fetch todos" })
  }
}

exports.createTodo = async (req, res) => {
  const { title } = req.body

  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "Invalid title provided" })
  }

  try {
    const result = await db.query(
      "INSERT INTO todos (title) VALUES ($1) RETURNING *",
      [title]
    )
    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error("Error creating todo:", error.message)
    res.status(500).json({ error: "Failed to create todo" })
  }
}

exports.deleteTodo = async (req, res) => {
  const { id } = req.params

  try {
    const result = await db.query(
      "DELETE FROM todos WHERE id = $1 RETURNING *",
      [id]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" })
    }

    res.json({ message: "Todo deleted", todo: result.rows[0] })
  } catch (error) {
    console.error("Error deleting todo:", error.message)
    res.status(500).json({ error: "Failed to delete todo" })
  }
}
