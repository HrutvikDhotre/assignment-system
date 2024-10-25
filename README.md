# Assignment System

This project is an assignment submission portal built with a MERN (MongoDB, Express, React, Node.js) stack. It allows users to submit assignments and lets admins accept or reject them.

---

## Instructions

1) Navigate to both the frontend and backend folders in different terminals

2) For the **Frontend** setup:
   - Run the following commands:
     ```bash
     npm install
     npm run dev
     ```
     This will install the dependencies and start the development server.

3) For the **Backend** setup:
   - a) Create a `.env` file in the `assgn-backend` folder.
   - b) Paste this code in the `.env` file and replace the placeholders with your Google Client ID and Secret. For `SECRET`, use a long random string (for demo purposes, any string will work).
     ```plaintext
     SECRET=YOUR_SECRET
     GOOGLE_CLIENT_ID=YOUR_CLIENT_ID
     GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_SECRET
     ```
   - c) After creating the `.env` file, run:
     ```bash
     npm install
     node index.js
     ```
     This will install the backend dependencies and start the server.

---

Following these steps, both the frontend and backend should be running locally, and you’ll be able to use the assignment submission portal.


