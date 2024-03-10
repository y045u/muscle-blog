"use client";
import { Pagination, PaginationProps } from "@nextui-org/pagination";
import { useRouter } from "next/navigation";

type Props = PaginationProps;

export default function BlogPagination(props: Props) {
  const router = useRouter();
  function handleChange(page: number) {
    router.push(`/?page=${page}`);
  }
  return <Pagination onChange={handleChange} {...props} />;
}
