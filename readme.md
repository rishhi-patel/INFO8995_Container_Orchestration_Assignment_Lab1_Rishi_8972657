# 🐳 Docker Compose Multi-Service Application

**Author:** Rishikumar Patel
**Student ID:** 8972657

---

## 📚 Overview

This project demonstrates a production-ready, multi-container architecture using **Docker Compose**. It showcases the separation of concerns, container orchestration, service dependency management, persistent storage, and horizontal scalability.

- 🔹 `docker-compose.pg.yml` — App with dependencies: PostgreSQL + pgAdmin + Node.js API + React Frontend + Load Balanced via NGINX

---

## 🛠️ Technologies Used

| Technology         | Purpose                                       |
| ------------------ | --------------------------------------------- |
| Docker & Compose   | Containerization & orchestration              |
| PostgreSQL         | Relational database                           |
| pgAdmin            | PostgreSQL Web GUI                            |
| Node.js (Express)  | API backend for todos & users                 |
| React.js           | Frontend UI                                   |
| NGINX              | Reverse proxy, static hosting, load balancing |
| Multi-stage builds | Optimize production images                    |

---

## 📁 Project Structure

```

.
├── backend/ # Node.js Express API with PostgreSQL
├── frontend/ # React app served statically via NGINX
├── nginx/
│ └── default.conf # Reverse proxy + load balancing config
├── docker-compose.pg.yml # PostgreSQL + pgAdmin + API + Frontend
├── README.md # This file

```

---

## 🧠 Key Features

✅ Multi-service setup using Docker Compose
✅ PostgreSQL and MySQL with GUI tools
✅ Health checks and dependency management
✅ Persistent volume mounts for data storage
✅ Scalable backend API (3 replicas)
✅ Reverse proxy using NGINX with API routing
✅ React frontend served statically
✅ No CORS issues (single entry point architecture)
✅ Clean architecture with separation of services

---

## 🧪 How to Run

### 2️⃣ PostgreSQL + pgAdmin + React + Node.js API + NGINX

```bash
docker-compose -f docker-compose.pg.yml up --build --scale backend=3
```

**Access:**

- React App: [http://localhost:3000](http://localhost:3000)
- pgAdmin: [http://localhost:8082](http://localhost:8082)
- PostgreSQL Port: `localhost:5432`
- API via NGINX:

  - `GET /api/user`
  - `POST /api/user`
  - `GET /api/todos`
  - etc.

---

## ⚙️ Port Summary

| Service                  | Port            |
| ------------------------ | --------------- |
| PostgreSQL               | 5432            |
| pgAdmin                  | 8082            |
| NGINX (Frontend + API)   | 3000            |
| Node API (for dev/debug) | 5000 (optional) |

---

## 📦 Docker Highlights

- **Volumes**:

  - `pg_data`: Persistent PostgreSQL storage
  - MySQL also uses Docker volume for persistence

- **Networking**:

  - Services communicate via Compose-defined bridge network
  - NGINX acts as central gateway to all backend services

- **Scaling**:

  - Express backend scaled to 3 replicas using:

    ```bash
    docker-compose -f docker-compose.pg.yml up --scale backend=3
    ```

- **Nginx Load Balancing**:

  - Forwards `/api/*` requests to multiple backend containers
  - Serves frontend build from `/usr/share/nginx/html`

---

## ✅ API Endpoints

### User API

- `GET /api/user`
- `POST /api/user`
- `GET /api/user/:id`
- `PUT /api/user/:id`
- `DELETE /api/user/:id`

### Todo API

- `GET /api/todos`
- `POST /api/todos`
- `DELETE /api/todos/:id`

All responses are returned as JSON.

---

## ✅ Compose File Summary

| File                    | Purpose                                       |
| ----------------------- | --------------------------------------------- |
| `docker-compose.pg.yml` | PostgreSQL + pgAdmin + API + Frontend + NGINX |

---

## 📸 Sample Screenshots

> ![image](https://github.com/user-attachments/assets/c79e5eeb-bccc-4791-bb39-f5b8829d91c3)

> ![image](https://github.com/user-attachments/assets/daf14677-94da-44c0-87c2-7ba9f1f5612d)

> ![image](https://github.com/user-attachments/assets/f241753e-7ac0-429f-8ea9-f45074bb051c)



---

## 👨‍💻 Author

**Rishikumar Patel**
Student ID: **8972657**

---

## 📌 Notes

- Make sure Docker is installed and running on your system.
- If ports are busy, update the exposed ports in the `docker-compose` files.
- Use `.env` files if needed to manage secrets in production.
