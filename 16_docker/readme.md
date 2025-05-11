# Docker Learning Project

This is a simple project created for learning and experimenting with Docker.

---

## 🚀 Getting Started (Without Docker)

To run this project without Docker:

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Start the development server
npm run dev

# OR to build and run production version
npm run build
node dist/index.js
```

---

## 🐳 Running with Docker (Containerized)

To containerize and run the project using Docker:

1. Create a `Dockerfile` in the project root directory.
2. Add Docker instructions similar to the non-containerized setup (refer to the provided `Dockerfile`).
3. Build the Docker image:

```bash
docker build -t my-app .
```

4. Run the Docker container:

```bash
docker run -p 3000:3000 my-app
```

---

## 📝 Notes

* Make sure you have Docker installed and running.
* Prisma and database migrations should be handled inside the container as needed.

This project is purely for experimentation with Docker basics.
