# Semester 5 Grade Calculator

A modern, interactive web application built with Next.js for calculating semester averages based on exam scores and continuous assessment (CA) grades. Designed specifically for university students to track and calculate their academic performance.

## ✨ Features

- **Real-time Calculations**: Instantly calculates module grades and semester average as you type
- **Weighted Grading System**: Supports different coefficient weights for each module
- **Flexible Assessment Structure**: Handles various exam/CA percentage splits (50/50, 60/40, 100/0)
- **Visual Progress Tracking**: Progress bars and color-coded grades for easy status monitoring
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode Interface**: Modern dark theme with cyan and blue accents
- **Automatic Validation**: Scores are automatically clamped between 0-20

## 🎯 Grading Scale

- **16+**: Excellent (Green)
- **14-16**: Very Good (Blue)
- **12-14**: Good (Yellow)
- **<12**: Needs Work (Red)
- **12+**: Passing Grade

## 📚 Default Modules

The calculator comes pre-configured with 8 modules:

1. **Mathematical Tools For Cryptography** (Coefficient: 4, 50/50)
2. **Operational Research** (Coefficient: 4, 50/50)
3. **Compilation** (Coefficient: 4, 50/50)
4. **Software Engineering** (Coefficient: 2, 60/40)
5. **Python Programming** (Coefficient: 2, 60/40)
6. **Web Development** (Coefficient: 2, 60/40)
7. **Theory of Information and Coding** (Coefficient: 1, 60/40)
8. **Business Intelligence** (Coefficient: 1, 100/0)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or later
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd semester-average-calculator
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Built With

- **[Next.js 14+](https://nextjs.org/)** - React framework for production
- **[React 18+](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Lucide React](https://lucide.dev/)** - Icon library

## 📁 Project Structure

```
semester-average-calculator/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main calculator page
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # shadcn/ui components
│   └── theme-provider.tsx  # Dark mode support
├── lib/
│   └── utils.ts            # Utility functions
├── public/                 # Static assets
├── components.json         # shadcn/ui configuration
├── next.config.mjs         # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## 💡 How to Use

1. **Enter Exam Scores**: Input your exam score (0-20) for each module
2. **Add CA Scores**: For modules with continuous assessment, enter the CA score (0-20)
3. **View Module Grades**: Each module automatically calculates based on the exam/CA percentage split
4. **Track Progress**: Monitor your semester average in real-time
5. **Check Status**: See completion progress and overall passing status

## 🎨 Customization

### Modify Modules

Edit the `MODULES` array in `app/page.tsx`:

```typescript
const MODULES: Module[] = [
  {
    id: 'unique-id',
    name: 'Module Name',
    coefficient: 4,
    examPercentage: 60,
    caPercentage: 40,
  },
  // Add more modules...
]
```

### Change Theme Colors

Modify colors in `tailwind.config.ts` or use the theme customization in `app/globals.css`.

## 📊 Calculation Formula

**Module Grade** = (Exam Score × Exam %) + (CA Score × CA %)

**Semester Average** = Σ(Module Grade × Coefficient) / Σ(Coefficients)

## 🔧 Build for Production

```bash
pnpm build
pnpm start
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 👤 Author

Built with ❤️ for university students

---

**Note**: This calculator is designed for educational purposes. Always verify your grades with official university records.
