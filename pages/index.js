// Example in another component or page
import Link from "next/link";

const Home = () => (
  <div>
    <Link href="/[state]/[city]/[article]" as="/ny/new-york/my-article">
      Go to Article
    </Link>
    <Link href="/[state]/[city]" as="/ny/new-york">
      Go to City
    </Link>
  </div>
);

export default Home;
