import { Head, Html, Main, NextScript } from "next/document";
import { JSX } from "react";

export default function Document(): JSX.Element {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased bg-slate-500">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
