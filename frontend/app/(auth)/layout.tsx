import { Navbar } from "@/components/layout/Navbar";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="flex flex-1 items-center justify-center py-12">
                {children}
            </div>
        </div>
    );
}
