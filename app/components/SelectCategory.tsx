"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { categoryItems } from "../lib/categoryItems";

export function SelectCategory() {
  const [selectCategory, setSelectedCategory] = useState<string>(null);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <input type="hidden" name="category" value={selectCategory || ""} />
        {categoryItems.map((item) => (
          <div key={item.id} className="cursor-pointer">
            <Card
              className={
                selectCategory === item.name
                  ? " bg-violet-50 shadow-sm  hover:shadow-sm border-primary"
                  : "border-primary/10 transition-all opacity-45"
              }
              onClick={() => setSelectedCategory(item.name)}
            >
              <CardHeader>
                {item.image} <h3 className="font-medium">{item.title}</h3>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
