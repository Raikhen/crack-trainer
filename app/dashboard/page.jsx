import Dashboard from "../../components/Dashboard";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { authConfig } from "/lib/config";
import db from "/lib/firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

async function getTrainersByUserEmail(userEmail) {
  // Reference the 'trainers' collection
  const trainersRef = collection(db, "trainers");

  // Create a query where the 'users' array contains the specific userId
  const q = query(trainersRef, where("users", "array-contains", userEmail));

  // Execute the query
  const querySnapshot = await getDocs(q);

  // Extract the trainer documents
  const trainers = [];

  querySnapshot.forEach((doc) => {
    trainers.push({ id: doc.id, ...doc.data() });
  });

  return trainers;
}

export default async function Home() {
  const tokens = await getTokens(cookies(), authConfig);

  if (!tokens) {
    notFound();
  }

  const email = tokens.decodedToken.email;
  const trainers = await getTrainersByUserEmail(email);

  return <Dashboard trainers={trainers}/>;
}