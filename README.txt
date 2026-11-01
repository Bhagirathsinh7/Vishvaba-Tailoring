VISHVA TAILORING - STARTER WEBSITE

IMPORTANT
This project is a starter. It will NOT store orders online until Firebase is configured.
Do not paste passwords, private keys, or service-account JSON into website files.

1) Create a Firebase project at https://console.firebase.google.com/
2) Add a Web App and copy its Firebase config into firebase-config.js.
3) Enable Authentication > Email/Password. Create a manager user in Authentication.
4) Create Firestore Database.
5) For a safe production setup, configure Firestore Security Rules so:
   - customers can create orders only;
   - only the authenticated manager can read orders and write services.
   Do not use open public read/write rules.
6) Test the site locally using a local web server (ES modules do not work reliably from file://).
7) Create a GitHub repository and upload these files.
8) On Render, create a Static Site from the repository; publish directory is the repository root.
   Render's free static sites can host the front end. Firebase provides the online data sync.
9) Add your final domain/Render URL to Firebase Authentication authorized domains.

Current features: responsive home/services/order form, manager email/password sign-in,
order listing, service entry, and printable bill layout. Add-ons such as WhatsApp sending,
editing/deleting orders, payment tracking, and custom logo/brand photos can be added next.

This project does not include the old Netlify site's source/design because the old account
and source files were not available. The visual design is a fresh, editable starting point.
