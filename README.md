# StudioSpace — Creative Workspace & Production Studio Sharing Platform

**Your Space. Your Creative Freedom.**

StudioSpace is a peer-to-peer creative workspace and production studio-sharing platform. It connects creators with studio owners and helps people discover, explore, and book creative spaces for their projects.

Whether someone needs a photography studio, podcast room, music suite, film stage, or workshop space, StudioSpace makes it easier to find a suitable creative environment.

## 🌐 Live Website

**Live Site:** https://studiospace-client-chi.vercel.app/

## 📌 Project Overview

StudioSpace is designed for two main types of users:

* **Customers:** People who want to discover and book creative studios.
* **Hosts:** People who own creative spaces and want to list and manage their studios.

The platform provides a simple way for customers to explore studios and for hosts to manage their creative spaces.

## ✨ Main Features

* **User Registration:** New users can create an account using their information.
* **User Login:** Registered users can securely log in.
* **Google Authentication:** Users can sign in with their Google account.
* **Studio Discovery:** Users can explore available creative studios.
* **Studio Categories:** Studios are organized into categories such as Photography, Sound Stage, Podcast Room, Music Suite, and Art Workshop.
* **Studio Details:** Users can view studio information, images, descriptions, locations, and pricing.
* **Studio Gallery:** Users can explore studio images.
* **Add Studio:** Hosts can add their own creative spaces to the platform.
* **Manage Studios:** Hosts can manage their studio listings.
* **Studio Booking:** Customers can submit booking requests for their preferred studios.
* **Booking Management:** Users can manage their booking information.
* **Protected Routes:** Important pages and actions require user authentication.

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

StudioSpace supports different types of creative spaces:

1. **Photo Studios** — Professional spaces for photography and portraits.
2. **Sound Stages** — Spacious stages for film and video production.
3. **Podcast Rooms** — Recording spaces for podcast creators.
4. **Music Suites** — Creative spaces for music and audio production.
5. **Art Workshops** — Inspiring spaces for art and creative projects.

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

### Step 1: Clone the Frontend Repository

```bash
git clone https://github.com/devnadiaa/studiospace-client.git
```

### Step 2: Open the Frontend Folder

```bash
cd studiospace-client
```

### Step 3: Install Frontend Dependencies

```bash
npm install
```

### Step 4: Configure Frontend Environment Variables

Create a `.env.local` file in the frontend root directory.

Add the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

Replace the placeholder with your own ImgBB API key.

### Step 5: Clone the Backend Repository

Open another terminal and run:

```bash
git clone https://github.com/devnadiaa/studiospace-server.git
```

### Step 6: Open the Backend Folder

```bash
cd studiospace-server
```

### Step 7: Install Backend Dependencies

```bash
npm install
```

### Step 8: Configure Backend Environment Variables

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

### Step 9: Start the Backend Server

```bash
npm run dev
```

The backend server should run on:

http://localhost:5000

### Step 10: Start the Frontend Application

Go to the frontend terminal and run:

```bash
npm run dev
```

The frontend application should run on:

http://localhost:3000

Now open your browser and visit:

http://localhost:3000

StudioSpace is ready to explore locally.

## 🔑 Examiner Test Credentials

Examiners can create an account through the registration page and use it to explore the platform.

A dedicated demo account can also be provided:

* **Email:** `REPLACE_WITH_DEMO_EMAIL`
* **Password:** `REPLACE_WITH_DEMO_PASSWORD`

**Note:** Replace these placeholders with a real, working demo account before submitting the project. Do not publish your personal account password.

## 🚀 Deployment Links

* **Frontend Live Website:** https://studiospace-client-chi.vercel.app/
* **Backend API:** https://studiospace-server-pi.vercel.app/
* **Frontend GitHub:** https://github.com/devnadiaa/studiospace-client
* **Backend GitHub:** https://github.com/devnadiaa/studiospace-server

## 👩‍💻 Developer

**Nadia Akter**

Full Stack Web Developer in Training

* GitHub: https://github.com/devnadiaa
* LinkedIn: https://linkedin.com/in/nadia-akter-662992442/

---

**StudioSpace — Find Your Space. Create Your Vision.**
