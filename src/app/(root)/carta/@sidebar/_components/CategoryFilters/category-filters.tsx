"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { productCategory } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  categories: productCategory[];
  categorySearchParameter: string | undefined;
}

const CategoryFilters = ({ categories, categorySearchParameter }: Props) => {
  const router = useRouter();
  return (
    <div>
      <nav>
        <ul className="mt-4 flex flex-col justify-center gap-3">
          {categories.map((categorie) => (
            <li key={categorie.id} className="flex items-center gap-2 text-sm">
              <label
                htmlFor={categorie.name}
                className="cursor-pointer flex items-center gap-3"
              >
                <Checkbox
                  checked={
                    categorySearchParameter
                      ?.split(",")
                      .includes(categorie.name) && true
                  }
                  id={categorie.name}
                  onCheckedChange={(checked) => {
                    const searchCategories = categorySearchParameter?.length
                      ? categorySearchParameter.split(",")
                      : [];
                    console.log(searchCategories);

                    if (checked) {
                      if (!searchCategories.includes(categorie.name)) {
                        router.push(
                          `/carta?categories=${[
                            ...searchCategories,
                            categorie.name,
                          ]}`
                        );
                      }
                    } else {
                      if (searchCategories.includes(categorie.name)) {
                        router.push(
                          `/carta?categories=${[
                            ...searchCategories.filter(
                              (name) => categorie.name !== name
                            ),
                          ]}`
                        );
                      }
                    }
                  }}
                />
                <span>{categorie.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default CategoryFilters;
