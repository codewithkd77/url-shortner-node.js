# Contact Form API

This is a Node.js backend for handling contact/vendor form submissions. It saves submissions to MongoDB and sends notification emails using ZeptoMail. The project can run as a standalone Express server or be deployed as a serverless function (AWS Lambda) using the Serverless Framework.

## Features

- Accepts POST requests at `/submit` with form data.
- Validates input (name, mobile, city, email, message).
- Stores submissions in MongoDB.
- Sends notification emails via ZeptoMail SMTP.
- Supports local development and AWS Lambda deployment.

---

## Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB database (connection string)
- ZeptoMail account (API key)
- AWS account (for deployment)
- Serverless Framework (`npm install -g serverless`)

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
ZEPTO_API_KEY=your_zeptomail_api_key
FRONTEND_URL=https://your-frontend-domain.com
PORT=5000
```

- `MONGODB_URI`: MongoDB connection string (e.g., from MongoDB Atlas)
- `ZEPTO_API_KEY`: ZeptoMail API key for SMTP authentication
- `FRONTEND_URL`: Allowed CORS origin (your frontend URL)
- `PORT`: (Optional) Port for local development (default: 5000)

---

## Installation

```bash
npm install
```

---

## Running Locally

Start the Express server with:

```bash
npm run start
```

Or for auto-reload during development:

```bash
npm run dev
```

The server will listen on the port specified in your `.env` file (default: 5000).

---

## API Endpoint

**POST** `/submit`

**Body:**
```json
{
  "name": "Your Name",
  "mobile": "1234567890",
  "city": "Your City",
  "email": "your@email.com",
  "message": "Your message"
}
```

**Response:**
- `200 OK` on success
- `400 Bad Request` for validation errors
- `500 Internal Server Error` for server issues

---

## Deploying to AWS Lambda

1. Install the Serverless Framework if you haven't:
   ```bash
   npm install -g serverless
   ```

2. Configure your AWS credentials.

3. Deploy:
   ```bash
   serverless deploy
   ```

4. For local testing with API Gateway emulation:
   ```bash
   serverless offline
   ```

---

## Project Structure

- `server.js` – Main Express app logic
- `handler.js` – Serverless handler for AWS Lambda
- `serverless.yml` – Serverless Framework configuration
- `.env` – Your environment variables (not committed to git)

---

## Notes

- Ensure your `.env` file is present and correctly configured before running or deploying.
- The notification email recipient is currently hardcoded in `server.js` (update as needed).
- For production, secure your API and validate CORS origins. 
