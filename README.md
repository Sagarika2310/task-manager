# JTRONIX Frontend Internship Assessment — Task Tracker

A responsive React Task Tracker built for the JTRONIX Frontend Internship Assessment.

## Features

- Add tasks and prevent empty or whitespace-only entries
- Mark tasks as Completed or Pending
- Delete individual tasks
- View total, completed, and pending task counts
- Track overall completion progress
- Filter tasks by All, Pending, or Completed
- Save tasks and their statuses in browser `localStorage`
- Restore tasks after refreshing the page
- Responsive layout for desktop and mobile screens

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- Browser `localStorage`

## Requirements

Install Node.js (LTS recommended), which includes npm.

## Run locally

1. Extract the project folder.
2. Open a terminal in the project folder (the folder containing `package.json`).
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL printed by Vite in your browser.

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Data persistence

Tasks are saved in the current browser's `localStorage`. They remain available after refreshing the page in the same browser profile, but are not synchronised between devices or browsers.

## Assessment coverage

This single application combines the task creation, task management, filtering, persistence, and responsive layout requirements from the assessment.

No backend or database is required.
