import { fetchArticles } from "@/lib/article";
import { getAllCities } from "@/lib/city";
import slugify from "@/utils/slugify";
import { getServerSideSitemapLegacy } from "next-sitemap";

export const getServerSideProps = async (ctx) => {
  const articles = await fetchArticles();
  const AllArticle = articles?.map((i) => ({    
      loc: `https://personalinjurynearme.attorney/${slugify(i.state)}/${slugify(
        i.city
      )}/${i.slug}`,
      lastmod: new Date(i?.date),
    
  }));
console.log(AllArticle)
  const cities = await getAllCities();
  const AllCities = cities?.map((i) => ({
    loc: `https://personalinjurynearme.attorney/${slugify(
      i.state_name
    )}/${slugify(i.city)}`,
    lastmod: new Date(),
  }));
  const fields=[...AllArticle,...AllCities]
  return getServerSideSitemapLegacy(ctx, fields);
};

const Sitemap = () => null;

export default Sitemap;
