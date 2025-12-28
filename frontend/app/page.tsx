import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Master Your Schedule with AI
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              ActivityPlanner Pro helps you visualize your week, track productivity,
              and optimize your time using advanced AI recommendations.
            </p>
            <div className="space-x-4">
              <Link href="/register">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg">Log In</Button>
              </Link>
            </div>
            <div className="mt-8">
              {/* Placeholder for Hero Image or Dashboard Preview */}
              <div className="rounded-lg border bg-card p-4 shadow-xl">
                <div className="h-[300px] w-full bg-gradient-to-br from-primary/10 to-primary/5 rounded flex items-center justify-center text-muted-foreground">
                  Dashboard Preview Mockup
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
