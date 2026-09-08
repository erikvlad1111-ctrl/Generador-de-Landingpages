"C:\Program Files\Git\cmd\git.exe" config --global user.email "jeanlucalapadula75@gmail.com"
"C:\Program Files\Git\cmd\git.exe" config --global user.name "jeanlucalapadula75"
"C:\Program Files\Git\cmd\git.exe" checkout --orphan temp_branch
"C:\Program Files\Git\cmd\git.exe" add -A
"C:\Program Files\Git\cmd\git.exe" commit -m "Demo interactiva del Dashboard (Fix)"
"C:\Program Files\Git\cmd\git.exe" branch -D main
"C:\Program Files\Git\cmd\git.exe" branch -m main
"C:\Program Files\Git\cmd\git.exe" push -f origin main
