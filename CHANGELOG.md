# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2024-08-15

### 📱 Enhanced Mobile Responsiveness
- 🎨 **Improved Typography**: Responsive font sizes for better mobile readability
- 📏 **Optimized Spacing**: Reduced padding and margins for mobile screens
- 🔘 **Better Buttons**: Smaller, more touch-friendly buttons on mobile
- 📋 **Compact Forms**: Streamlined form layouts with better mobile UX
- 🖼️ **Responsive Images**: Properly sized logos and images for all screen sizes
- 📱 **Mobile-First Design**: Optimized for mobile with desktop enhancements

### 🎯 Mobile Improvements
- **Header**: Flexible layout that stacks on mobile, side-by-side on desktop
- **Mode Selector**: Compact design with abbreviated text on mobile
- **Feature Cards**: Smaller icons and text, better spacing
- **Forms**: Reduced padding, smaller inputs, better label sizing
- **Results**: Compact display with responsive grids
- **Buttons**: Full-width on mobile, auto-width on desktop

### 🔧 Technical Enhancements
- Added mobile-specific CSS classes for consistent responsive behavior
- Implemented responsive typography scale (xs/sm/md/lg)
- Enhanced touch targets for better mobile interaction
- Optimized container padding and margins for mobile screens

## [2.1.0] - 2024-08-15

### 🔧 Simplified Invitation Feature
- ❌ **Removed**: Player invitation list (not needed)
- ❌ **Removed**: Organizer field (not needed)
- ✨ **Simplified**: Focus on essential information only
- 🎯 **Streamlined**: Cleaner form with fewer required fields
- 📱 **Better UX**: Faster invitation creation process

### ✅ Current Invitation Features
- 📍 **Court Information**: Name and Google Maps link
- 📅 **Schedule**: Date, start time, and end time
- 🖼️ **Image Upload**: Optional image for invitation
- 📝 **Notes**: Additional information or rules
- 📤 **Share Options**: TXT and PNG download, social sharing

## [2.0.0] - 2024-08-15

### 🎉 Major Update - Dual Feature App
- 📨 **NEW: Invitation Creator**: Complete invitation system for badminton games
- 🔄 **Mode Selector**: Toggle between Calculator and Invitation modes
- 🏸 **Rebranded**: Now "PB Kena Mental - Badminton Community App"

### ✨ New Invitation Features
- 📍 **Court Information**: Name and Google Maps link support
- 📅 **Complete Schedule**: Date, start time, and end time
- 🖼️ **Image Upload**: Optional image upload (max 5MB) for invitations
- 👥 **Player Management**: Invite and manage player lists
- 👤 **Organizer Info**: Contact information for event organizer
- 📝 **Additional Notes**: Custom notes and special instructions
- 📤 **Share Options**: Share to WhatsApp, download as TXT or PNG

### 🔧 Technical Improvements
- 🎨 **Enhanced UI**: New mode selector with smooth transitions
- 📱 **Better UX**: Context-aware feature cards for each mode
- 🔄 **State Management**: Proper state isolation between modes
- 📊 **Type Safety**: Extended TypeScript interfaces for invitation data
- 🖼️ **Image Handling**: File upload with validation and preview

### 🎯 User Experience
- 🚀 **Seamless Switching**: Easy toggle between calculator and invitation
- 📱 **Mobile Optimized**: Both features work perfectly on mobile
- 🎨 **Consistent Design**: Unified design language across both features
- ⚡ **Performance**: Optimized loading and rendering

## [1.2.3] - 2024-08-15

### Fixed
- 🖼️ **Logo 404 Error**: Fixed logo-pbkm.jpg not found error by moving logo to public folder
- 📁 **File Structure**: Logo now properly accessible at /logo-pbkm.jpg path
- 🔧 **Build Process**: Resolved build issues and ensured clean compilation

## [1.2.2] - 2024-08-15

### Changed
- 📱 **Header Layout**: Moved main header with logo to top of page above feature cards
- 🎨 **Better Structure**: Header now appears before feature cards for better visual hierarchy
- 🔧 **Clean Organization**: Removed header from form component to avoid duplication

## [1.2.1] - 2024-08-15

### Fixed
- 🔧 **Duplicate Header**: Removed duplicate header text in main page
- 🎨 **Clean Layout**: Now only shows one header with logo and branding
- 📱 **Better UX**: Cleaner interface without redundant information

## [1.2.0] - 2024-08-15

### Added
- 🎨 **Logo Integration**: Added PB Kena Mental logo to header and favicon
- 📅 **Date & Time Input**: Added play date and play time fields
- 🖼️ **Favicon Support**: Complete favicon set (16x16, 32x32, 180x180, 192x192, 512x512)
- 📱 **PWA Icons**: Apple touch icon and Android chrome icons
- 🏷️ **Enhanced Branding**: PB Kena Mental branding throughout the app

### Fixed
- 📄 **PDF Generation**: Fixed PDF content being cut off with improved multi-page support
- 🖼️ **Image Quality**: Better image capture settings for cleaner exports
- ⚠️ **Metadata Warnings**: Separated viewport from metadata to follow Next.js 14 best practices

### Changed
- 🎨 **Header Layout**: Logo and title now displayed together
- 📊 **Summary Display**: Added play date and time to calculation results
- 📱 **Responsive Design**: Better layout for date/time fields on mobile
- 🔧 **PDF Algorithm**: Improved PDF generation with better page handling

### Technical
- Added Next.js Image component for optimized logo display
- Enhanced PDF generation with multi-page support
- Improved canvas capture settings for better quality
- Updated metadata structure for Next.js 14 compatibility

## [1.1.0] - 2024-08-15

### Added
- 📄 **PDF Download**: Generate professional PDF documents from calculation summary
- 🖼️ **Image Download**: Create high-quality PNG images of the summary
- ⚡ **Dynamic Loading**: PDF and image libraries loaded only when needed
- 🔄 **Loading States**: Visual feedback during file generation process
- 🎨 **Export Styling**: Enhanced CSS for better PDF/image quality

### Changed
- 🔧 Reorganized download buttons with clearer layout
- 📱 Improved responsive design for download options
- 🎯 Enhanced user experience with loading indicators
- 📚 Updated documentation with new features

### Technical
- Added `jsPDF` library for PDF generation
- Added `html2canvas` library for image capture
- Implemented dynamic imports for better performance
- Enhanced CSS with export-specific styling classes
- Added disabled states for buttons during processing

## [1.0.0] - 2024-08-15

### Added
- ✨ Initial release of Badminton Cost Calculator
- 🏸 Court rental cost calculation
- 🏸 Shuttlecock cost calculation  
- 👥 Automatic cost splitting among players
- 📱 Responsive design for mobile and desktop
- 💳 Multiple bank account management
- 📤 Share and download summary functionality
- 🎨 Modern UI with Tailwind CSS
- ⚡ Built with Next.js 14 and TypeScript
- 🚀 Vercel deployment ready

### Features
- **Court Information**: Name, hourly rate, duration
- **Shuttlecock Calculation**: Unit price and quantity used
- **Player Management**: Dynamic player list with add/remove
- **Cost Distribution**: Fair cost splitting per person
- **Bank Information**: Multiple account support
- **Summary Export**: Share via native API or download as text
- **Additional Notes**: Custom information field

### Technical
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Lucide React for icons
- Static export for optimal performance
- Mobile-first responsive design
