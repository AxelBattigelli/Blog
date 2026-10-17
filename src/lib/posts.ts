import { getCollection, type CollectionEntry } from "astro:content";
import { slugify } from "./slug";

export async function getPosts(): Promise<CollectionEntry<"posts">[]> {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getPages(): Promise<CollectionEntry<"pages">[]> {
  const pages = await getCollection("pages", ({ data }) => data.nav);
  return pages.sort(
    (a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title, "en"),
  );
}

export type CategoryGroup = {
  slug: string;
  name: string;
  posts: CollectionEntry<"posts">[];
};

export function groupByCategory(posts: CollectionEntry<"posts">[]): CategoryGroup[] {
  const groups = new Map<string, CategoryGroup>();

  for (const post of posts) {
    const slug = slugify(post.data.category);
    const group = groups.get(slug);
    if (group) {
      group.posts.push(post);
    } else {
      groups.set(slug, { slug, name: post.data.category, posts: [post] });
    }
  }

  return [...groups.values()].sort((a, b) => a.name.localeCompare(b.name, "en"));
}

const reservedRoots = new Set(["posts", "categories"]);

export function assertPageSlug(id: string) {
  const root = id.split("/")[0];
  if (reservedRoots.has(root)) {
    throw new Error(
      `The page "${id}" uses a reserved path (posts or categories). Rename the file.`,
    );
  }
}
