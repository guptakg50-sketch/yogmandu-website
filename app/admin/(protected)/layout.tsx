import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  if (!cookieStore.get("yogmandu_admin_session")?.value) {
    redirect("/admin/login");
  }
  return <>{children}</>;
}
