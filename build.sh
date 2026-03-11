#!/usr/bin/env sh
set -eu

echo "🔨 Building frontend..."
npm run build

echo "✅ Build complete! Ready for deployment."
echo ""
echo "📦 Next steps:"
echo "1. Push to GitHub"
echo "2. Connect to Render"
echo "3. Deploy!"
echo ""
echo "🌐 Your app will be available at:"
echo "   https://codecraft-ar.onrender.com"
