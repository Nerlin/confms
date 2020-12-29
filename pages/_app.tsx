import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "reflect-metadata";
import "tailwindcss/tailwind.css";
import "../styles/global.css";

config.autoAddCss = false;


function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  );
}

export default MyApp
