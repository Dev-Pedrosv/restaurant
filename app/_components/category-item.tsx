import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link href={`/categories/${category.id}/products`}>
      <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-md">
        <Image
          src={category.imageUrl}
          alt={category.name}
          height={30}
          width={30}
        />
        <span className="text-sm font-semibold">{category.name}</span>
      </div>
    </Link>
  );
};

export default CategoryItem;
