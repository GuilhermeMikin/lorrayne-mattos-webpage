import type { Metadata } from "next";
import { getLocalePath } from "@/shared/config/locales";
import { buildAbsoluteUrl } from "@/shared/config/site";
import { createCourseAdapter } from "@/shared/prismic/course-adapter";
import { createSiteSettingsAdapter } from "@/shared/prismic/site-settings-adapter";
import { transformLocaleData } from "@/shared/utils/transformLocaleData";

type CoursePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { locale } = await params;
  const { locale: safeLocale, messages } = transformLocaleData(locale);
  const seo = messages.SEO.pages?.course ?? messages.SEO;
  const canonicalPath = getLocalePath(safeLocale, "course/lm");

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: buildAbsoluteUrl(canonicalPath),
    },
    openGraph: {
      url: buildAbsoluteUrl(canonicalPath),
    },
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { locale } = await params;
  const { locale: safeLocale, messages } = transformLocaleData(locale);
  const course = await createCourseAdapter().get(safeLocale);
  const siteSettings = await createSiteSettingsAdapter().get(safeLocale);
  const coursePage = messages.pages.course;

  if (!course) {
    return null;
  }

  return (
    <div className="space-y-6">
      <section className="section-card p-7 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-dark dark:text-brand-light">
          {coursePage.eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          {course.title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-700 dark:text-slate-300">
          {course.description}
        </p>
        <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
          {coursePage.coming_soon}
        </p>
        <a
          href={siteSettings.whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex min-h-11 items-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark dark:bg-brand-dark dark:hover:bg-brand"
        >
          {coursePage.booking_cta}
        </a>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="section-card p-7">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {coursePage.highlights_title}
          </h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
            {course.modules.map((module) => (
              <li key={module} className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/40">
                {module}
              </li>
            ))}
          </ul>
        </article>

        <article className="section-card p-7">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {coursePage.faq_title}
          </h2>
          <div className="mt-5 space-y-4">
            {course.faq.map((item) => (
              <div key={item.question} className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-950/40">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  {item.question}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
