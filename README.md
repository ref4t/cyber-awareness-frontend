CyberShield Website frontend
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view in browser.

## 📦 Build for Production

```bash
npm run build
```

Generated files in `dist/` folder.

## 🔗 Routes & Pages

| Path         | Component  | Description                |
| ------------ | ---------- | -------------------------- |
| `/`          | Home       | Landing page with overview |
| `/login`     | Login      | User sign-in form          |
| `/register`  | Register   | New user sign-up           |
| `/quiz`      | Quiz       | Interactive quiz module    |
| `/feedback`  | Feedback   | Feedback submission form   |
| `/blogs`     | BlogList   | List of blog posts         |
| `/blogs/:id` | BlogDetail | View individual blog post  |
| `/campaigns` | Campaigns  | List all campaigns |
| `/campaigns/create` | CreateCampaign | Create a new campaign |

## 🔄 Environment Variables

* `VITE_API_URL` – Base URL of backend API

## 🛠️ Scripts

* `npm run dev` – Start dev server with HMR
* `npm run build` – Build production assets
* `npm run preview` – Preview production build

## 🎨 Styling & Design

* Uses CSS Modules or Tailwind (optional)
* Responsive mobile-first layout
* Adheres to WCAG accessibility standards

---

*Maintained by Abdullah*
