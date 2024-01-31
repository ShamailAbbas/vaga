import { getAllCities } from "@/lib/city";
import slugify from "@/utils/slugify";
import { getServerSideSitemapLegacy } from "next-sitemap";

export const getServerSideProps = async (ctx) => {
  const cities = await getAllCities();
  const fields = cities?.map((i) => {
    return {
      loc: `https://personalinjurynearme.attorney/${slugify(
        i.state_name
      )}/${slugify(i.city)}`,
      lastmod: new Date(),
    };
  });
  return getServerSideSitemapLegacy(ctx, fields);
};

const Sitemap = () => null;

export default Sitemap;
