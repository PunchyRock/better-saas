import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Zap,
  CreditCard,
  Database,
  Bell,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Better Auth",
    description:
      "Email/password + OAuth (Google, GitHub) with session management and protected routes.",
  },
  {
    icon: Database,
    title: "Self-Hosted Convex",
    description:
      "Real-time database with serverless functions. Full control over your data.",
  },
  {
    icon: CreditCard,
    title: "Polar.sh Payments",
    description:
      "Subscription management with checkout, webhooks, and billing portal.",
  },
  {
    icon: Zap,
    title: "Next.js 16",
    description:
      "App Router, Server Components, Server Actions, and the new Proxy API.",
  },
  {
    icon: Bell,
    title: "Real-Time Features",
    description:
      "Live notifications and activity feeds powered by Convex subscriptions.",
  },
  {
    icon: Lock,
    title: "Route Protection",
    description:
      "Proxy-based auth checks and subscription gating for premium features.",
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for getting started",
    features: [
      "Up to 3 projects",
      "Basic analytics",
      "Community support",
      "1GB storage",
    ],
    cta: "Get Started",
    href: "/sign-up",
    variant: "outline" as const,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For teams and professionals",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "100GB storage",
      "Custom domains",
      "API access",
    ],
    cta: "Start Pro Trial",
    href: "/sign-up?plan=pro",
    variant: "default" as const,
    popular: true,
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            Better SaaS
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/sign-in"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
            <Button render={<Link href="/sign-up" />}>
                Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Build Your SaaS
            <span className="text-primary"> Faster</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            A production-ready boilerplate with auth, payments, real-time
            database, and a beautiful UI. Ship your SaaS in days, not months.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button size="lg" render={<Link href="/sign-up" />}>
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" render={<Link href="#features" />}>
                Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Everything You Need
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Pre-built with the best tools so you can focus on your product, not
            infrastructure.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Simple Pricing
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Start free, upgrade when you need more.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.name}
                className={plan.popular ? "border-primary shadow-lg" : ""}
              >
                <CardHeader>
                  {plan.popular && (
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      Most Popular
                    </span>
                  )}
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.variant}
                    render={<Link href={plan.href} />}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Built with Next.js 16, Better Auth, Convex, and Polar.sh.
          </p>
        </div>
      </footer>
    </div>
  );
}
