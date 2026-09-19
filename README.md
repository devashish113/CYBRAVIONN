# CYBRAVION Solutions - 3D Web Application & CI/CD Deployment

Modern 3D Cyber Security Web Platform built with React, Vite, Three.js, Lucide Icons, and containerized with Docker and Jenkins CI/CD.

---

## 📁 Deployment & Infrastructure Files

| File | Purpose |
|------|---------|
| [`Dockerfile`](./Dockerfile) | Multi-stage production build (`node:22-alpine` builder with 1.5GB heap + `nginx:alpine-slim` runtime). |
| [`Jenkinsfile`](./Jenkinsfile) | Declarative Jenkins CI/CD pipeline (Checkout $\rightarrow$ Build Docker $\rightarrow$ Rollout $\rightarrow$ Health Check $\rightarrow$ Image Prune). |
| [`docker-compose.yml`](./docker-compose.yml) | Local/standalone production container runner (`cybravion-web` on port 3000). |
| [`.dockerignore`](./.dockerignore) | Prevents local `node_modules`, `.git`, and `.env` from bloating build context. |
| [`nginx.conf`](./nginx.conf) | Internal container Nginx configuration with gzip compression and SPA routing. |
| [`server_cybravion.conf`](./server_cybravion.conf) | Host Nginx reverse proxy configuration for multi-domain routing & WebSockets. |
| [`server_jenkins_compose.yml`](./server_jenkins_compose.yml) | Server Docker Compose config for running `jenkins-ci` with Docker-in-Docker socket and JVM options. |

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```

---

## 🐳 Docker Production Build (Manual)

```bash
# Build the container
docker build -t cybravion-web:latest .

# Run container on port 3000
docker run -d --name cybravion-web -p 3000:80 --restart unless-stopped cybravion-web:latest
```

---

## ⚙️ Jenkins CI/CD Pipeline

- **Jenkins UI:** `http://40.192.90.82:8080/`
- **Job Name:** `cybravion-pipeline`
- **Username / Password:** `Devashish` / `Devashish`

### Pipeline Flow:
1. **Checkout:** Pulls latest commits from Git repository.
2. **Build Docker Image:** Builds cached multi-stage Docker container.
3. **Deploy Container:** Zero-downtime rolling restart of container on `127.0.0.1:3000`.
4. **Health Check:** Validates container HTTP 200 response.
5. **Post Clean:** Reclaims dangling Docker build images.

---

## 🌐 Multi-Domain & HTTPS (Let's Encrypt SSL)

When pointing a domain (e.g. `cybravions.online`) to server IP `40.192.90.82`:

```bash
# Obtain and auto-configure free SSL certificate
sudo certbot --nginx -d cybravions.online -d www.cybravions.online
```
