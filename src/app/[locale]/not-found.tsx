import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";

export default async function NotFound() {
  const t = await getTranslations("Common");
  return (
    <Container as="section" className="flex min-h-[70vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <p className="text-fs-900 font-extrabold text-teal">404</p>
      <p className="max-w-md text-fs-400 text-slate-muted">
        {t("notFoundText")}
      </p>
      <LinkButton href="/" variant="primary" size="lg">
        {t("backHome")}
      </LinkButton>
    </Container>
  );
}
