# Docker Compose Multi-Service Project

**Student:** Rishiikumar Patel
**Student ID:** 8972657

---

## 📚 Overview

This project demonstrates a multi-service architecture using **Docker Compose**, following best practices in containerization, scaling, and persistent data storage.

The project is organized into two Compose files to align with assignment sections:

✅ **Multiple Services** → MySQL + PHPMyAdmin
✅ **Application with Dependencies** → PostgreSQL + pgAdmin + ReactJS + NodeJS API (with scaling + load balancing)

---

## 🛠️ Services Overview

---

### `docker-compose.mysql.yml`

- ✅ **MySQL** database (port **3306**)
- ✅ **PHPMyAdmin** GUI (port **8081**)
- ✅ Credentials managed via environment variables
- ✅ Persistent data storage using Docker volumes

---

### `docker-compose.pg.yml`

- ✅ **PostgreSQL** database (port **5432**)
- ✅ **pgAdmin4** GUI (port **8082**)
- ✅ pgAdmin starts only after PostgreSQL is healthy (using `depends_on` + healthcheck)

- ✅ **ReactJS (Next.js)** frontend
- ✅ **NodeJS (Express)** backend API
- ✅ Multi-stage builds for both React and NodeJS
- ✅ Backend API **scaled to 3 replicas**
- ✅ Nginx **load balances** across API replicas
- ✅ Nginx serves React static build — **single entry point** → no CORS issues

---

## 🚀 How to Run Services

---

### 1️⃣ MySQL + PHPMyAdmin

```bash
docker-compose -f docker-compose.mysql.yml up --build
```

Access:

- PHPMyAdmin → [http://localhost:8081](http://localhost:8081)
- MySQL database → `localhost:3306`

---

### 2️⃣ PostgreSQL + pgAdmin + React + NodeJS API

```bash
docker-compose -f docker-compose.pg.yml up --build
```

Access:

- React app → [http://localhost:3000](http://localhost:3000)
- pgAdmin → [http://localhost:8082](http://localhost:8082)
- PostgreSQL database → `localhost:5432`
- API → `/todos` (load balanced through Nginx)

---

## ⚙️ Ports Summary

| Service       | Port                                            |
| ------------- | ----------------------------------------------- |
| MySQL         | 3306                                            |
| PHPMyAdmin    | 8081                                            |
| PostgreSQL    | 5432                                            |
| pgAdmin4      | 8082                                            |
| React + Nginx | 3000                                            |
| NodeJS API    | Load balanced internally (not exposed directly) |

---

## ✅ Key Features Demonstrated

✅ Multiple services in Compose
✅ Environment variables for DB credentials
✅ Persistent storage with volumes
✅ Application dependencies and health checks
✅ Multi-stage builds for React and NodeJS
✅ Scaling and load balancing with Nginx upstream config
✅ Clean architecture → Nginx as single entry point → no CORS issues
✅ Organized Compose files → aligned with assignment sections

---

## 🧭 Compose Files Summary

| Compose File               | Purpose                                                                                            |
| -------------------------- | -------------------------------------------------------------------------------------------------- |
| `docker-compose.mysql.yml` | MySQL + PHPMyAdmin (**Multiple Services**)                                                         |
| `docker-compose.pg.yml`    | PostgreSQL + pgAdmin + React + API (**Dependencies, Scaling, Load balancing, Multi-stage builds**) |

---

## 📁 Repository Structure

```
/
├── backend/            # NodeJS API (multi-stage Dockerfile)
├── frontend/           # ReactJS app (multi-stage Dockerfile)
├── nginx/default.conf  # Nginx reverse-proxy config
├── docker-compose.mysql.yml  # MySQL + PHPMyAdmin
├── docker-compose.pg.yml     # PostgreSQL + pgAdmin + React + API
└── README.md           # Project documentation (this file)
```

---

## 📝 Screenshots to Include

- `docker-compose -f docker-compose.mysql.yml up --build` running
- `docker-compose -f docker-compose.pg.yml up --build` running
- PHPMyAdmin in browser (`http://localhost:8081`)
- pgAdmin in browser (`http://localhost:8082`)
- React app in browser (`http://localhost:3000`)
- Network tab showing `/todos` request working
- Backend replicas load balancing → show logs cycling between replicas
- CLI output showing healthy containers

---

## 🧑 Author

**Rishiikumar Patel**
Student ID: **8972657**
