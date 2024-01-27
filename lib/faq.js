const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export async function getAllFaqs() {
  try {
    const response = await fetch(`${apiUrl}/faqs`);
    const faqs = await response.json();
    // console.log("All FAQs:", faqs);
    return faqs;
  } catch (error) {
    console.error("Error fetching FAQs:", error.message);
  }
}

export async function getFaqByCity(city) {
  try {
    const response = await fetch(`${apiUrl}/faqs/${city}`);
    const faq = await response.json();
    // console.log(`FAQs for ${city}:`, faq);
    return faq;
  } catch (error) {
    console.error(`Error fetching FAQs for ${city}:`, error.message);
  }
}

export async function generateAndSaveFaqs(state, city) {
  try {
    const response = await fetch(`${apiUrl}/faqs/${state}/${city}`, {
      method: "POST",
    });

    if (response.ok) {
      const faqs = await response.json();
      //   console.log(`Generated and saved FAQs for ${city}:`, faqs);
      return faqs;
    } else {
      console.error("Failed to generate and save FAQs:", response.statusText);
    }
  } catch (error) {
    console.error("Error generating and saving FAQs:", error.message);
  }
}
