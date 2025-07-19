#!/bin/bash

echo "🎵 Installing Groovify Dependencies"
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "📥 Download from: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📋 Node.js version: $(node --version)"
echo "📋 npm version: $(npm --version)"
echo ""

# Install all dependencies
echo "📦 Installing all dependencies..."
echo ""

# Core dependencies
echo "🔧 Installing core dependencies..."
npm install next@15.1.3 react@19.0.0 react-dom@19.0.0

# UI Components
echo "🎨 Installing UI components..."
npm install @radix-ui/react-dialog@^1.0.5 @radix-ui/react-dropdown-menu@^2.0.6 @radix-ui/react-scroll-area@^1.0.5 @radix-ui/react-slider@^1.1.2 @radix-ui/react-tabs@^1.0.4 @radix-ui/react-label@^2.0.2

# Styling and utilities
echo "💅 Installing styling packages..."
npm install class-variance-authority@^0.7.0 clsx@^2.0.0 lucide-react@^0.263.1 tailwind-merge@^2.0.0 tailwindcss-animate@^1.0.7

# Development dependencies
echo "🛠️  Installing development dependencies..."
npm install --save-dev typescript@^5 @types/node@^20 @types/react@^18 @types/react-dom@^18 autoprefixer@^10.0.1 eslint@^8 eslint-config-next@15.1.3 postcss@^8 tailwindcss@^3.3.0

echo ""
echo "✅ All packages installed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. npm run setup     # Setup music directories"
echo "2. npm run verify    # Verify setup"
echo "3. npm run dev       # Start development server"
echo ""
echo "🎵 Your Groovify platform is ready!"
