import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { CartHydrator, MotionRoot } from "@/components/motion-root";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VERDANT PRESS" },
      { name: "description", content: "Pure juice. Brighter days. Cold-pressed juices from Verdant Press, pressed for Indian mornings." },
      { name: "theme-color", content: "#142719" },
      { name: "apple-mobile-web-app-title", content: "Verdant Press" },
      { property: "og:title", content: "VERDANT PRESS — Pure Juice. Brighter Days." },
      { property: "og:description", content: "Cold-pressed juices from Verdant Press, pressed for Indian mornings." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og.jpg" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preload", as: "image", href: "/images/hero.jpg", fetchPriority: "high" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Instrument+Serif:ital@0;1&family=Manrope:wght@500;600;700;800&display=swap",
        media: "print",
      },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  component: Root,
  notFoundComponent: NotFound,
});

function Root() {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-paper font-sans text-charcoal">
        <PreviewHostBridge />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.querySelectorAll('link[href*=\"fonts.googleapis\"]').forEach(function(l){l.media='all'})",
          }}
        />
        <AuthProvider>
          <CartHydrator />
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-paper focus:px-3 focus:py-2"
          >
            Skip to content
          </a>
          <SiteHeader />
          <MotionRoot>
            <div id="content">
              <Outlet />
            </div>
          </MotionRoot>
          <SiteFooter />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <main className="px-6 pb-24 pt-36">
      <p className="font-display text-micro tracking-label text-botanical">404</p>
      <h1 className="mt-3 font-display text-editorial font-semibold text-ink">This page is not on the press.</h1>
      <Link to="/" className="mt-6 inline-flex font-serif text-2xl italic text-botanical">
        Back home
      </Link>
    </main>
  );
}
