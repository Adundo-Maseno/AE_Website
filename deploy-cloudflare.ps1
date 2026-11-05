# Cloudflare Deployment Script for Agri Experience Website
# Uses official Cloudflare OpenNext adapter for full Next.js 16 App Router support

Write-Host "=============================================" -ForegroundColor Green
Write-Host "   Cloudflare Deployment - Agri Experience   " -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

# 1. Check Wrangler CLI authentication
Write-Host "`n[1/3] Checking Cloudflare Wrangler CLI..." -ForegroundColor Cyan
npx wrangler whoami

if ($LASTEXITCODE -ne 0) {
    Write-Host "`nNot logged in to Cloudflare. Opening login..." -ForegroundColor Yellow
    npx wrangler login
}

# 2. Build Next.js application for Cloudflare OpenNext
Write-Host "`n[2/3] Building with @opennextjs/cloudflare..." -ForegroundColor Cyan
npx @opennextjs/cloudflare build

if ($LASTEXITCODE -ne 0) {
    Write-Host "`nBuild failed. Please verify errors above." -ForegroundColor Red
    exit 1
}

# 3. Deploy to Cloudflare
Write-Host "`n[3/3] Deploying to Cloudflare..." -ForegroundColor Cyan
npx @opennextjs/cloudflare deploy

Write-Host "`nDeployment completed successfully!" -ForegroundColor Green

