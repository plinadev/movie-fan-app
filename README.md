#  Movie Fan App

An Express-based server-side app using EJS templates and TMDb API to display **now playing** movies, movie details, and GitHub login via Passport.

---

## Features

- List of “Now Playing” movies with title and poster
- Detailed *single-movie* page with synopsis, tagline, and image
- GitHub authentication using Passport.js
- Secure headers with Helmet (Content Security Policy)
- Live development reload with nodemon

---

## Setup

### Prerequisites

- Node.js (v14+)
- TMDb API Key
- GitHub OAuth App Client ID & Secret

### Installation

```bash
git clone https://github.com/plinadev/movie-fan-app.git
cd movie-fan-app
npm install
```

Create a `.env` file in the root:

```text
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
TMDB_API_KEY=your_tmdb_api_key
```

---

## Scripts

```bash
npm run dev     # Start server with nodemon (auto-reload)
npm start       # Start server normally
```

---

## Usage

1. Visit [http://localhost:3000](http://localhost:3000) to view "Now Playing" movies.
2. Click a movie item to view its detail page.
3. Login via GitHub:
   - Navigate to `/auth/github`
   - Grant access and be redirected back to the site as a logged-in user
   - Passport adds `req.user` containing GitHub profile info

---

## Security (CSP & Helmet)

Helmet is used with CSP settings to allow only:
- `self` + TMDb images for `img-src`
- `self` + jQuery & Bootstrap CDNs for `script-src`
- Adding/removing CDNs requires updating Helmet config in `app.js`

---

## Project Structure

```
.
├── client/ or server/           
│   ├── routes/
│   ├── views/
│   └── public/
├── .env
├── app.js
├── package.json
└── README.md
```

---

##  Environment Notes

- Ensure `.env` is in `.gitignore`
- If GitHub login hangs, verify `express-session` is configured and `.serializeUser`/`.deserializeUser` are set

---

