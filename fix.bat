rmdir /s /q app
"C:\Program Files\Git\cmd\git.exe" add -u
"C:\Program Files\Git\cmd\git.exe" commit -m "Fix Vercel 404 by removing duplicate app folder"
"C:\Program Files\Git\cmd\git.exe" push origin main
