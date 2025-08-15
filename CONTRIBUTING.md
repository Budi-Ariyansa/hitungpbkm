# Contributing to Badminton Cost Calculator

Terima kasih atas minat Anda untuk berkontribusi! 🏸

## 🚀 Quick Start

1. **Fork** repository ini
2. **Clone** fork Anda:
   ```bash
   git clone https://github.com/your-username/badminton-calculator.git
   cd badminton-calculator
   ```
3. **Install** dependencies:
   ```bash
   npm install
   # atau
   yarn install
   ```
4. **Jalankan** development server:
   ```bash
   npm run dev
   # atau
   yarn dev
   ```

## 🛠️ Development Guidelines

### Code Style
- Gunakan TypeScript untuk type safety
- Follow ESLint rules yang sudah dikonfigurasi
- Gunakan Prettier untuk formatting
- Tulis kode yang clean dan readable

### Commit Messages
Gunakan format conventional commits:
- `feat:` untuk fitur baru
- `fix:` untuk bug fixes
- `docs:` untuk dokumentasi
- `style:` untuk perubahan styling
- `refactor:` untuk refactoring
- `test:` untuk testing

Contoh:
```
feat: add export to PDF functionality
fix: resolve calculation rounding issue
docs: update README with new features
```

### Branch Naming
- `feature/feature-name` untuk fitur baru
- `fix/bug-description` untuk bug fixes
- `docs/documentation-update` untuk dokumentasi

## 🎯 Areas for Contribution

### 🆕 New Features
- [ ] Export to PDF
- [ ] Multiple currency support
- [ ] History/saved calculations
- [ ] Dark mode theme
- [ ] Offline support (PWA)
- [ ] Multi-language support

### 🐛 Bug Fixes
- [ ] Mobile responsiveness improvements
- [ ] Calculation edge cases
- [ ] Form validation enhancements

### 📚 Documentation
- [ ] API documentation
- [ ] Component documentation
- [ ] User guide improvements
- [ ] Translation to other languages

### 🎨 UI/UX Improvements
- [ ] Animation enhancements
- [ ] Accessibility improvements
- [ ] Better error messages
- [ ] Loading states

## 📝 Pull Request Process

1. **Create** feature branch dari `main`
2. **Make** your changes
3. **Test** thoroughly:
   ```bash
   npm run build
   npm run lint
   ```
4. **Update** documentation jika diperlukan
5. **Submit** pull request dengan deskripsi yang jelas

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] All calculations work correctly
- [ ] No console errors

## Screenshots (if applicable)
Add screenshots for UI changes
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Form validation works correctly
- [ ] Calculations are accurate
- [ ] Responsive design on different screen sizes
- [ ] Share functionality works
- [ ] Download functionality works
- [ ] All buttons and interactions work

### Test Cases to Cover
1. **Basic Calculation**
   - Input valid court and shuttlecock data
   - Add multiple players
   - Verify cost splitting is correct

2. **Edge Cases**
   - Zero values
   - Very large numbers
   - Decimal values
   - Empty player names

3. **UI/UX**
   - Mobile responsiveness
   - Form validation messages
   - Loading states
   - Error handling

## 🎨 Design Guidelines

### Colors
- Primary: `#0284c7` (blue-600)
- Success: `#22c55e` (green-500)
- Warning: `#f59e0b` (amber-500)
- Error: `#ef4444` (red-500)

### Typography
- Font: System fonts (font-sans)
- Headings: font-bold
- Body: font-normal

### Spacing
- Use Tailwind spacing scale (4, 6, 8, 12, 16, etc.)
- Consistent padding and margins

## 📱 Mobile-First Approach

- Design for mobile first
- Use responsive breakpoints:
  - `sm:` 640px+
  - `md:` 768px+
  - `lg:` 1024px+
  - `xl:` 1280px+

## 🚀 Deployment

Aplikasi ini di-deploy menggunakan Vercel:
- Setiap push ke `main` akan trigger deployment otomatis
- Preview deployments untuk setiap PR
- Environment variables dikelola di Vercel dashboard

## 📞 Getting Help

- **Issues**: Buat GitHub issue untuk bug reports atau feature requests
- **Discussions**: Gunakan GitHub Discussions untuk pertanyaan umum
- **Email**: Kontak maintainer jika ada pertanyaan khusus

## 🏆 Recognition

Contributors akan diakui di:
- README.md
- CHANGELOG.md
- About page (jika ada)

Terima kasih atas kontribusi Anda! 🙏
