"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type Category = "urgent" | "important" | "fyi" | "archived";

interface CategoryFilterProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
  counts: Record<Category, number>;
}

export function CategoryFilter({
  activeCategory,
  onCategoryChange,
  counts,
}: CategoryFilterProps) {
  return (
    <Tabs value={activeCategory} onValueChange={(v) => onCategoryChange(v as Category)}>
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="urgent" className="gap-2">
          Urgent
          {counts.urgent > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {counts.urgent}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger value="important" className="gap-2">
          Important
          {counts.important > 0 && (
            <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
              {counts.important}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger value="fyi" className="gap-2">
          FYI
          {counts.fyi > 0 && (
            <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
              {counts.fyi}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
