import { NextRequest, NextResponse } from "next/server";
import { polar } from "@/lib/polar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json({ error: "Missing productId" }, { status: 400 });
  }

  const checkout = await polar.checkouts.create({
    products: [productId],
    successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
  });

  return NextResponse.redirect(checkout.url);
}
