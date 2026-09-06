import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { NotFoundPage } from "@/components/not-found";
import appCss from "../styles.css?url";

const APP_NAME = "Код Юлия · Часть II. Открытый код";

const THEME_BOOT = `(function(){try{var r=localStorage.getItem("kod-yulia-2-prefs");if(!r)return;var p=JSON.parse(r);if(p.theme)document.documentElement.setAttribute("data-theme",p.theme);if(p.font)document.documentElement.setAttribute("data-font",p.font);}catch(e){}})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "theme-color", content: "#111114" },
      {
        name: "description",
        content:
          "Код Юлия. Часть II. Открытый код — литературное веб-издание. Пятнадцать глав. Фильм. Голос 01–07.",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,500;0,7..72,600;1,7..72,400&family=Manrope:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  notFoundComponent: NotFoundPage,
  component: () => (
    <html lang="ru" data-theme="dark" data-font="md" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
