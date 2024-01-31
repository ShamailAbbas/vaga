import { fetchArticles } from "@/lib/article";

import slugify from "@/utils/slugify";
import { getServerSideSitemapLegacy } from "next-sitemap";
import { cities } from "@citiesdata";

export const getServerSideProps = async (ctx) => {
  const articles = await fetchArticles();
  const AllArticle = articles?.map((i) => ({    
      loc: `https://personalinjurynearme.attorney/${slugify(i.state)}/${slugify(
        i.city
      )}/${i.slug}`,
      lastmod: new Date(i?.date),
    
  }));


  const AllCities = cities?.map((i) => ({
    loc: `https://personalinjurynearme.attorney/${slugify(
      i.state_name
    )}/${slugify(i.city)}`,
    lastmod: new Date(),
  }));
  const fields=[...AllArticle,...AllCities]
  console.log(AllCities)
  return getServerSideSitemapLegacy(ctx, fields);
};

const Sitemap = () => null;

export default Sitemap;
