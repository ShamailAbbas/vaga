import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import { fetchArticleBySlug } from "@/lib/article";
import deslugify from "@/utils/deslugify";
import Head from "next/head";
const Index = ({ article }) => {
  if (!article._id) {
    return (
      <p className="w-full h-screen flex items-center justify-center font-bold text-40 ">
        Article not found
      </p>
    );
  }

  return <ArticlePage article={article} />;
};

export default Index;

const ArticlePage = ({ article }) => {
  const router = useRouter();

  // Add JSON-LD for the article
  const structuredData = {
    "@context": "http://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://personalinjurynearme.attorney${router.asPath}`,
    },
    headline: article.title,
    image: article.imageUrl,
    datePublished: new Date(article.date),
    dateModified: new Date(article.date), // Assuming the modification date is the same as the published date
    author: {
      "@type": "Organization",
      name: "Personal Injury Near Me", // Replace with your actual organization name
    },
    publisher: {
      "@type": "Organization",
      name: "Personal Injury Near Me",
      url: "https://admin.personalinjurynearme.attorney",
      logo: {
        "@type": "ImageObject",
        url: "/images/logo.png", // Replace with the URL to your organization's logo
      },
    },
    description: article.description,
  };

  return (
    <>
      {/* JSON-LD script for structured data */}
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>

      <div className="article-page p-8 mx-auto max-w-2xl">
        <Image
          src={article.imageUrl}
          alt={article.title}
          width={200}
          height={130}
          className="mb-6 w-full h-48  rounded-md object-fill object-center"
        />
        <h1 className="text-xl font-bold mb-4">{article.title}</h1>
        <div className="flex">
          <p className="text-gray-600 mb-2 mr-6">{article.type}</p>
          <p className="text-gray-600 mb-2">{article.date}</p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: article.description }} />
      </div>
    </>
  );
};

export const getServerSideProps = async ({ params, req }) => {
  try {
    const { city, state, article } = params;

    const article_by_slug = await fetchArticleBySlug(
      article,
      deslugify(city),
      deslugify(state)
    );

    return {
      props: {
        article: article_by_slug?._id ? article_by_slug : {},
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};
