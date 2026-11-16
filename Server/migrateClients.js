// migrateClients.js
import admin from "firebase-admin";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebaseClient.js"; // your existing firebase client config

// Initialize Admin SDK
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

const migrateClients = async () => {
  try {
    const clientsSnapshot = await getDocs(collection(db, "clients"));

    for (const doc of clientsSnapshot.docs) {
      const client = doc.data();

      if (!client.email || !client.password) {
        console.warn(`Skipping client without email/password: ${client.username}`);
        continue;
      }

      try {
        const user = await auth.createUser({
          email: client.email,
          password: client.password,
          displayName: client.username,
        });
        console.log(`✅ Migrated: ${client.email}`);
      } catch (err) {
        console.error(`❌ Failed to migrate ${client.email}:`, err.message);
      }
    }

    console.log("✅ All clients processed.");
  } catch (err) {
    console.error("🔥 Migration error:", err);
  }
};

migrateClients();
