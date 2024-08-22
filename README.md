# **MSG App**

## **Overview** [https://msg-app-iota.vercel.app]

The **MSG App** is a comprehensive platform designed for users to send and receive anonymous messages, manage their profiles, and interact securely. Built with modern technologies like Next.js, React, and MongoDB, it provides a user-friendly experience with features like user verification, AI-generated message suggestions, and responsive design.

## **Features**

- **Anonymous Messaging:** Send and receive anonymous messages.
- **User Verification:** Email verification with code expiration handling.
- **AI-Generated Suggestions:** Get suggestions for message content.
- **Responsive Design:** Optimized for various devices and screen sizes.
- **Secure Authentication:** Implemented with NextAuth for secure user management.

## **Technologies Used**

### **Frontend:**
- **Next.js:** React framework for server-side rendering and static site generation.
- **Tailwind CSS:** Utility-first CSS framework for styling.

### **Backend:**
- **Node.js:** JavaScript runtime for server-side logic.
- **Express.js:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for data storage.

### **Authentication:**
- **NextAuth:** Authentication library for Next.js.

### **Email Service:**
- **Resend:** Service for sending verification emails.

## **Getting Started**

### **Prerequisites**

- Node.js (version 14.x or later)
- MongoDB instance
- Resend API Key
- NextAuth Secret
- OpenAI API Key (if using AI features)

### **Installation**

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/msg-app.git
   cd msg-app
   ```
2. **Install Dependencies:**

   ```bash
   npm install
   ```
3. **Set Up Environment Variables:**  
*Create a .env file in the root directory and add the following variables:*
   ```bash
    DB_URI="your-mongodb-connection-string"
    RESEND_API_KEY="your-resend-api-key"
    NEXTAUTH_SECRET="your-nextauth-secret"
    OPENAI_API_KEY="your-openai-api-key"
    DOMAIN="http://localhost:3000"
   ```
4. **Run the Development Server:**

   ```bash
   npm run dev
    ```
    Navigate to http://localhost:3000 to see the app in action.

### **API Endpoints:**

- POST /api/send-messages: Send an anonymous message.
- GET /api/accept-messages: Check if the user is accepting messages.
- POST /api/verify-code: Verify the user's email verification code.
- DELETE /api/delete-message/:id: Delete a specific message.

### **Acknowledgements**
- Next.js: For the powerful React framework.
- Tailwind CSS: For the excellent styling framework.
- MongoDB: For the flexible NoSQL database.
- Resend: For reliable email delivery.
- OpenAI: For AI-powered features.

### **Contact**  
For any questions or issues, please me on linkedin.  
```bash
www.linkedin.com/in/rahulkumarpal25
```
