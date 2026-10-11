import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileDashboard from "@/components/dashboard/ProfileDashboard";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <main
      lang="bn"
      className="min-h-screen bg-[#f0f5f1] px-4 py-8 sm:px-6 sm:py-10"
    >
      <div className="mx-auto max-w-3xl">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-[#202820]">আমার প্রোফাইল</h1>
          <p className="mt-2 text-sm text-gray-600">
            আপনার একাউন্টের তথ্য এখানে দেখুন।
          </p>
        </header>

        <ProfileDashboard
          user={{
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
          }}
        />
      </div>
    </main>
  );
}
