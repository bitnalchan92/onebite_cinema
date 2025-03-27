import "@/styles/globals.css";
import type {AppProps} from "next/app";
import GlobalLayout from "@/pages/components/global-layout";
import {ReactNode} from "react";
import {NextPage} from "next";

// 기존의 Component에는 우리가 만든 getLayout함수가 없기 때문에 타입을 따로 만들어줘야한다.
type NextPageWithLayout = NextPage & {
  // getLayout 함수가 없는 페이지가 있기 때문에 ?:
  getLayout?: (page: ReactNode) => ReactNode;
}

export default function App({Component, pageProps}: AppProps & { Component: NextPageWithLayout }) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return (
    <GlobalLayout>
      {getLayout(<Component {...pageProps} />)}
    </GlobalLayout>
  );
}
