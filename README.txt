Eventora - MERN Event Management Platform
========================================

Eventora is a full-stack event management application built with the MERN stack (MongoDB, Express, React, Node.js) and Vite + Tailwind CSS for the frontend. It supports user registration, authentication, event browsing, booking, admin management, and more.

---

Features
--------
- User registration, login, and OTP verification
- Admin and user dashboards
- Event creation, listing, and booking
- Booking confirmation/cancellation (admin)
- Payment status tracking
- Responsive UI with Tailwind CSS
- Optimized for performance and user experience

---

Project Structure
-----------------
Client/
  Frontend/
    src/
      components/      # Reusable UI components
      context/         # React Context for Auth
      pages/           # Page components (Home, Login, Register, Dashboard, etc.)
      utils/           # Axios instance, helpers
    index.html
    package.json
    tailwind.config.js
    vite.config.js
    .env

Server/
  Controller/          # Express controllers
  Middleware/          # Auth middleware
  Models/              # Mongoose models
  Routes/              # Express routes
  utils/               # Email, helpers
  index.js             # Main server entry
  package.json
  .env

---

Setup & Run
-----------
1. Clone the repository
2. Install dependencies in both Client/Frontend and Server
   - `npm install` in each directory
3. Configure environment variables in `.env` files for both frontend and backend
4. Start the backend server:
   - `node index.js` (or `npm run dev` if using nodemon)
5. Start the frontend dev server:
   - `npm run dev` (from Client/Frontend)
6. Access the app at `http://localhost:5173` (or the port shown)

---

Optimization Highlights
-----------------------
- React.memo, useMemo, useCallback for performance
- Route-based code splitting with React.lazy/Suspense
- Lazy loading and fallback for images
- Debounced search inputs
- Axios timeout, retry, and global error handling
- Local state updates after actions (no full reloads)
- Loading skeletons and backend health check

---

Deployment
----------
- Frontend can be deployed on Netlify/Vercel
- Backend can be deployed on Render/Heroku
- Ensure environment variables are set for production
- OTP email on Render: set RESEND_API_KEY (https://resend.com) — Gmail SMTP does not work on most cloud hosts
- Optional: EMAIL_FROM with a domain you verified in Resend

---

Contributing
------------
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

License
-------
MIT
