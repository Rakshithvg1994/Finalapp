# 🚀 Carlsberg Excellence Dashboard - Multi-File JavaScript App

## 📁 Project Structure

```
carlsberg-dashboard/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── app.js              # JavaScript application logic
├── data.json           # All department data
└── README.md           # This file
```

## ✨ Features

✅ **Modular Architecture** - Separate concerns (HTML, CSS, JS, Data)
✅ **Single Page App (SPA)** - No page reloads
✅ **Dynamic Data Loading** - Load departments from JSON
✅ **Interactive Navigation** - Smooth slide transitions
✅ **Responsive Design** - Works on mobile, tablet, desktop
✅ **Professional Styling** - Carlsberg brand colors
✅ **Easy to Extend** - Add new departments to data.json

## 🛠️ File Descriptions

### **index.html** (1.2 KB)
- Main HTML structure
- Sidebar navigation
- Slide container
- Controls (Previous/Next buttons)
- Links to CSS and JS files

### **styles.css** (6.6 KB)
- All styling for layout
- Color scheme and branding
- Responsive media queries
- Component styling (buttons, cards, tables, etc.)

### **app.js** (11.8 KB)
- Main application logic
- Department management
- Slide rendering
- Event handlers
- Radial chart generation
- All slide type renderers

### **data.json** (14.5 KB)
- 3 departments (Packaging, Warehouse, Maintenance)
- 7 slides per department
- All metrics, KPIs, and roadmaps
- Easy to update or add new data

## 🚀 Quick Start

### **Option 1: Local File System (Fastest)**

```bash
# 1. Download all 4 files to a folder
# 2. Open index.html in your browser
# Done! No server needed for local testing
```

### **Option 2: Local Web Server (Recommended for JSON)**

```bash
# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000

# Node.js (npm install -g http-server)
http-server

# Then visit: http://localhost:8000
```

### **Option 3: Deploy to GitHub Pages**

```bash
# 1. Create GitHub repository
git init
git add .
git commit -m "Add Carlsberg Excellence Dashboard"
git remote add origin https://github.com/YOUR-USERNAME/carlsberg-dashboard.git
git push -u origin main

# 2. Enable GitHub Pages
# - Go to Settings → Pages
# - Source: main branch
# - Save

# 3. Live at:
# https://YOUR-USERNAME.github.io/carlsberg-dashboard/
```

## 📊 How the App Works

### **Data Flow**
```
data.json → app.js (loads) → app.init() → renderUI
                                    ↓
                          User clicks department
                                    ↓
                          loadDepartment(index)
                                    ↓
                          renderSlide() → HTML
                                    ↓
                          Display on screen
```

### **Main Functions in app.js**

| Function | Purpose |
|----------|---------|
| `app.init()` | Load data and initialize |
| `app.renderDepartmentList()` | Create sidebar buttons |
| `app.loadDepartment(index)` | Switch to department |
| `app.renderSlide()` | Display current slide |
| `app.createSlideContent(slide)` | Generate slide HTML |
| `app.nextSlide()` | Navigate to next |
| `app.previousSlide()` | Navigate to previous |

## 🎨 Adding New Content

### **Add a New Department**

Edit `data.json`:

```json
{
  "name": "New Department",
  "icon": "🏢",
  "slides": [
    {
      "type": "title",
      "title": "DEPARTMENT NAME",
      "subtitle": "Roadmap",
      "baseline": "5%",
      "target": "35%",
      "gap": "+30%"
    },
    // ... more slides
  ]
}
```

### **Slide Types Available**

1. **title** - Title slide with metrics
2. **radial** - 5-dimension radial chart
3. **assessment** - Strengths & gaps
4. **roadmap** - Phase plan
5. **phase-improvement** - Progress bars
6. **outcomes** - Expected results
7. **kpi** - Metrics table

## 🔧 Customization

### **Change Colors**

Edit `styles.css`:

```css
/* Primary color */
.header {
    background: linear-gradient(135deg, #YOUR-COLOR-1 0%, #YOUR-COLOR-2 100%);
}

/* Accent color */
.dept-btn.active {
    background: #YOUR-ACCENT-COLOR;
}
```

### **Change Fonts**

Edit `styles.css` body:

```css
body {
    font-family: 'Your Font Name', sans-serif;
}
```

### **Add New Slide Type**

In `app.js`, add method:

```javascript
createCustomSlide(slide) {
    return `<div class="slide active">
        <!-- Your custom HTML -->
    </div>`;
}
```

Then add to `createSlideContent()` switch statement.

## 📱 Responsive Behavior

- **Desktop (>768px)** - Sidebar on left, content on right
- **Tablet (481px-768px)** - Flexible layout
- **Mobile (<480px)** - Stacked vertically, buttons in row

## 🐛 Troubleshooting

### **JSON not loading**
- Use local web server (see Option 2 above)
- Check browser console (F12) for errors

### **Styles not applying**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)

### **Navigation buttons disabled**
- Check you're at first/last slide
- This is by design

### **GitHub Pages showing 404**
- Wait 2-5 minutes for deployment
- Check Settings → Pages → Branch is set

## 📈 Performance

- **File sizes** - Total ~34 KB
- **Load time** - <1 second
- **Memory usage** - <5 MB
- **Browser support** - All modern browsers (Chrome, Firefox, Safari, Edge)

## 🔐 Privacy & Security

- ✅ No external API calls
- ✅ No tracking or analytics
- ✅ Data stored locally
- ✅ No server required
- ✅ Works offline after load

## 📝 Version History

- **v1.0** - Initial release
  - 3 departments (Packaging, Warehouse, Maintenance)
  - 7 slide types
  - Full radial charts
  - Responsive design

## 🎯 Next Steps

1. Download all 4 files
2. Test locally (double-click index.html)
3. Deploy to GitHub
4. Share URL with team
5. Add more departments to data.json

## 💡 Tips

- Update data.json quarterly with progress
- Add new departments easily
- Customize colors in styles.css
- Extend slide types in app.js
- Use for stakeholder presentations

## ❓ Questions?

- Check console (F12) for error messages
- Verify file structure is correct
- Ensure data.json is valid JSON
- Test in different browser if issues occur

## 📄 License

Open source - Use freely for Carlsberg Excellence projects

---

**Happy Presenting!** 🎉

