import { fetchArticles } from "@/lib/article";
import slugify from "@/utils/slugify";
import { getServerSideSitemapLegacy } from "next-sitemap";

export const getServerSideProps = async (ctx) => {
  const articles = await fetchArticles();
  const fields = articles?.map((i) => {
    return {
      loc: `https://personalinjurynearme.attorney/${slugify(i.state)}/${slugify(
        i.city
      )}/${i.slug}`,
      lastmod: new Date(i?.date),
    };
  });
  return getServerSideSitemapLegacy(ctx, fields);
};

const Sitemap = () => null;

export default Sitemap;
