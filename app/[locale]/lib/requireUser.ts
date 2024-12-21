import { getAuth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const requireUser = async () => {
  const { userId, sessionId } = getAuth();

  // Redirect if the user is not authenticated
  if (!userId || !sessionId) {
    redirect("/sign-in?message=Please sign in to continue");
  }

  try {
    // Fetch user details securely
    const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch user details", response.statusText);
      throw new Error("User fetch failed");
    }

    const user = await response.json();
    
    // Validate essential user data
    if (!user || !user.id) {
      throw new Error("Invalid user data");
    }

    return user;

  } catch (error) {
    console.error("Error fetching user:", error);
    redirect("/sign-in?message=Session expired, please sign in again");
  }
};
