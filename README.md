# Swipe Shop

A modern e-commerce application built with React, TypeScript, and Vite that features a Tinder-like swiping interface for product discovery.

## 🚀 Features

- Tinder-style product swiping interface
- Modern and responsive UI built with Tailwind CSS
- Cross-platform support with Capacitor for Android
- Smooth animations using React Spring
- Type-safe development with TypeScript
- Hot reloading for fast development

## 🛠️ Tech Stack

- **Frontend Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Mobile:** Capacitor
- **Animations:** React Spring
- **Routing:** React Router
- **UI Components:** React Icons
- **Notifications:** React Hot Toast

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/swipe-shop.git
cd swipe-shop
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## 🏗️ Project Structure

```
swipe-shop/
├── src/
│   ├── assets/         # Static assets
│   ├── components/     # Reusable components
│   ├── context/        # React context providers
│   ├── pages/          # Page components
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── utils/              # Utility functions
├── constants/          # Application constants
└── public/             # Public assets
```

## 🚀 Development

The application runs on port 3000 by default. You can access it at `http://localhost:3000`.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 📱 Mobile Development

This project uses Capacitor for mobile development. To build for Android:

```bash
npm run build
npx cap sync android
npx cap open android
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
