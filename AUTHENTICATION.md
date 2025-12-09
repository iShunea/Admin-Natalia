# Authentication System - How Login Works

## Overview

Your application uses **JWT (JSON Web Token) authentication** with a **backend API**. Currently, it's configured to use a mock API for demonstration purposes.

## Architecture

```
┌─────────────┐      POST /api/account/login       ┌──────────────────┐
│   Frontend  │────────────────────────────────────▶│   Backend API    │
│  (Browser)  │   { email, password }              │  (Your Server)   │
│             │                                     │                  │
│             │◀────────────────────────────────────│  1. Validates    │
│             │   { serviceToken, user }           │     credentials  │
│             │                                     │  2. Generates    │
│             │                                     │     JWT token    │
│             │                                     │  3. Returns user │
│             │                                     │     data + token │
└─────────────┘                                     └──────────────────┘
      │                                                      ▲
      │ Stores token in:                                    │
      │ - localStorage                                      │
      │ - Axios headers                                     │
      │                                                     │
      └─────── All subsequent requests ────────────────────┘
                with Bearer token
```

## Current Configuration

**Backend API URL:** `https://mock-data-api-nextjs.vercel.app/`

This is a **mock API for demonstration**. In production, you should replace this with your own backend server.

## How Login Works - Step by Step

### 1. User Enters Credentials

**File:** [src/sections/auth/login/JWTLogin](src/sections/auth/login/JWTLogin) (lines 50-53)

```javascript
initialValues={{
  email: 'info@phoenixcoded.co',  // Demo credentials
  password: '123456',              // Demo password
  submit: null
}}
```

**Pre-filled demo credentials:**
- Email: `info@phoenixcoded.co`
- Password: `123456`

### 2. Form Submission

**File:** [src/sections/auth/login/JWTLogin](src/sections/auth/login/JWTLogin) (line 61)

When user clicks "Login", the form calls:
```javascript
await login(values.email, values.password);
```

### 3. Login Request to Backend

**File:** [src/contexts/JWTContext.jsx](src/contexts/JWTContext.jsx) (lines 85-96)

```javascript
const login = async (email, password) => {
  // POST request to your backend API
  const response = await axios.post('/api/account/login', { email, password });

  // Backend returns JWT token and user data
  const { serviceToken, user } = response.data;

  // Save token to localStorage and axios headers
  setSession(serviceToken);

  // Update app state (user is now logged in)
  dispatch({
    type: LOGIN,
    payload: {
      isLoggedIn: true,
      user
    }
  });
};
```

**Full API URL:**
- Request: `POST https://mock-data-api-nextjs.vercel.app/api/account/login`
- Body: `{ "email": "info@phoenixcoded.co", "password": "123456" }`

### 4. Backend Validates Credentials

**This happens on your backend server** (not in this frontend code):

```javascript
// Example backend code (Node.js/Express)
app.post('/api/account/login', async (req, res) => {
  const { email, password } = req.body;

  // 1. Find user in database
  const user = await db.users.findByEmail(email);

  // 2. Verify password (hashed with bcrypt)
  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // 3. Generate JWT token
  const serviceToken = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET_KEY,  // Secret key (server-side only!)
    { expiresIn: '1d' }
  );

  // 4. Return token and user data
  res.json({
    serviceToken: serviceToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar
    }
  });
});
```

### 5. Token Storage

**File:** [src/contexts/JWTContext.jsx](src/contexts/JWTContext.jsx) (lines 36-44)

```javascript
const setSession = (serviceToken) => {
  if (serviceToken) {
    // Store in browser's localStorage
    localStorage.setItem('serviceToken', serviceToken);

    // Set default header for all axios requests
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    delete axios.defaults.headers.common.Authorization;
  }
};
```

**Where the token is stored:**
1. **localStorage** - Key: `serviceToken` - Persists across browser sessions
2. **Axios headers** - All API requests automatically include: `Authorization: Bearer <token>`

### 6. Subsequent Requests

**File:** [src/utils/axios.js](src/utils/axios.js) (lines 16-19)

After login, every API request includes the token:

```javascript
axiosServices.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('serviceToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  }
);
```

**Example request:**
```
GET https://mock-data-api-nextjs.vercel.app/api/users
Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 7. Auto-Login on Page Refresh

**File:** [src/contexts/JWTContext.jsx](src/contexts/JWTContext.jsx) (lines 53-83)

When you refresh the page or come back later:

```javascript
useEffect(() => {
  const init = async () => {
    // 1. Get token from localStorage
    const serviceToken = window.localStorage.getItem('serviceToken');

    // 2. Verify token is not expired
    if (serviceToken && verifyToken(serviceToken)) {
      setSession(serviceToken);

      // 3. Fetch current user data from backend
      const response = await axios.get('/api/account/me');
      const { user } = response.data;

      // 4. Restore logged-in state
      dispatch({
        type: LOGIN,
        payload: { isLoggedIn: true, user }
      });
    } else {
      // Token expired or missing - logout
      dispatch({ type: LOGOUT });
    }
  };

  init();
}, []);
```

### 8. Logout

**File:** [src/contexts/JWTContext.jsx](src/contexts/JWTContext.jsx) (lines 126-129)

```javascript
const logout = () => {
  setSession(null);  // Removes token from localStorage and axios
  dispatch({ type: LOGOUT });  // Updates app state
};
```

## Where Users Are Stored

### Current Setup (Mock API)

With the mock API at `https://mock-data-api-nextjs.vercel.app/`, users are stored **on that external server**. You don't have access to create/modify users there.

### Production Setup (Your Backend)

When you deploy your own backend, users should be stored in:

**Database (Recommended):**
- PostgreSQL
- MySQL
- MongoDB
- Any other database

**User Table Schema:**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,  -- NEVER store plain passwords!
  name VARCHAR(255),
  role VARCHAR(50),
  avatar VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Security Requirements:**
- ❌ **NEVER store plain-text passwords**
- ✅ **Always hash passwords** using bcrypt, Argon2, or similar
- ✅ **Use strong JWT secrets** (random, long strings)
- ✅ **Implement rate limiting** on login endpoint
- ✅ **Add email verification** for new accounts
- ✅ **Implement password reset flow**

## How to Create New Users

### Option 1: Registration Endpoint (Frontend Available)

**File:** [src/contexts/JWTContext.jsx](src/contexts/JWTContext.jsx) (lines 98-124)

```javascript
const register = async (email, password, firstName, lastName) => {
  const response = await axios.post('/api/account/register', {
    email,
    password,
    firstName,
    lastName
  });
  // Backend creates user and returns success
};
```

**Backend implementation needed:**
```javascript
app.post('/api/account/register', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // 1. Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  // 2. Check if user already exists
  const existing = await db.users.findByEmail(email);
  if (existing) {
    return res.status(409).json({ message: 'User already exists' });
  }

  // 3. Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // 4. Create user in database
  const user = await db.users.create({
    email,
    passwordHash,
    name: `${firstName} ${lastName}`,
    role: 'user'
  });

  // 5. Send verification email (optional but recommended)
  await sendVerificationEmail(user.email);

  res.status(201).json({
    message: 'User created successfully',
    userId: user.id
  });
});
```

### Option 2: Admin Panel (Backend Only)

Create a separate admin endpoint to add users:

```javascript
// Only accessible by admin users
app.post('/api/admin/users', authenticateAdmin, async (req, res) => {
  const { email, password, name, role } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await db.users.create({
    email,
    passwordHash,
    name,
    role: role || 'user'
  });

  res.status(201).json({ user });
});
```

### Option 3: Database Script (Direct Database Access)

```javascript
// scripts/create-user.js
const bcrypt = require('bcrypt');
const db = require('./database');

async function createUser(email, password, name, role) {
  const passwordHash = await bcrypt.hash(password, 10);

  await db.query(
    'INSERT INTO users (email, password_hash, name, role) VALUES ($1, $2, $3, $4)',
    [email, passwordHash, name, role]
  );

  console.log(`User created: ${email}`);
}

// Usage: node scripts/create-user.js
createUser('admin@easyreserv.io', 'secure-password', 'Admin User', 'admin');
```

## How Passwords Are Checked

### 1. **Never Compare Plain Text** ❌

```javascript
// WRONG - INSECURE!
if (password === user.password) {
  // ...
}
```

### 2. **Always Use Hashing** ✅

```javascript
// CORRECT - SECURE!
const bcrypt = require('bcrypt');

// When creating user (registration)
const passwordHash = await bcrypt.hash(password, 10);  // 10 = salt rounds
await db.users.create({ email, passwordHash });

// When checking password (login)
const user = await db.users.findByEmail(email);
const isValid = await bcrypt.compare(password, user.passwordHash);

if (isValid) {
  // Password correct - generate JWT token
} else {
  // Password incorrect - return error
}
```

### How bcrypt Works:

1. **Registration:**
   - User enters: `mypassword123`
   - bcrypt hashes it: `$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy`
   - Store hash in database (NOT the plain password)

2. **Login:**
   - User enters: `mypassword123`
   - bcrypt hashes it with the same salt
   - Compares hashes: stored hash vs. new hash
   - If match → correct password
   - If no match → wrong password

**Why this is secure:**
- Cannot reverse the hash to get the original password
- Each user has a unique salt (even same passwords have different hashes)
- Computationally expensive to brute-force

## JWT Token Structure

A JWT token looks like:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYzMjU0MjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**Three parts separated by dots:**

1. **Header:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
   ```json
   {
     "alg": "HS256",
     "typ": "JWT"
   }
   ```

2. **Payload:** `eyJ1c2VySWQiOiIxMjM0NTY3ODkwIi...`
   ```json
   {
     "userId": "1234567890",
     "email": "user@example.com",
     "iat": 1516239022,  // Issued at
     "exp": 1516325422   // Expires at
   }
   ```

3. **Signature:** `SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`
   - Created using: `HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), JWT_SECRET_KEY)`
   - Backend verifies this signature to ensure token wasn't tampered with

**Token Verification:**

**File:** [src/contexts/JWTContext.jsx](src/contexts/JWTContext.jsx) (lines 24-34)

```javascript
const verifyToken = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }

  // Decode token (NO verification - just reading the payload)
  const decoded = jwtDecode(serviceToken);

  // Check if token is expired
  return decoded.exp > Date.now() / 1000;
};
```

⚠️ **Important:** Frontend only checks expiration. Full signature verification happens on the backend.

## Security Best Practices

### ✅ What Your App Does Right:

1. **Uses JWT tokens** - Stateless authentication
2. **Stores tokens in localStorage** - Persists across sessions
3. **Includes tokens in headers** - Automatic authentication
4. **Checks token expiration** - Logs out expired users
5. **Validates on every request** - Backend checks token validity

### ⚠️ What You Should Implement on Your Backend:

1. **Password Hashing:**
   ```bash
   npm install bcrypt
   ```
   ```javascript
   const bcrypt = require('bcrypt');
   const hash = await bcrypt.hash(password, 10);
   ```

2. **JWT Signing:**
   ```bash
   npm install jsonwebtoken
   ```
   ```javascript
   const jwt = require('jsonwebtoken');
   const token = jwt.sign({ userId, email }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
   ```

3. **Environment Variables:**
   ```env
   # .env (backend only - NEVER expose this!)
   JWT_SECRET_KEY=your-super-secret-random-string-min-32-chars
   ```

4. **Token Verification Middleware:**
   ```javascript
   const authenticateJWT = (req, res, next) => {
     const token = req.headers.authorization?.split(' ')[1];

     if (!token) {
       return res.status(401).json({ message: 'No token provided' });
     }

     try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
       req.user = decoded;
       next();
     } catch (error) {
       return res.status(403).json({ message: 'Invalid token' });
     }
   };

   // Use on protected routes
   app.get('/api/users', authenticateJWT, (req, res) => {
     // req.user contains decoded token data
   });
   ```

5. **Rate Limiting:**
   ```bash
   npm install express-rate-limit
   ```
   ```javascript
   const rateLimit = require('express-rate-limit');

   const loginLimiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 5, // 5 attempts
     message: 'Too many login attempts, please try again later'
   });

   app.post('/api/account/login', loginLimiter, handleLogin);
   ```

## Setting Up Your Own Backend

### Minimal Backend Example (Node.js + Express):

```javascript
// backend/server.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// In-memory users (replace with database)
const users = [
  {
    id: '1',
    email: 'admin@easyreserv.io',
    passwordHash: await bcrypt.hash('admin123', 10),
    name: 'Admin User',
    role: 'admin'
  }
];

// Login endpoint
app.post('/api/account/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const serviceToken = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '1d' }
  );

  res.json({
    serviceToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  });
});

// Get current user
app.get('/api/account/me', authenticateJWT, (req, res) => {
  const user = users.find(u => u.id === req.user.userId);
  res.json({ user });
});

app.listen(8000, () => {
  console.log('Backend running on http://localhost:8000');
});
```

### Update Frontend Configuration:

1. Update [.env.runtime](.env.runtime):
   ```env
   API_URL=http://localhost:8000/
   ```

2. Rebuild and restart Docker:
   ```bash
   docker build -t admin-panel:latest .
   docker run -d -p 3000:3000 --env-file .env.runtime admin-panel:latest
   ```

## Summary

### Current Flow:
1. User enters credentials → Frontend
2. POST `/api/account/login` → Mock API (`https://mock-data-api-nextjs.vercel.app/`)
3. Mock API validates → Returns JWT token + user data
4. Frontend stores token → localStorage + Axios headers
5. All requests include token → `Authorization: Bearer <token>`
6. Backend validates token → Grants/denies access

### User Storage:
- **Current:** Mock API server (you can't modify)
- **Production:** Your backend database (PostgreSQL/MySQL/MongoDB)

### Password Security:
- ❌ Never store plain-text passwords
- ✅ Always use bcrypt.hash()
- ✅ Use bcrypt.compare() to verify
- ✅ Use strong JWT secrets (min 32 random characters)

### Creating Users:
- Registration endpoint: `/api/account/register`
- Admin endpoint: `/api/admin/users`
- Database script: Direct database insert

### Next Steps:
1. Set up your own backend server
2. Implement user database (with password hashing)
3. Create JWT signing/verification
4. Update `API_URL` to point to your backend
5. Implement user registration endpoint
6. Add email verification (optional but recommended)
