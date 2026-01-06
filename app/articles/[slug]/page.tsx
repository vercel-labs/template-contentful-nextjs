import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getArticles } from "@/lib/contentful/queries";
import { RichText } from "@/components/rich-text";
import { ContentfulImage } from "@/components/contentful-image";
import { Views, ViewsSkeleton } from "@/components/views";

export async function generateStaticParams() {
  const articles = await getArticles({ limit: 5 });
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage(props: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <nav className="flex items-center justify-between mb-12 text-sm">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-black/50 hover:text-black transition-colors group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">
            ←
          </span>
          <span>All articles</span>
        </Link>
        <Suspense fallback={<ViewsSkeleton />}>
          <Views params={props.params} />
        </Suspense>
      </nav>
      <Suspense fallback={<ArticleContentSkeleton />}>
        <ArticleContent params={props.params} />
      </Suspense>
    </main>
  );
}

async function ArticleContent(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const article = await getArticles({
    "fields.slug": params.slug,
    limit: 1,
  });

  if (!article || article.length === 0) {
    notFound();
  }

  const { title, categoryName, authorName, summary, details, articleImage } =
    article[0];

  return (
    <article>
      <div className="flex items-center gap-4 mb-8">
        <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-black text-white">
          {categoryName}
        </span>
      </div>

      <h1 className="text-5xl font-semibold text-black mb-6 text-balance leading-tight">
        {title}
      </h1>

      <div className="flex items-center gap-3 text-lg text-black/60 mb-12">
        <span>By {authorName}</span>
      </div>

      <div className="relative w-full aspect-2/1 mb-12 overflow-hidden bg-black/5 border border-black/5 shadow-sm">
        <ContentfulImage
          src={articleImage?.fields?.file?.url}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="mb-12 pb-12 border-b border-black/10">
        <p className="text-xl text-black/80 leading-relaxed text-pretty font-medium">
          {summary}
        </p>
      </div>

      <div
        className="max-w-none"
        style={{
          color: "rgb(0 0 0 / 0.8)",
        }}
      >
        <RichText content={details} />
      </div>
    </article>
  );
}

function ArticleContentSkeleton() {
  return (
    <article>
      <div className="flex items-center gap-4 mb-8">
        <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-black/10 text-transparent animate-pulse">
          Category
        </span>
      </div>

      <h1 className="text-5xl font-semibold mb-6 leading-tight bg-black/10 text-transparent animate-pulse rounded">
        Article Title
      </h1>

      <div className="flex items-center gap-3 text-lg mb-12">
        <span className="bg-black/10 text-transparent animate-pulse rounded">
          By Author Name
        </span>
      </div>

      <div className="relative w-full aspect-2/1 mb-12 overflow-hidden bg-black/5 border border-black/5 shadow-sm animate-pulse" />

      <div className="mb-12 pb-12 border-b border-black/10">
        <p className="text-xl leading-relaxed font-medium bg-black/10 text-transparent animate-pulse rounded">
          This is a placeholder for the article summary that spans multiple
          lines of text content.
        </p>
      </div>

      <div className="max-w-none bg-black/5 animate-pulse rounded h-64" />
    </article>
  );
}
