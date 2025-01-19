"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Search as SearchIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useEventFilterStore } from "@/store/filter-state.store";
import useDebounce from "@/hooks/useDebounce";

export default function Search() {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const { setSearchUsername, clearUsername, setLoading } = useEventFilterStore();
  
  const debouncedSearchTerm = useDebounce(searchInput, 500);

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
  return (
    <>
      {/* Desktop Search */}
      <div className="">
        <div className="relative w-full">
          <Input
            type="text"
            value={searchInput}
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
        </div>
      </div>

      {/* Mobile Search Toggle */}
      <div className="flex items-center space-x-4 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobileSearch}
        >
          <SearchIcon className="h-5 w-5 text-primary" />
        </Button>
      </div>

      {/* Mobile Search Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-background z-50 md:hidden transition-transform duration-300 ease-in-out",
          isMobileSearchOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="flex flex-col items-center justify-center h-full px-4 space-y-4">
          <div className="relative w-full max-w-lg">
            <Input
              type="text"
              value={searchInput}
              onChange={handleSearch}
              placeholder="Search by username..."
              className={cn(
                "w-full pl-10 pr-12 py-2 rounded-full border-gray-300",
                "focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50",
                isTyping && "text-primary"
              )}
              autoFocus={isMobileSearchOpen}
            />
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
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileSearch}
            className="text-gray-600"
          >
            Close
          </Button>
        </div>
      </div>
    </>
  );
}