#!/bin/bash

echo "🔧 Fixing Groovify Dependencies for React 18 Compatibility"
echo "========================================================="

# Remove node_modules and package-lock.json
echo "🗑️  Cleaning up existing dependencies..."
rm -rf node_modules
rm -f package-lock.json

# Install React 18 compatible versions
echo "📦 Installing React 18 compatible packages..."

npm install react@^18.2.0 react-dom@^18.2.0 @types/react@^18.2.0 @types/react-dom@^18.2.0

echo "✅ Dependencies fixed!"
echo ""
echo "📋 Changes made:"
echo "- Downgraded React from 19.x to 18.2.x"
echo "- Updated TypeScript types to match React 18"
echo "- This resolves Radix UI compatibility issues"
echo ""
echo "🚀 Next steps:"
echo "1. npm run dev"
echo "2. Test the application"
echo ""
echo "✨ Hydration errors should now be resolved!"
