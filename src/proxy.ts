import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Runs before every /admin page loads:
// 1. refreshes the login cookie so you don't get logged out unexpectedly;
// 2. sends visitors who aren't logged in to /admin/login.
// (Each admin page and action also checks again with requireAdmin().)
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const db = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (toSet, headers) => {
          toSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          toSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
          Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
        },
      },
    },
  );

  const {
    data: { user },
  } = await db.auth.getUser();

  const onLoginPage = request.nextUrl.pathname === "/admin/login";
  if (!user && !onLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  if (user && onLoginPage && !request.nextUrl.searchParams.has("error")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  return response;
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
