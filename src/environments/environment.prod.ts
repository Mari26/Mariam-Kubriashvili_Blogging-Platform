export const environment = {
      production: true,
      firebase: { // This 'firebase' key is a common convention
        apiKey: "firebase_Api_key", // Your actual API key (Ideally from a separate PROD Firebase project)
        authDomain: "authDomain",
        projectId: "projectId",
        storageBucket: "storageBucket",
        messagingSenderId: "messagingSenderId",
        appId: "APP_ID"
        // measurementId: "YOUR_MEASUREMENT_ID" // Optional
      }
      // You can add other environment-specific variables here
    };
