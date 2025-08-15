# 🚀 Panduan Deployment ke Vercel

## Metode 1: Deployment Otomatis via GitHub (Recommended)

### 1. Push ke GitHub Repository

```bash
# Initialize git repository (jika belum)
git init

# Add semua file
git add .

# Commit pertama
git commit -m "Initial commit: Badminton Calculator App"

# Add remote repository (ganti dengan URL repository Anda)
git remote add origin https://github.com/username/badminton-calculator.git

# Push ke GitHub
git push -u origin main
```

### 2. Deploy via Vercel Dashboard

1. Buka [vercel.com](https://vercel.com)
2. Login dengan akun GitHub
3. Klik "New Project"
4. Import repository `badminton-calculator`
5. Konfigurasi project:
   - **Framework Preset**: Next.js
   - **Build Command**: `yarn build` (otomatis terdeteksi)
   - **Output Directory**: `.next` (otomatis terdeteksi)
   - **Install Command**: `yarn install` (otomatis terdeteksi)
6. Klik "Deploy"

### 3. Konfigurasi Domain (Opsional)

Setelah deployment berhasil:
1. Buka project di Vercel dashboard
2. Go to Settings > Domains
3. Add custom domain jika diperlukan

---

## Metode 2: Deployment Manual via Vercel CLI

### 1. Install Vercel CLI

```bash
npm i -g vercel
```

### 2. Login ke Vercel

```bash
vercel login
```

### 3. Deploy Project

```bash
# Dari root directory project
vercel

# Atau untuk production deployment
vercel --prod
```

### 4. Follow Interactive Prompts

```
? Set up and deploy "~/badminton-calculator"? [Y/n] y
? Which scope do you want to deploy to? [Your Account]
? Link to existing project? [y/N] n
? What's your project's name? badminton-calculator
? In which directory is your code located? ./
? Want to override the settings? [y/N] n
```

---

## Environment Variables (Jika Diperlukan)

Jika aplikasi memerlukan environment variables:

### Via Vercel Dashboard:
1. Project Settings > Environment Variables
2. Add variables yang diperlukan

### Via Vercel CLI:
```bash
vercel env add VARIABLE_NAME
```

---

## Custom Domain Setup

### 1. Via Vercel Dashboard:
1. Project Settings > Domains
2. Add domain
3. Configure DNS records sesuai instruksi

### 2. Via Vercel CLI:
```bash
vercel domains add yourdomain.com
```

---

## Build Configuration

File `vercel.json` sudah dikonfigurasi dengan:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```

---

## Monitoring & Analytics

Setelah deployment:
1. **Analytics**: Vercel menyediakan analytics built-in
2. **Performance**: Monitor Core Web Vitals
3. **Logs**: Akses function logs via dashboard

---

## Troubleshooting

### Build Errors:
- Pastikan semua dependencies terinstall
- Check TypeScript errors
- Verify environment variables

### Runtime Errors:
- Check function logs di Vercel dashboard
- Verify API routes (jika ada)
- Check browser console untuk client-side errors

### Performance Issues:
- Optimize images dengan Next.js Image component
- Enable compression
- Use CDN untuk static assets

---

## Post-Deployment Checklist

- [ ] Test semua fitur aplikasi
- [ ] Verify responsive design di berbagai device
- [ ] Test share functionality
- [ ] Test download functionality
- [ ] Check performance dengan Lighthouse
- [ ] Setup monitoring/analytics
- [ ] Configure custom domain (opsional)

---

## Automatic Deployments

Setelah setup GitHub integration:
- Setiap push ke `main` branch akan trigger deployment otomatis
- Preview deployments untuk pull requests
- Rollback mudah via Vercel dashboard

---

**🎉 Selamat! Aplikasi Kalkulator Biaya Badminton siap digunakan!**
