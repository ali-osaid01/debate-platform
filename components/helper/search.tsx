"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Search as SearchIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useEventFilterStore } from "@/store/filter-state.store";
import useDebounce from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/services/user.service";
import { IUser } from "@/types/interface/user.interface";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

export default function Search() {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const { setSearchUsername, clearUsername, setLoading } = useEventFilterStore();
  const debouncedSearchTerm = useDebounce(searchInput, 500);

  const { data, isLoading } = useQuery({
    queryKey: ["search-users", searchInput],
    queryFn: () => fetchUsers(1, 10, searchInput ? searchInput : ""),
    enabled: searchInput !== null,
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (searchInput !== debouncedSearchTerm) {
      setIsTyping(true);
      setLoading(true);
    } else {
      setIsTyping(false);
      setTimeout(() => setLoading(false), 100);
    }
  }, [searchInput, debouncedSearchTerm, setLoading]);

  useEffect(() => {
    setSearchUsername(debouncedSearchTerm || null);
  }, [debouncedSearchTerm, setSearchUsername]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  }, []);

  const toggleMobileSearch = useCallback(() => {
    setIsMobileSearchOpen((prev) => !prev);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchInput("");
    clearUsername();
    setLoading(false);
    if (isMobileSearchOpen) {
      setIsMobileSearchOpen(false);
    }
  }, [clearUsername, isMobileSearchOpen, setLoading]);
  const hasUsers = data?.response?.data?.data && data.response.data.data.length > 0 && searchInput && searchInput?.length > 0;

  return (
    <>
      <div className="relative w-full">
  <Input
    type="text"
    value={searchInput || ""}
    onChange={handleSearch}
    placeholder="Search by username..."
    className={cn(
      "w-full pl-10 pr-12 py-2 rounded-full border-gray-300",
      "focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50",
      isTyping && "text-primary"
    )}
  />
  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
  {searchInput && (
    <Button
      variant="ghost"
      size="icon"
      className="absolute right-2 top-1/2 transform -translate-y-1/2"
      onClick={handleClearSearch}
    >
      <X className="h-4 w-4 text-gray-400" />
    </Button>
  )}
  
  {hasUsers && (
    <div className="absolute w-full bg-white border border-gray-200 rounded-lg shadow-md mt-1 z-50">
      {data?.response?.data?.data.map((user: IUser) => (
        <Link href={`/profile/${user.id}`} passHref  key={user.id}>
        <div
          className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 cursor-pointer"
        >
          <Avatar>
            <AvatarImage src={user.profilePicture} alt={user.username} />
            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <span>{user.username}</span>
        </div>
      </Link>
      ))}
    </div>
  )}
</div>

      {/* Mobile Search */}
      <div className="md:hidden">
        <Button variant="ghost" size="icon" onClick={toggleMobileSearch}>
          <SearchIcon className="h-5 w-5 text-primary" />
        </Button>
        <div
          className={cn(
            "fixed inset-0 bg-background z-50 transition-transform duration-300 ease-in-out",
            isMobileSearchOpen ? "translate-y-0" : "-translate-y-full"
          )}
        >
          <div className="flex flex-col items-center justify-center h-full px-4 space-y-4">
            <Input
              type="text"
              value={searchInput ? searchInput : ""}
              onChange={handleSearch}
              placeholder="Search by username..."
              autoFocus={isMobileSearchOpen}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClearSearch}
              className="text-gray-600"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
