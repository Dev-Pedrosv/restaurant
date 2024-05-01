import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import Link from "next/link";
import DiscountBadge from "./discount-bagde";

interface ProductItemPros {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
}

const ProductItem = ({ product }: ProductItemPros) => {
  return (
    <Link className="w-[150px] min-w-[150px]" href={`/products/${product.id}`}>
      <div className="w-full space-y-2">
        <div className="relative h-[150px] w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="rounded-lg object-cover shadow-md"
          />
          {product.discountPercentage && (
            <DiscountBadge
              product={product}
              className="absolute left-2 top-2 "
            />
          )}
        </div>

        <div>
          <h2 className="truncate text-sm">{product.name}</h2>
          <div className="flex items-center gap-1">
            <h3 className="font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h3>
            {product.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(Number(product.price))}
              </span>
            )}
          </div>
          <div className="before: flex justify-between">
            <span className="block text-xs text-muted-foreground">
              {product.restaurant?.name}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
