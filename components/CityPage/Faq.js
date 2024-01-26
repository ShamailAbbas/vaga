import React from "react";

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
const Faq = ({faqs}) => {


  return (
    <div className="faq-container w-full my-6">
      <p className="font-semibold text-20 my-2 opacity-80">
        FREQUENTLY ASKED QUESTIONS
      </p>
      <p className=" text-14 mb-8 opacity-60">
        Still having questions? Visit our Faq page or contact us
      </p>
      {faqs.map((faq, index) => (
        <FaqAccordion key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};

export default Faq;

// components/FaqAccordion.js
import { useState } from "react";

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
        <span className="faq-question font-medium text-sm">{question}</span>
        {isOpen ? <FaMinus /> : <FaPlus />}
      </div>
      {isOpen && <div className="faq-answer my-2">{answer}</div>}
    </div>
  );
};
