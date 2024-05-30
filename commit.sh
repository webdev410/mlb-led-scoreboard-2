#!/bin/bash

app='[COMMIT_SCRIPT]--------------->'

echo "$app running build script"
# npm run build

echo "$app git add"

read -p "Enter your commit message: " message

git add .
git commit -m "$message"

echo "$app pushing to git repository"
git push

echo "$app script completed successfully"
