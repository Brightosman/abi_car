import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const requireUser = async () => {
  const { userId, sessionId } = auth();

  // Redirect if the user is not authenticated
  if (!userId || !sessionId) {
    redirect("/sign-in");
  }

  // Fetch user details using CLERK_SECRET_KEY for secure server-side operations
  const user = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch user details");
    }
    return res.json();
  });

  return user;
};
