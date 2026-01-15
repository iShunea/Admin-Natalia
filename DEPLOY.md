# Deploy Instructions for Vercel

## Prerequisites
- Vercel account (sign up at https://vercel.com)
- Git repository pushed to GitHub

## Environment Variables

Before deploying, make sure to set these environment variables in Vercel dashboard:

### Required
```
VITE_APP_BASE_NAME=/
VITE_APP_API_URL=https://backend-cristalex-dent.onrender.com/
```

### Optional
```
VITE_APP_VERSION=v9.2.1
VITE_APP_GOOGLE_MAPS_API_KEY=your_key_here
VITE_APP_MAPBOX_ACCESS_TOKEN=your_token_here
```

## Deploy Steps

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. For production:
```bash
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your GitHub repository: `iShunea/admin-cristalex`
3. Configure project:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. Add environment variables in Settings → Environment Variables
5. Click "Deploy"

## Post-Deploy

After deployment, your admin panel will be available at:
- Production: `https://your-project.vercel.app`
- Custom domain: Configure in Vercel dashboard under Domains

## Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches and pull requests

## Build Configuration

The project uses:
- Build command: `npm run build`
- Output directory: `dist`
- Node version: 18.x (automatically detected)

## Notes

- The `.env` file is NOT committed to git for security
- Set all environment variables in Vercel dashboard
- Backend API URL is configured to point to production: `https://backend-cristalex-dent.onrender.com/`
