# Vishnu Chikkudu — Portfolio

A responsive, interactive personal portfolio built with plain HTML, CSS and JavaScript (no build step).

## Structure
```
vishnu-portfolio/
├── index.html      # page markup
├── css/style.css   # styles, light/dark theme tokens
├── js/script.js    # typing effect, tabs, filters, modal, theme toggle, scroll effects
└── assets/         # put your photo, resume PDF, project images here
```

## Run locally
Open `index.html` in a browser, or serve the folder:
```
python3 -m http.server 8000
```

## Customize
- **Projects:** edit the `projects` array in `js/script.js` (add `link` buttons as needed).
- **Skills:** edit the `skills` object in `js/script.js`.
- **Typing roles:** edit the `roles` array in `js/script.js`.
- **Colors:** change the CSS variables at the top of `css/style.css`.
- **Contact:** update `EMAIL` in `js/script.js` and the links in `index.html`.

## Deploy free
Push the folder to GitHub, then enable GitHub Pages (Settings → Pages), or drag the folder into Netlify or Vercel.
