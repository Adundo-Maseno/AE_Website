#!/bin/bash
# Cloudflare Deployment Script for Agri Experience Website
# Uses official Cloudflare OpenNext adapter for full Next.js 16 App Router support

set -e

echo "============================================="
echo "   Cloudflare Deployment - Agri Experience   "
echo "============================================="

echo -e "\n[1/3] Checking Cloudflare Wrangler CLI..."
if ! npx wrangler whoami > /dev/null 2>&1; then
  echo "Not logged in to Cloudflare. Opening login..."
  npx wrangler login
fi

echo -e "\n[2/3] Building with @opennextjs/cloudflare..."
npx @opennextjs/cloudflare build

echo -e "\n[3/3] Deploying to Cloudflare..."
npx @opennextjs/cloudflare deploy

echo -e "\nDeployment completed successfully!"

