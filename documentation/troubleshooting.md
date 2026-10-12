# Troubleshooting

Common setup, runtime, and development issues and their solutions.

## 1. PowerShell Script Execution Policy Error
- **Error:** `File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.`
- **Cause:** Windows PowerShell policy restricts running scripts.
- **Solution:** Run PowerShell with bypassed execution policy:
  ```powershell
  Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
  ```
  Or run npm via CMD:
  ```cmd
  cmd.exe /c "npm install"
  ```

## 2. Prisma Schema Not Found
- **Error:** `Error: Could not find Prisma Schema that is required for this command.`
- **Cause:** Running Prisma commands without specifying the relative schema path.
- **Solution:** Always pass the schema path argument:
  ```bash
  npx prisma db push --schema=./database/prisma/schema.prisma
  ```

## 3. Port Already in Use (EADDRINUSE)
- **Error:** `Error: listen EADDRINUSE: address already in use :::3000`
- **Cause:** Another process or previous server instance is already running on port 3000.
- **Solution:** Change the `PORT` in `backend/.env` (e.g. `PORT=4000`), or terminate the process holding the port:
  ```powershell
  # Find and kill process on port 3000
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  ```

## 4. Contact Form Network Error / Failed to Fetch
- **Error:** `Network error. Please try again later.` or `Failed to fetch`.
- **Cause:** The backend server is not running or CORS is blocking the request.
- **Solution:**
  1. Start the server with `npm run dev`.
  2. Verify the server is live by visiting [http://localhost:3000/api/health](http://localhost:3000/api/health).
  3. Ensure `FRONTEND_ORIGIN` in `backend/.env` matches your browser address.

## 5. Input Too Long Error
- **Error:** `Input too long`
- **Cause:** Input exceeds bounds (Name > 100, Email > 150, or Message > 2,000 characters).
- **Solution:** Reduce message length to comply with server validation limits.

## 6. Database Dev.db Missing or Locked
- **Error:** `PrismaClientKnownRequestError: The table ContactMessage does not exist`
- **Cause:** The local SQLite database has not been initialized.
- **Solution:** Run the schema sync command:
  ```bash
  npx prisma db push --schema=./database/prisma/schema.prisma
  ```
