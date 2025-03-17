import { getCurrentSession } from "@/actions/auth";
import SalesCampaignBanner from "@/components/layout/salesCampaignBanner";
import ProductGrid from "@/components/product/productGrid";
import { getAllProducts } from "@/sanity/lib/client";
// import { urlFor } from "@/sanity/lib/image";
import React from "react";

const Home = async () => {
  const { user } = await getCurrentSession();
  const products = await getAllProducts();

  return (
    <div className="">
      <SalesCampaignBanner />
      <section className="container mx-auto py-8">
        <ProductGrid products={products} />
      </section>
      Home
    </div>
  );
};

export default Home;
