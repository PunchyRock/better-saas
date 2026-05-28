import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

/**
 * POST /api/sync-user
 * Syncs the current authenticated user to Convex.
 * Called from the client after sign-in/sign-up.
 */
export async function POST() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await convex.action(api.authSync.syncUser, {
      authUserId: session.user.id,
      email: session.user.email,
      name: session.user.name || "User",
      image: session.user.image || undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to sync user to Convex:", error);
    return NextResponse.json(
      { error: "Failed to sync user" },
      { status: 500 }
    );
  }
}
