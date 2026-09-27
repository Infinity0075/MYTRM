# MYTRM — Modern Mental Healthcare & Online Therapy Platform

**MYTRM** is a modern, accessible, and confidential mental health therapy and counseling web application built to empower young adults, students, and working professionals across India. The platform connects clients with verified clinical psychologists, counseling specialists, and trauma-informed therapists for seamless 1-on-1 online video care.

---

## 🌟 Key Features

* **Verified Clinical Practitioners**: Browse 22 verified RCI-licensed clinical psychologists and counseling specialists with detailed qualifications, language filters, and specializations.
* **1-on-1 Video Therapy Booking**: Flexible appointment scheduling with automatic booking confirmation and Google Meet room integration.
* **Instant WhatsApp Support**: Dual contact options enabling instant messaging via WhatsApp or email inquiry logging.
* **Dedicated Client & Practitioner Dashboards**:
  * **Client Dashboard**: Track upcoming appointments, past session history, and saved favorite psychologists.
  * **Doctor Portal**: Manage upcoming client bookings, session status updates, and profile settings.
  * **Admin Dashboard**: Manage practitioner directory, approve/cancel appointments, and oversee system records.
* **Human-Centered About Us & Careers**: Purpose-driven company story, care philosophy, 4-step care workflow (`Understand` → `Connect` → `Talk` → `Continue`), and practitioner partnership inquiries.
* **Fully Responsive Design**: Optimized experience for Desktop, Tablet, and Mobile with drawer navigation and accessible UI components.

---

## 🛠️ Technology Stack

* **Frontend**: HTML5, Vanilla CSS (Design tokens, CSS Grid, Flexbox, responsive breakpoints), ES6+ JavaScript.
* **Styling & Motion**: Custom CSS architecture (`base.css`, `components.css`, `pages.css`), smooth scroll animations (`.animate-on-scroll` with `IntersectionObserver`), and glassmorphism UI elements.
* **State & Persistence**: LocalStorage session management (`mytrm_session`), client-side authentication guards, and fallback offline database.
* **Backend Integration**: RESTful API integration with Google Apps Script Web App for cloud Google Sheets database storage.
* **Third-Party Services**: WhatsApp Business API URL scheme, Google Meet video links, and Unsplash clinical asset fallbacks.

---

## 📁 Project Structure

```text
mytrm/
├── index.html               # Homepage & Featured Practitioners Bento
├── therapists.html          # Practitioner Discovery & Multi-Filter Search
├── therapist-profile.html   # Detailed Practitioner Bio, Reviews, & Booking CTA
├── booking.html             # Date/Time Slot Selection & Booking Submission
├── confirmation.html        # Booking Confirmation Page
├── about.html               # About MYTRM, Care Philosophy, Values, & Careers
├── contact.html             # Contact Us, Compact Support Cards, & Inquiry Form
├── dashboard.html           # Client Appointment Dashboard
├── doctor-dashboard.html   # Practitioner Portal
├── admin-dashboard.html    # Administrative Control Panel
├── login.html               # Role-based Portal Authentication (Client/Doctor/Admin)
├── signup.html              # Client Account Registration
├── forgot-password.html     # Password Reset Request Form
├── google_apps_script.gs    # Google Apps Script Backend Code (Google Sheets DB)
├── css/
│   ├── base.css             # Design tokens, typography, CSS reset, & animations
│   ├── components.css       # Navbar, Footer, Buttons, Badges, Modals, & Cards
│   └── pages.css            # Page-specific layouts & responsive grid rules
├── js/
│   ├── data.js              # 22 Verified Clinical Practitioners Dataset & Preset Slots
│   ├── api.js               # API Client (Google Apps Script fetch & local fallback)
│   ├── auth.js              # Session Handler, Role Protection, & Navbar User Menu
│   └── script.js            # Main UI Logic, Filter Controllers, & Animations
├── assets/
│   ├── doctors/             # Verified Practitioner Profile Photos
│   └── icons/               # SVG Vector Icons (WhatsApp, Call, etc.)
├── .gitignore               # Git Ignore Specification
├── .env.example             # Environment Variables Template
└── README.md                # Project Documentation
```

---

## 🔌 Integrations

### 1. WhatsApp Business Integration
Allows users to complete bookings or reach out for client care directly via WhatsApp using formatted text templates.

### 2. Google Apps Script Backend (`google_apps_script.gs`)
Acts as a serverless backend connecting the web interface to Google Sheets for storing:
* User Accounts
* Doctor Records
* Booking Appointments
* Contact Messages & Inquiries

### 3. Google Meet Link Generation
Automatically formats private Google Meet video session room links for confirmed appointments.

---

## 💻 Local Development

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Infinity0075/MYTRM.git
   cd MYTRM
   ```

2. **Run a Local Development Server**:
   You can serve the static files using Python, Node.js, or any static HTTP server.

   * Using Python 3:
     ```bash
     python3 -m http.server 8085
     ```
   * Open your browser and navigate to:
     ```text
     http://localhost:8085
     ```

---

## 🚀 Production Deployment (Vercel)

MYTRM is ready for serverless production deployment on **Vercel**:
1. Connect the GitHub repository `https://github.com/Infinity0075/MYTRM` to Vercel.
2. Set the Framework Preset to **Other / Static HTML**.
3. Optionally configure the environment variable `VITE_APPS_SCRIPT_URL` pointing to your deployed Apps Script Web App execution URL.
4. Bind your custom domain.

---

## 🔒 Security & Privacy

* No API keys, credentials, or private tokens are committed to version control.
* Local state and session auth are handled securely via browser storage and standard form validation.

---

## 📄 License

&copy; 2026 MYTRM Health Technologies Pvt. Ltd. All rights reserved.
