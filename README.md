<div align="center">

# 🎬 StudioSpace

### Creative Workspace & Production Studio Marketplace

**Your Space. Your Creative Freedom.**

A platform connecting creative professionals with studio owners to discover, explore, and book inspiring creative spaces.

<br />

<a href="https://studiospace-client-chi.vercel.app/">
  <img src="https://img.shields.io/badge/🌐_Visit_Live_Website-6C4CE8?style=for-the-badge" alt="Live Website" />
</a>

<br /><br />

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge\&logo=next.js\&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge\&logo=tailwindcss\&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)

</div>

## 📖 Table of Contents

* [Project Overview](#-project-overview)
* [Main Features](#-main-features)
* [User Roles](#-user-roles)
* [Studio Categories](#-studio-categories)
* [Technology Stack](#️-technology-stack)
* [Project Architecture](#-project-architecture)
* [Project Repositories](#-project-repositories)
* [Local Installation & Setup](#️-local-installation--setup)
* [Examiner Test Credentials](#-examiner-test-credentials)
* [Deployment Links](#-deployment-links)
* [Developer](#-developer)

## 📌 Project Overview

StudioSpace is a peer-to-peer creative workspace and production studio-sharing platform. It connects creators with studio owners and helps people discover, explore, and book creative spaces for their projects.

Whether someone needs a photography studio, podcast room, music suite, film stage, or workshop space, StudioSpace makes it easier to find a suitable creative environment.

StudioSpace is designed for two main types of users:

* **Customers:** People who want to discover and book creative studios.
* **Hosts:** People who own creative spaces and want to list and manage their studios.

The platform provides a simple way for customers to explore studios and for hosts to manage their creative spaces.

## ✨ Main Features

* **User Registration:** New users can create an account using their information.
* **User Login:** Registered users can securely log in.
* **Google Authentication:** Users can sign in with their Google account.
* **Studio Discovery:** Users can explore available creative studios.
* **Studio Categories:** Studios are organized into different creative categories.
* **Studio Details:** Users can view studio information, images, descriptions, locations, and pricing.
* **Studio Gallery:** Users can explore studio images.
* **Add Studio:** Hosts can add their own creative spaces to the platform.
* **Manage Studios:** Hosts can manage their studio listings.
* **Studio Booking:** Customers can submit booking requests for their preferred studios.
* **Booking Management:** Users can manage their booking information.
* **Protected Routes:** Important pages and actions require user authentication.
* **Studio Search & Filtering:** Users can search and filter studios based on their preferences.
* **Booking Status Management:** Users can track booking statuses, including Pending, Confirmed, Rejected, and Cancelled.
* **Booking Cancellation:** Customers can cancel their booking requests.
* **Double Booking Prevention:** The system prevents overlapping bookings for the same studio and time slot.
* **Studio Amenities:** Users can explore available amenities and facilities on studio details pages.
* **Reviews & Ratings:** Users can view studio reviews and ratings, and submit their own ratings and feedback after their booking has been successfully completed.
* **Hero Slider:** A three-slide hero slider highlights creative spaces and platform features.
* **Featured Studios:** Users can explore selected featured studio listings.
* **Dark & Light Theme:** Users can switch between dark and light themes.
* **Loading States & 404 Page:** The platform provides loading indicators and a custom not-found page.
* **Toast Notifications:** Users receive notifications for important actions and operations.
* **Responsive Design:** The platform works across mobile, tablet, and desktop devices.
* **Profile Menu & User Dropdown:** Users can access their profile and account-related options through the dropdown menu.

## 👥 User Roles

### 1. Customer

Customers can:

* Create an account and log in.
* Explore different studio categories.
* View studio details and images.
* Check studio locations and pricing.
* Book their preferred studios.
* View their booking information.

### 2. Host

Hosts can:

* Register and log in.
* Add new studio listings.
* Provide studio descriptions, images, locations, and pricing.
* Manage their own studio information.
* View booking information related to their studios.

## 🏢 Studio Categories

StudioSpace supports six types of creative spaces:

1. **Photo Studio** — Professional spaces for photography and portraits.
2. **Film Stage** — Spacious stages for film and video production.
3. **Podcast Lounge** — Recording spaces for podcast creators.
4. **Music Suite** — Creative spaces for music and audio production.
5. **Workshop** — Inspiring spaces for art and creative projects.
6. **Sound Stage** — Professional spaces for sound and video production.

## 🛠️ Technology Stack

### Frontend

* Next.js
* React.js
* TypeScript
* Tailwind CSS
* Better Auth React Client

### Backend

* Node.js
* Express.js
* JavaScript
* Better Auth

### Database

* MongoDB Atlas

### Authentication

* Better Auth
* Google OAuth
* JWT
* Secure HTTP-only Cookies

### Image Hosting

* ImgBB

### Deployment

* Vercel

## 🏗️ Project Architecture

StudioSpace uses a separate frontend and backend architecture.

### Client Application

The client application handles:

* User interface and navigation.
* Studio browsing and details.
* Registration and login pages.
* Customer and host dashboards.
* Booking forms and booking management.
* API requests to the backend server.

### Server Application

The backend application handles:

* API endpoints.
* MongoDB database operations.
* Authentication and session verification.
* Studio listing management.
* Booking creation and status management.
* Review operations.
* Access control for protected resources.

The client communicates with the server through API requests.

## 📂 Project Repositories

**Frontend Repository:**

https://github.com/devnadiaa/studiospace-client

**Backend Repository:**

https://github.com/devnadiaa/studiospace-server

## ⚙️ Local Installation & Setup

Follow these steps to run StudioSpace on your computer.

### Prerequisites

Before starting, make sure you have:

* Node.js installed.
* npm installed.
* Git installed.
* A MongoDB Atlas account.
* Required authentication and image-hosting credentials.

### Frontend Setup

#### Step 1: Clone the Frontend Repository

```bash
git clone https://github.com/devnadiaa/studiospace-client.git
```

#### Step 2: Open the Frontend Folder

```bash
cd studiospace-client
```

#### Step 3: Install Frontend Dependencies

```bash
npm install
```

#### Step 4: Configure Frontend Environment Variables

Create a `.env.local` file in the frontend root directory.

Add the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000

NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

Replace the placeholder with your own ImgBB API key.

### Backend Setup

#### Step 5: Clone the Backend Repository

Open another terminal and run:

```bash
git clone https://github.com/devnadiaa/studiospace-server.git
```

#### Step 6: Open the Backend Folder

```bash
cd studiospace-server
```

#### Step 7: Install Backend Dependencies

```bash
npm install
```

#### Step 8: Configure Backend Environment Variables

Create a `.env` file in the backend root directory.

Add the following variables:

```env
PORT=5000

DB_USER=your_mongodb_username

DB_PASS=your_mongodb_password

BETTER_AUTH_SECRET=your_auth_secret

BETTER_AUTH_URL=http://localhost:5000

CLIENT_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Replace the placeholder values with your own credentials.

#### Step 9: Start the Backend Server

```bash
npm run dev
```

The backend server should run on:

http://localhost:5000

#### Step 10: Start the Frontend Application

Go to the frontend terminal and run:

```bash
npm run dev
```

The frontend application should run on:

http://localhost:3000

Now open your browser and visit:

http://localhost:3000

StudioSpace is ready to explore locally.

**Note:** Both the frontend and backend applications must be running to use the complete application locally.

## 🔑 Examiner Test Credentials

The following demo accounts are available for testing the platform.

### Host Account

| Information | Credentials                           |
| ----------- | ------------------------------------- |
| Email       | [host@test.com](mailto:host@test.com) |
| Password    | Hosttest@123                          |

### Customer Account

| Information | Credentials                                   |
| ----------- | --------------------------------------------- |
| Email       | [customer@test.com](mailto:customer@test.com) |
| Password    | Customertest@123                              |

**Note:** These are dedicated testing accounts. Please use them only for evaluating the StudioSpace platform.

## 🚀 Deployment Links

| Resource              | Link                                            |
| --------------------- | ----------------------------------------------- |
| Frontend Live Website | https://studiospace-client-chi.vercel.app/      |
| Backend API           | https://studiospace-server-pi.vercel.app/       |
| Frontend GitHub       | https://github.com/devnadiaa/studiospace-client |
| Backend GitHub        | https://github.com/devnadiaa/studiospace-server |

## 👩‍💻 Developer

<div align="center">

### Nadia Akter

**Full Stack Web Developer in Training**

[![GitHub](https://img.shields.io/badge/GitHub-devnadiaa-181717?style=for-the-badge\&logo=github)](https://github.com/devnadiaa)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Nadia_Akter-0A66C2?style=for-the-badge\&logo=linkedin)](https://linkedin.com/in/nadia-akter-662992442/)

</div>

<div align="center">

### 🎬 StudioSpace

**Find Your Space. Create Your Vision.**

*Built for creators. Designed for creativity.*

</div>
