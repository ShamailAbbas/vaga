// Example in another component or page
import { getCities } from "@/lib/city";
import slugify from "@/utils/slugify";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home = ({ cities }) => {
  const [_cities, set_Cities] = useState();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 100,
  });

  useEffect(() => {
    set_Cities(cities);
  }, []);

  async function getMoreCities() {
    const newLimits = {
      page: pagination.page + 1,
      limit: pagination.limit + 100,
    };
    const cities = await getCities(newLimits.page, newLimits.limit);
    if (cities.length > 0) {
      set_Cities([..._cities, ...cities]);
      setPagination(newLimits);
    }
  }

  return (
    <div className="flex w-full flex-col p-6 items-center">
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {_cities?.map((city, index) => (
          <Link
            key={city?._id}
            href="/[state]/[city]"
            as={`${slugify(city?.state_name)}/${slugify(city?.city)}`}
            className={`flex-none min-w-40 h-20 my-2 border-2 rounded-full flex items-center justify-center text-xl transition-colors duration-300 hover:bg-purple-500 p-2`}
          >
            {city?.city}
          </Link>
        ))}
      </div>
      <button
        className="flex items-center w-32 justify-center py-2 my-4 rounded-full border-[1.5px] border-slate-300 hover:bg-slate-200 bg-slate-100  text-16 font-bold "
        onClick={async () => await getMoreCities()}
      >
        load more
      </button>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  try {
    const cities = await getCities(1, 100);

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
