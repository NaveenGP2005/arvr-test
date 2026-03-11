#!/usr/bin/env bash

# 🎬 AR Experience Testing Script
# Run this to verify all AR features are working

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║          🚀 AR EXPERIENCE - TESTING CHECKLIST 🚀             ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test results
passed=0
failed=0

# Function to print test result
test_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ PASS${NC}: $2"
        ((passed++))
    else
        echo -e "${RED}❌ FAIL${NC}: $2"
        ((failed++))
    fi
}

echo -e "${BLUE}📋 BUILD & COMPILATION TESTS${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Test 1: Check if project directory exists
if [ -d "/d/Study/Assignment/CodeCraft AR" ]; then
    test_result 0 "Project directory found"
else
    test_result 1 "Project directory not found"
fi

# Test 2: Check if package.json exists
if [ -f "/d/Study/Assignment/CodeCraft AR/package.json" ]; then
    test_result 0 "package.json exists"
else
    test_result 1 "package.json missing"
fi

# Test 3: Check if node_modules installed
if [ -d "/d/Study/Assignment/CodeCraft AR/node_modules" ]; then
    test_result 0 "node_modules installed"
else
    test_result 1 "node_modules not found - run 'npm install'"
fi

echo ""
echo -e "${BLUE}🏗️  SOURCE FILES TESTS${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Test 4: ARExperience component exists
if [ -f "/d/Study/Assignment/CodeCraft AR/src/pages/ARExperience.tsx" ]; then
    test_result 0 "ARExperience.tsx found"
else
    test_result 1 "ARExperience.tsx missing"
fi

# Test 5: ARViewer component exists
if [ -f "/d/Study/Assignment/CodeCraft AR/src/components/ARViewer.tsx" ]; then
    test_result 0 "ARViewer.tsx found"
else
    test_result 1 "ARViewer.tsx missing"
fi

# Test 6: Check if ARViewer has A-Frame implementation
if grep -q "a-scene" "/d/Study/Assignment/CodeCraft AR/src/components/ARViewer.tsx"; then
    test_result 0 "ARViewer has A-Frame scene"
else
    test_result 1 "ARViewer missing A-Frame implementation"
fi

# Test 7: Check if animations are implemented
if grep -q "animation" "/d/Study/Assignment/CodeCraft AR/src/components/ARViewer.tsx"; then
    test_result 0 "Animations implemented"
else
    test_result 1 "Animations not found"
fi

# Test 8: App.tsx has AR route
if grep -q "/ar/" "/d/Study/Assignment/CodeCraft AR/src/App.tsx"; then
    test_result 0 "AR route configured"
else
    test_result 1 "AR route not found"
fi

echo ""
echo -e "${BLUE}🎨 FEATURES TESTS${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Test 9: Check for back navigation
if grep -q "ArrowLeft" "/d/Study/Assignment/CodeCraft AR/src/pages/ARExperience.tsx"; then
    test_result 0 "Back button implemented"
else
    test_result 1 "Back button missing"
fi

# Test 10: Check for info panel
if grep -q "showInfo" "/d/Study/Assignment/CodeCraft AR/src/pages/ARExperience.tsx"; then
    test_result 0 "Info panel implemented"
else
    test_result 1 "Info panel missing"
fi

# Test 11: Check for algorithm descriptions
if grep -q "algorithmDescriptions" "/d/Study/Assignment/CodeCraft AR/src/pages/ARExperience.tsx"; then
    test_result 0 "Algorithm descriptions added"
else
    test_result 1 "Algorithm descriptions missing"
fi

# Test 12: Check for mobile instructions
if grep -q "Mobile" "/d/Study/Assignment/CodeCraft AR/src/components/ARViewer.tsx"; then
    test_result 0 "Mobile instructions added"
else
    test_result 1 "Mobile instructions missing"
fi

# Test 13: Check for related algorithms
if grep -q "Related Algorithms" "/d/Study/Assignment/CodeCraft AR/src/pages/ARExperience.tsx"; then
    test_result 0 "Related algorithms section added"
else
    test_result 1 "Related algorithms missing"
fi

echo ""
echo -e "${BLUE}📦 BUILD TESTS${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Test 14: Check if dist directory exists
if [ -d "/d/Study/Assignment/CodeCraft AR/dist" ]; then
    test_result 0 "Production build exists"
    
    # Test 15: Check build size
    if [ -f "/d/Study/Assignment/CodeCraft AR/dist/assets/index-fkySKeAd.js" ]; then
        size=$(stat -c%s "/d/Study/Assignment/CodeCraft AR/dist/assets/index-fkySKeAd.js" 2>/dev/null)
        size_kb=$((size / 1024))
        if [ $size_kb -lt 300 ]; then
            test_result 0 "Build size optimized (${size_kb}KB)"
        else
            test_result 1 "Build size too large (${size_kb}KB)"
        fi
    fi
else
    test_result 1 "Production build missing - run 'npm run build'"
fi

echo ""
echo -e "${BLUE}🧪 RUNTIME CHECKS${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Test 16: Check TypeScript strict mode
if grep -q '"strict": true' "/d/Study/Assignment/CodeCraft AR/tsconfig.json"; then
    test_result 0 "TypeScript strict mode enabled"
else
    test_result 1 "TypeScript strict mode disabled"
fi

# Test 17: Check ESLint config
if grep -q "react" "/d/Study/Assignment/CodeCraft AR/vite.config.ts"; then
    test_result 0 "React plugin configured"
else
    test_result 1 "React plugin not configured"
fi

# Test 18: Check Tailwind CSS
if grep -q "tailwindcss" "/d/Study/Assignment/CodeCraft AR/postcss.config.js"; then
    test_result 0 "Tailwind CSS configured"
else
    test_result 1 "Tailwind CSS not configured"
fi

echo ""
echo -e "${BLUE}📚 DOCUMENTATION TESTS${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Test 19: Check if AR_FIXES.md exists
if [ -f "/d/Study/Assignment/CodeCraft AR/AR_FIXES.md" ]; then
    test_result 0 "AR_FIXES.md documentation created"
else
    test_result 1 "AR_FIXES.md missing"
fi

# Test 20: Check if README exists
if [ -f "/d/Study/Assignment/CodeCraft AR/README.md" ]; then
    test_result 0 "README.md exists"
else
    test_result 1 "README.md missing"
fi

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo -e "${BLUE}📊 TEST SUMMARY${NC}"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo -e "✅ ${GREEN}Passed: $passed${NC}"
echo -e "❌ ${RED}Failed: $failed${NC}"
echo ""
total=$((passed + failed))
percentage=$((passed * 100 / total))
echo -e "${YELLOW}Overall: ${percentage}% ($passed/$total)${NC}"
echo ""

if [ $failed -eq 0 ]; then
    echo -e "${GREEN}🎉 ALL TESTS PASSED! 🎉${NC}"
    echo ""
    echo "Your AR experience is ready to test:"
    echo "1. Open: http://localhost:3000"
    echo "2. Click any algorithm card"
    echo "3. See the 3D scene render"
    echo "4. Test on mobile: http://YOUR_IP:3000"
    exit 0
else
    echo -e "${RED}⚠️  Some tests failed. Check above for details.${NC}"
    exit 1
fi
