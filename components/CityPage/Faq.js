import React, { useEffect, useState } from "react";

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

import { getFaqByCity } from "@/lib/faq";
import { faqs } from "@/data";
import Head from "next/head";

const Faq = ({ data, city_name }) => {
  const [_faqs, setFaqs] = useState();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    data?.faqs && setFaqs(data);
  }, [data]);

  async function getMore() {
    if (_faqs?.currentPage < _faqs?.totalPages) {
      const newLimits = {
        page: pagination.page + 1,
      };

      const res = await getFaqByCity(city_name, newLimits.page);
      if (res?.faqs?.length > 0) {
        setFaqs({
          faqs: [..._faqs.faqs, ...res?.faqs],
          currentPage: res.currentPage,
          totalPages: res.totalPages,
        });

        setPagination(newLimits);
      }
    }
  }
  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "FAQPage",
            mainEntity: data?.faqs?.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          })}
        </script>
      </Head>

      <div className="faq-container w-full my-6">
        <p className="font-semibold text-20 my-2 opacity-80">
          FREQUENTLY ASKED QUESTIONS
        </p>
        <p className=" text-14 mb-8 opacity-70">
          Still having questions? Visit our{" "}
          <span className="underline opacity-60">FAQ page</span> or{" "}
          <span className="underline opacity-50">contact us</span>
        </p>
        {_faqs?.faqs?.map((faq, index) => (
          <FaqAccordion
            key={faq._id}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
        {_faqs?.currentPage < _faqs?.totalPages && (
          <p
            className="py-2 opacity-60 cursor-pointer"
            onClick={() => getMore()}
          >
            more
          </p>
        )}
      </div>
    </>
  );
};

export default Faq;

// // components/FaqAccordion.js
// import { useState } from "react";
// import { getFaqByCity } from "@/lib/faq";

const FaqAccordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="faq-accordion w-full p-2 my-2 opacity-70">
      <div
        className="faq-header flex justify-between"
        onClick={toggleAccordion}
      >
        <span className="faq-question font-medium text-sm text-justify pr-6 max-w-[95%]">
          {question}
        </span>
        {isOpen ? <FaMinus /> : <FaPlus />}
      </div>
      {isOpen && (
        <div className="faq-answer my-4 ml-2 border-l-4 border-slate-300 pl-2 text-justify pr-6 max-w-[95%]">
          {answer}
        </div>
      )}
    </div>
  );
};
