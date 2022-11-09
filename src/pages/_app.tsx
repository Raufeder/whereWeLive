import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { AppRouter } from "../backend/router";
import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";
    return {
      url,
    };
  },
  ssr: false,
})(App);
