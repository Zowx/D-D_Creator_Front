# 🎨 D&D Creator - Frontend

<div align="center">
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="SCSS" />
  <img src="https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white" alt="RxJS" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</div>

<div align="center">
  <h3>Modern Angular Frontend for D&D Character Creation</h3>
  <p>Responsive and intuitive user interface for creating and managing D&D characters with server-side rendering support</p>
</div>

---

## 🏗️ Architecture

This frontend follows Angular's **feature-based architecture** with clear separation of concerns:

```
src/
├── app/
│   ├── components/     # Reusable UI components
│   │   ├── character-card/
│   │   ├── stat-block/
│   │   ├── skill-selector/
│   │   └── ...
│   ├── pages/          # Feature pages
│   │   ├── character-creation/
│   │   ├── character-list/
│   │   ├── character-detail/
│   │   └── auth/
│   ├── shared/         # Shared services and utilities
│   │   ├── services/   # Business services
│   │   ├── guards/     # Route guards
│   │   ├── interceptors/
│   │   └── pipes/
│   └── interfaces/     # TypeScript interfaces
├── assets/             # Static resources
│   ├── images/
│   ├── icons/
│   └── data/
└── styles/             # Global styles
    ├── components/
    ├── variables/
    └── mixins/
```

---

## 🛠️ Tech Stack

- **Framework**: Angular v19 - Modern web application framework
- **Language**: TypeScript - Strongly typed JavaScript
- **Styling**: SCSS - Enhanced CSS with variables and mixins
- **Reactive Programming**: RxJS - Reactive extensions for JavaScript
- **SSR**: Angular Universal - Server-side rendering
- **HTTP Client**: Angular HttpClient - Built-in HTTP communication
- **Forms**: Angular Reactive Forms - Form handling and validation
- **Routing**: Angular Router - Client-side navigation
- **Testing**: Jasmine & Karma - Unit testing framework

---

## 🌟 Features

### 🎭 Character Management UI

- **Character Creation Wizard**: Step-by-step character creation process
- **Race Selection**: Visual race picker with trait previews
- **Class Selection**: Class chooser with ability previews
- **Background Selection**: Background picker with skill bonuses
- **Ability Score Assignment**: Interactive ability score distribution

### 📊 Character Sheet

- **Live Statistics**: Real-time calculation of modifiers and derived stats
- **Skill Management**: Visual skill proficiency selector
- **Equipment Tracker**: Inventory management interface
- **Notes & Roleplay**: Character personality and backstory editor

### 🔐 User Experience

- **Authentication**: Login/register forms with validation
- **Responsive Design**: Mobile-first responsive layout
- **Dark/Light Mode**: Theme switcher
- **Progressive Web App**: Offline capabilities

### 🎨 UI Components

- **Reusable Components**: Modular and reusable UI elements
- **Custom Form Controls**: D&D-specific form inputs
- **Animation**: Smooth transitions and micro-interactions
- **Accessibility**: WCAG compliant interface

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18.0.0
- pnpm ≥ 8.0.0

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd D-D_Creator/D-D_Creator_Front

# Install dependencies
pnpm install
```

### Environment Configuration

Create `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:3000/api",
  version: "1.0.0",
};
```

Create `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: "https://your-api-domain.com/api",
  version: "1.0.0",
};
```

---

## 🎮 Development

### Development Server

To start a local development server, run:

```bash
pnpm start
# or
pnpm exec ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Build Commands

```bash
# Development build
pnpm run build

# Production build
pnpm run build --configuration=production

# Build with watch mode
pnpm run watch
```

### Testing

```bash
# Run unit tests
pnpm test

# Run tests with coverage
pnpm run test --code-coverage

# Run tests in watch mode
pnpm run test --watch
```

### Code Quality

```bash
# Lint TypeScript
pnpm exec ng lint

# Format code (if Prettier is configured)
pnpm exec prettier --write src/**/*.{ts,html,scss}
```

---

## 📱 Project Structure Details

### Components Organization

```
components/
├── ui/                 # Basic UI components
│   ├── button/
│   ├── input/
│   ├── modal/
│   └── loading/
├── character/          # Character-specific components
│   ├── character-card/
│   ├── stat-block/
│   ├── ability-scores/
│   └── skill-list/
└── forms/              # Form components
    ├── race-selector/
    ├── class-selector/
    └── background-selector/
```

### Services Architecture

```
shared/services/
├── api/                # API communication
│   ├── character.service.ts
│   ├── race.service.ts
│   ├── class.service.ts
│   └── auth.service.ts
├── state/              # State management
│   ├── character.state.ts
│   └── user.state.ts
└── utils/              # Utility services
    ├── theme.service.ts
    ├── storage.service.ts
    └── validation.service.ts
```

---

## 🎨 Styling Architecture

### SCSS Structure

```
styles/
├── abstracts/
│   ├── _variables.scss    # Color palette, spacing, breakpoints
│   ├── _mixins.scss       # Reusable mixins
│   └── _functions.scss    # SCSS functions
├── base/
│   ├── _reset.scss        # CSS reset
│   ├── _typography.scss   # Font styles
│   └── _global.scss       # Global styles
├── components/
│   ├── _buttons.scss      # Button styles
│   ├── _forms.scss        # Form element styles
│   └── _cards.scss        # Card component styles
├── layout/
│   ├── _header.scss       # Header styles
│   ├── _sidebar.scss      # Sidebar styles
│   └── _grid.scss         # Grid system
└── themes/
    ├── _light.scss        # Light theme
    └── _dark.scss         # Dark theme
```

### Design System

- **Colors**: D&D-inspired color palette with accessibility compliance
- **Typography**: Clear hierarchy with fantasy-themed fonts
- **Spacing**: Consistent 8px grid system
- **Breakpoints**: Mobile-first responsive design
- **Components**: Atomic design methodology

---

## 🔧 Configuration Files

### Angular Configuration

- `angular.json` - Angular CLI configuration
- `tsconfig.json` - TypeScript configuration
- `tsconfig.app.json` - App-specific TypeScript config
- `tsconfig.spec.json` - Test-specific TypeScript config

### Package Management

- `package.json` - Dependencies and scripts
- `pnpm-lock.yaml` - Dependency lock file

### Development Tools

- `.editorconfig` - Editor configuration
- `.gitignore` - Git ignore rules

---

## 🚀 Deployment

### Vercel Deployment

The project is configured for Vercel deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# For production deployment
vercel --prod
```

### Build for Production

```bash
# Build the application
pnpm run build

# The build artifacts will be stored in the dist/ directory
```

### Environment Variables for Production

Set these environment variables in your hosting platform:

- `API_URL` - Backend API URL
- `NODE_ENV` - Set to "production"

---

## 🧪 Testing Strategy

### Unit Testing

- **Framework**: Jasmine + Karma
- **Coverage**: Aim for >80% code coverage
- **Component Testing**: Test component logic and rendering
- **Service Testing**: Test business logic and API calls

### E2E Testing (Future)

- **Framework**: Cypress (planned)
- **User Flows**: Test complete user journeys
- **Cross-browser**: Test on multiple browsers

---

## 📦 Dependencies Overview

### Core Dependencies

- `@angular/core` - Angular framework core
- `@angular/common` - Common Angular functionality
- `@angular/forms` - Reactive forms
- `@angular/router` - Client-side routing
- `@angular/platform-browser` - Browser-specific services
- `rxjs` - Reactive programming

### Development Dependencies

- `@angular/cli` - Angular command line interface
- `@angular-devkit/build-angular` - Angular build tools
- `typescript` - TypeScript compiler
- `jasmine-core` - Testing framework
- `karma` - Test runner

---

## 🎯 Performance Optimizations

### Angular Optimizations

- **OnPush Change Detection**: Optimized change detection strategy
- **Lazy Loading**: Route-based code splitting
- **Tree Shaking**: Unused code elimination
- **Bundle Optimization**: Angular CLI optimizations

### Runtime Optimizations

- **Virtual Scrolling**: For large lists
- **Caching**: HTTP response caching
- **Image Optimization**: Lazy loading and compression
- **Service Workers**: Background sync and caching (planned)

---

## 🔮 Future Enhancements

### Version 1.1

- [ ] PWA capabilities
- [ ] Offline character editing
- [ ] Character export/import
- [ ] Advanced animations

### Version 2.0

- [ ] Character builder with drag & drop
- [ ] Spell slot management
- [ ] Equipment visualization
- [ ] Campaign integration

---

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Follow Angular style guide
4. Write tests for new features
5. Ensure all tests pass: `pnpm test`
6. Commit changes: `git commit -m 'Add amazing feature'`
7. Push to branch: `git push origin feature/amazing-feature`
8. Create a Pull Request

### Code Standards

- Follow Angular Style Guide
- Use TypeScript strict mode
- Write meaningful commit messages
- Add JSDoc comments for public APIs
- Maintain test coverage above 80%

---

## 📚 Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [Angular CLI Documentation](https://angular.io/cli)
- [RxJS Documentation](https://rxjs.dev/)
- [Angular Material (if used)](https://material.angular.io/)

---

<div align="center">
  <p>🎲 Ready to create epic D&D characters!</p>
  <p>Made with ❤️ using Angular</p>
</div>
