#!/bin/bash
set -e

echo "Navigating to build directory: $PROD_SSH_BUILD_DIRECTORY"
cd "$PROD_SSH_BUILD_DIRECTORY" || exit 1
echo "Current directory: $(pwd)"

echo "Pulling latest code from 'prod' branch..."
git fetch origin
git checkout -f prod
git pull origin prod

echo "Setting up Node.js..."
export NVM_DIR=~/.nvm
source ~/.nvm/nvm.sh
nvm use 22 || nvm install 22

echo "Cleaning cache..."
npm cache clean --force

echo "Installing dependencies..."
npm install

echo "Building project..."
npm run build

echo "Restarting PM2 process..."
pm2 restart nextjs-init

echo "✅ Deployment completed."