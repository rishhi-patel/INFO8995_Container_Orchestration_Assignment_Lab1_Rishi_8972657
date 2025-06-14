const db = require("../config/db")

exports.createUser = async (req, res) => {
  const { first_name, last_name } = req.body

  if (!first_name || !last_name) {
    return res
      .status(400)
      .json({ success: false, message: "First and Last Name are required" })
  }

  try {
    const result = await db.query(
      `INSERT INTO users (first_name, last_name) VALUES ($1, $2) RETURNING *`,
      [first_name, last_name]
    )
    res.status(201).json({ success: true, user: result.rows[0] })
  } catch (err) {
    console.error("Error creating user:", err.message)
    res.status(500).json({ success: false, message: "Failed to create user" })
  }
}

exports.getUser = async (req, res) => {
  const { id } = req.params

  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" })
    }
    res.status(200).json({ success: true, user: result.rows[0] })
  } catch (err) {
    console.error("Error fetching user:", err.message)
    res.status(500).json({ success: false, message: "Failed to fetch user" })
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users ORDER BY id ASC")
    res.status(200).json({ success: true, users: result.rows })
  } catch (err) {
    console.error("Error fetching users:", err.message)
    res.status(500).json({ success: false, message: "Failed to fetch users" })
  }
}

exports.updateUser = async (req, res) => {
  const { id } = req.params
  const { first_name, last_name } = req.body

  if (!first_name || !last_name) {
    return res
      .status(400)
      .json({ success: false, message: "First and Last Name are required" })
  }

  try {
    const result = await db.query(
      `UPDATE users SET first_name = $1, last_name = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *`,
      [first_name, last_name, id]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    res.status(200).json({ success: true, user: result.rows[0] })
  } catch (err) {
    console.error("Error updating user:", err.message)
    res.status(500).json({ success: false, message: "Failed to update user" })
  }
}

exports.deleteUser = async (req, res) => {
  const { id } = req.params

  try {
    const result = await db.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    res
      .status(200)
      .json({ success: true, message: "User deleted", user: result.rows[0] })
  } catch (err) {
    console.error("Error deleting user:", err.message)
    res.status(500).json({ success: false, message: "Failed to delete user" })
  }
}
