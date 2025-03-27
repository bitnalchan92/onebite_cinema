import {useRouter} from "next/router";
import {ReactNode} from "react";
import SearchableLayout from "@/pages/components/searchable-layout";

export default function Page() {
  const router = useRouter();
  const {q} = router.query;

  return <h1>검색 결과 : {q}</h1>;
}

Page.getLayout = (page: ReactNode) => {
  return (
    <SearchableLayout>
      {page}
    </SearchableLayout>
  )
}