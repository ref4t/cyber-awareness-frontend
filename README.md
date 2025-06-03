# Cybersecurity Awareness Website - Frontend

This repository contains the **Vite + React** frontend for the Cybersecurity Awareness Website. It provides interactive UI components for quizzes, feedback, user authentication, and educational content.

## 📁 Folder Structure

```
frontend/
├── public/                  # Static assets and index.html
├── src/
│   ├── assets/              # Images, icons, fonts
│   ├── components/          # Reusable UI components (Navbar, Button, Card)
│   ├── pages/               # Page views (Home, Quiz, Login, Feedback)
│   ├── services/            # API calls via Axios
│   ├── App.jsx              # Main app & routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── .env                     # Environment variables
├── package.json             # Dependencies & scripts
└── README_Frontend.md       # This file
```

## ⚙️ Prerequisites

* Node.js v14+
* npm or yarn
* Backend API running at `REACT_APP_API_URL`

## 🔧 Installation

1. Clone the repo:

   ```bash
   git clone <repo-url> frontend
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` in project root with:

   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

## 🚀 Development Server

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
| `/about` | AboutUs | About CyberShield |
| `/contact` | ContactUs | Contact information |
| `/terms` | Terms | Terms and conditions |

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

*Maintained by \[Your Name]*
