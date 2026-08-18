import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Aplica el middleware de i18n a todo excepto: API pública, panel y API de Payload
  // (`admin`, `payload-admin`), assets internos y archivos estáticos. Excluir `admin`
  // evita que next-intl intente localizar/redirigir las rutas del CMS.
  matcher: ["/((?!api|admin|payload-admin|_next|_vercel|.*\\..*).*)"],
};
