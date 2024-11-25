# Contest Pro

# Cntest Pro: [Live](https://contest-pro-58eec.web.app/)

## Overview

**Contest Pro** is a dynamic platform that allows users to create, manage, and participate in various contests. It features role-based access with three main roles: **Admin**, **Creator**, and **User**. The project includes an admin dashboard for managing users and contests.

- **Admin:** Can manage user roles (promote users to creators or admins), approve or reject contests, and declare winners.
- **Creator:** Can create, update, and delete contests, and declare one participant as the winner.
- **User:** Can participate in contests, view contest details, track their winning statistics, and see the results of contests they’ve entered.

## Features

**New Feature:** Rating option added. Only the participants who have participated in a contest can rate that particular contest even after the applition date is over. Admin and the creator of the contest cannot rate that contest.

- **Admin Dashboard:** Includes controls for managing contests and users.
- **User Roles:**
  - **Admin:** Has access to all features, including user management.
  - **Creator:** Can manage their own contests and declare winners.
  - **User:** Can join contests and view personal stats.
- **Contests:**
  - Users can participate in contests, view contest details, and submit entries.
  - Creators can create contests and declare winners.
  - Admin approves contests before they are visible to users.
- **Winning Stats:** Users can view their contest performance and statistics, including whether they have won any contests.

### Admin Login Credentials

- **Email:** acc@c.com
- **Password:** 1111Aa

## Technologies Used

### Frontend

- **React**: For building the user interface.
- **React Router Dom** : For routing between different pages.
- **Axios** : For making HTTP requests.
- **React Query** : For data fetching and caching.
- **Firebase** : For authentication and hosting.
- **Tailwind CSS**: For styling the frontend.
- **SweetAlert2** : For alert modals.
- **React Toastify** : For toast notifications.
- **Stripe** : For payment processing.
- **Headless UI** : For UI components like modals and popovers.
- **React Icons** : For icons.
- **React Circular Progressbar** : For showing progress bars.
- **React Helmet** : For managing page metadata.

### Backend

- **Express.js**: For the server and API.
- **MongoDB**: For the database.
- **Stripe**: For handling payments.
- **JWT (JSON Web Tokens)**: For secure authentication.

### Deployment

- **Frontend**: Deployed on Firebase.
- **Backend**: Deployed on Vercel.


### Frontend-Backend Interaction
API Communication:

The frontend, built with React, used Axios and React Query for efficient API calls to the backend. Data fetching was optimized with background re-fetching.
APIs were designed in Express.js to handle CRUD operations for contests, user management, and participant data.

### Authentication:
Firebase was used for frontend authentication, while the backend used JWT to ensure secure role-based access across endpoints.

### Database Operations:
MongoDB stored user data, contest details, and participation stats. Backend endpoints were created to query, update, and manage this data efficiently.

### Stripe Integration:
Frontend Stripe components were integrated for payment collection, with backend routes handling the server-side payment confirmation and webhook events.

### Challenges Faced:

**Role-Based Access Management:**

Challenge: Differentiating access levels for Admin, Creator, and User in both the frontend and backend.
Solution: Implemented a middleware in Express.js to verify JWT tokens and authorize roles. The frontend dynamically adjusted the UI based on the user role fetched during authentication.

**Rating Feature Logic:**

Challenge: Ensuring only participants who joined a contest could rate it, without exposing this logic to the frontend.
Solution: Added a server-side validation to check participant eligibility before accepting ratings.

**Data Synchronization:**
Challenge: Real-time updates for participants and contest statuses were complex due to asynchronous API calls.
Solution: Used React Query's background re-fetching and caching to ensure data consistency across components.

**Stripe Payment Integration:**
Challenge: Ensuring secure payment processing and accurate updates to the backend.
Solution: Used Stripe’s server-side SDK to verify payments and implemented webhooks to handle asynchronous payment confirmations.


**This project highlighted the importance of:**

💠Secure and efficient API design.
💠Clear role-based access control.
💠The need for robust server-side validations to maintain data integrity.
💠Tools like React Query and JWT in building scalable and secure applications.

## How to Run the Project

### Prerequisites

- Node.js
- MongoDB

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/KausarAhmadTasin/contest-pro-client.git
   ```
