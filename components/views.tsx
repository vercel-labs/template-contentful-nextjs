type ViewsProps = {
  params: Promise<{ slug: string }> | { slug: string };
};

export function ViewsSkeleton() {
  return (
    <span className="inline-block h-4 w-16 animate-pulse rounded-sm bg-black/10" />
  );
}

async function getViews(slug: string): Promise<number> {
  // Simulated delay for demonstration purposes
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Math.floor(Math.random() * 4000) + 1000 + slug.length;
}

export async function Views({ params }: ViewsProps) {
  const { slug } = await params;
  const views = await getViews(slug);

  return (
    <span className="tabular-nums text-black/50">
      {Math.floor(views).toLocaleString()} views
    </span>
  );
}
