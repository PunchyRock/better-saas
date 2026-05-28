"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, ExternalLink } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    features: [
      "Up to 3 projects",
      "Basic analytics",
      "Community support",
      "1GB storage",
    ],
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "100GB storage",
      "Custom domains",
      "API access",
    ],
  },
];

export default function BillingPage() {
  const currentPlan: string = "free"; // TODO: Get from Convex

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Billing</h2>
        <p className="text-muted-foreground">
          Manage your subscription and billing information.
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                You are currently on the{" "}
                <Badge variant="secondary" className="ml-1">
                  {currentPlan.toUpperCase()}
                </Badge>{" "}
                plan.
              </CardDescription>
            </div>
            <Button variant="outline" render={<Link href="/api/checkout?productId=YOUR_PRO_PRODUCT_ID" />}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Manage Subscription
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Plan Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={
              plan.name === "Pro" ? "border-primary" : ""
            }
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {plan.name}
                {currentPlan === plan.name.toLowerCase() && (
                  <Badge>Current</Badge>
                )}
              </CardTitle>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              {plan.name === "Pro" && currentPlan !== "pro" && (
                <Button className="w-full" render={<Link href="/api/checkout?productId=YOUR_PRO_PRODUCT_ID" />}>
                    Upgrade to Pro
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>Your recent invoices and payments.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No billing history yet. Upgrade to a paid plan to see invoices here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
