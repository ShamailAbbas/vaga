import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="font-Poppins">
      <Component {...pageProps} />
    </div>
  );
}
