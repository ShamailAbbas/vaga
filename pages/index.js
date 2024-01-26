// Example in another component or page
import { getCities } from "@/lib/city";
import slugify from "@/utils/slugify";
import Link from "next/link";

const Home = ({ cities }) => {
  console.log(cities);
  return (
    <div className="flex flex-col items-center py-12">
      {cities?.map((i, index) => {
        return (
          <Link
            href="/[state]/[city]"
            as={`${slugify(i?.state_name)}/${slugify(i?.city)}`}
            key={i?._id}
            className="my-2 border-2 rounded-full w-40 py-2 px-2 flex justify-center text-xl bg-purple-700"
          >
            {i?.city}
          </Link>
        );
      })}
    </div>
  );
};
export default Home;

export const getServerSideProps = async () => {
  try {
    const cities = await getCities(1, 20);

    return {
      props: { cities },
    };
  } catch (error) {
    console.log("error is ", error);
    return {
      props: {
        cities: [],
      },
    };
  }
};
