# Deployment Guidelines

This document outlines the steps required to set up the deployment workflow for your project.

## Overview

The deployment process is automated using GitHub Actions and SSH. On every push to the `main` branch, the workflow:
1. Connects to the server via SSH.
2. Pulls the latest code from the repository.
3. Ensures the correct Node.js version is used.
4. Installs necessary dependencies.
5. Builds the project.
6. Restarts the application using PM2.

## Required Secrets

You need to set the following secrets in GitHub Actions:

- `UAT_SSH_HOST`: The server's SSH hostname or IP address.
- `UAT_SSH_USERNAME`: The username for SSH authentication.
- `UAT_SSH_PRIVATE_KEY`: The private SSH key for authentication.
- `UAT_SSH_BUILD_DIRECTORY`: The directory on the server where the project is deployed.

## Setting Up Deployment for Your Project

If you're modifying this workflow for a different project, update the following:

1. **Modify Secrets:**
   - Add the required secrets in your GitHub repository under **Settings > Secrets and variables > Actions**.
   - Replace values with those corresponding to your new server setup.

2. **Update Repository Branch (if needed):**
   - Modify `branches: [main]` in `.github/workflows/deploy.yml` to match your preferred deployment branch.

3. **Ensure Node.js Compatibility:**
   - The workflow uses `nvm use 22 || nvm install 22` to set up Node.js.
   - If your project requires a different version, update this in `deploy.yml`.

4. **Update Deployment Directory:**
   - Change `UAT_SSH_BUILD_DIRECTORY` in the secrets to match your project's deployment path.

5. **Configure PM2 (if necessary):**
   - Ensure `pm2` is installed on the server (`npm install -g pm2`).
   - Modify `pm2 restart all` if you need to restart a specific process (`pm2 restart your-app-name`).

## Manual Deployment (if needed)

In case of issues with GitHub Actions, you can manually deploy your project with:

```sh
ssh -i your_private_key username@your_server_ip
cd /path/to/your/project
git pull origin main
export NVM_DIR=~/.nvm
source ~/.nvm/nvm.sh
nvm use 22 || nvm install 22
npm install
npm run build
pm2 restart all
```

This ensures your project is deployed and restarted properly.
