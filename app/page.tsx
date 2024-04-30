import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div className="mb-10">
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>
      <PromoBanner
        src="/banner-promo-01.svg"
        alt="Até 30% de desconto em pizzas"
      />

      <div className="space-y-4 pl-5 pt-6">
        <div className="flex justify-between pr-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant={"ghost"}
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRightIcon />
          </Button>
        </div>
        <ProductList products={products} />
      </div>

      <PromoBanner
        src="/banner-promo-02.svg"
        alt="A partir de 17.90 em lanches"
      />

      <div className="space-y-4 pl-5 pt-6">
        <div className="flex justify-between pr-5">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>
          <Button
            variant={"ghost"}
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRightIcon />
          </Button>
        </div>
        <RestaurantList />
      </div>
    </div>
  );
};

export default Home;