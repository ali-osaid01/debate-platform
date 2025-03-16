"use client";
import { Input } from "../ui/input";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@uidotdev/usehooks";

interface SearchBarProps {
  initialValue: string;
  placeholder?: string;
}

const DashboardSearch:FC<SearchBarProps> = ({ initialValue, placeholder = "Search" }) => {
  const [value, setValue] = useState(initialValue);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = useDebounce(value, 700);

  useEffect(() => {
    const currentQuery = searchParams.get("search") || "";
    if (query !== currentQuery) {
      const params = new URLSearchParams(searchParams);
      params.set("search", query);
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [query, router, pathname, searchParams]);

  return (
    <div className="w-96 relative">
      <Input
        placeholder={placeholder}
        className="px-10 border-black placeholder:text-black placeholder:font-semibold focus:border-none placeholder:opacity-70"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      />
      <SearchIcon className="size-5 text-primaryCol absolute top-2.5 left-4" />
    </div>
  );
}

export default DashboardSearch;