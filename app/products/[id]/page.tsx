import PriceInfoCard from "@/components/PriceInfoCard";
import Modal from "@/components/modal";
import ProductCard from "@/components/productCard";
import { getProductById, getSimilarProducts } from "@/lib/actions";
import { Product } from "@/lib/types/index.types";
import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
interface Props {
  params: { id: string; category?: string };
}

async function ProductDetails({
  params: {
    id,
    // category, // TODO: for enhanced results
  },
}: Props) {
  const product: Product = await getProductById(id);
  const similarProducts = await getSimilarProducts(
    id
    // category //TODO: for enhanced results
  );
  if (!product) redirect("/");
  return (
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <Image
            src={product.image}
            width={580}
            height={400}
            alt={id}
            className="mx-auto"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 pb-6 flex-wrap">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-secondary font-semibold">
                {product.title}
              </p>
              <Link
                href={product.url}
                target="_blank"
                className="text-base text-black opacity-50"
              >
                Visit Product
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="product-hearts">
                <Image
                  src={"/assets/icons/red-heart.svg"}
                  alt="heart"
                  width={20}
                  height={20}
                ></Image>
                <p className="text-base font-semibold text-[#d46f77]">
                  {product.reviewsCount}
                </p>
              </div>
              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src={"/assets/icons/bookmark.svg"}
                  alt="bookmark"
                  width={20}
                  height={20}
                ></Image>
              </div>
              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src={"/assets/icons/share.svg"}
                  alt="share"
                  width={20}
                  height={20}
                ></Image>
              </div>
            </div>
          </div>
          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="t-[34px] text-secondary font-bold">
                {product.currency} {formatNumber(product.currentPrice)}
              </p>
              <p className="t-[21px] text-black opacity-50 line-through">
                {product.currency} {formatNumber(product.originalPrice)}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="product-stars">
                  <Image
                    src={"/assets/icons/star.svg"}
                    alt="stars"
                    width={16}
                    height={16}
                  ></Image>
                  <p className="text-sm text-primary-orange font-semibold">
                    {product.stars || 25}
                  </p>
                </div>
                <div className="product-reviews">
                  <Image
                    src={"/assets/icons/comment.svg"}
                    alt="comment"
                    width={16}
                    height={16}
                  ></Image>
                  <p className="text-sm text-secondary font-semibold">
                    {product.reviewsCount} Reviews
                  </p>
                </div>
              </div>
              <p className="text-sm text-black opacity-50">
                <span className="text-primary-green font-semibold">93% </span>
                of buyers have recommended this
              </p>
            </div>
          </div>
          <div className="my-7 flex flex-col gap-5">
            <div className="flex flex-wrap gap-5">
              <PriceInfoCard
                title={"Current Price"}
                iconSrc={"/assets/icons/price-tag.svg"}
                value={`${product.currency} ${formatNumber(
                  product.currentPrice
                )}`}
                borderColor={`#b6dbff`}
              ></PriceInfoCard>
              <PriceInfoCard
                title={"Average Price"}
                iconSrc={"/assets/icons/chart.svg"}
                value={`${product.currency} ${formatNumber(
                  product.currentPrice
                )}`}
                borderColor={`#b6dbff`}
              ></PriceInfoCard>
              <PriceInfoCard
                title={"Highest Price"}
                iconSrc={"/assets/icons/arrow-up.svg"}
                value={`${product.currency} ${formatNumber(
                  product.currentPrice
                )}`}
                borderColor={`#b6dbff`}
              ></PriceInfoCard>
              <PriceInfoCard
                title={"Lowest Price"}
                iconSrc={"/assets/icons/arrow-down.svg"}
                value={`${product.currency} ${formatNumber(
                  product.currentPrice
                )}`}
                borderColor={`#beffc5`}
              ></PriceInfoCard>
            </div>
          </div>
          <Modal productId={id} />
        </div>
      </div>
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-5">
          <h3 className="font-semibold text-2xl text-secondary">
            Production Description
          </h3>
          <div className="flex flex-col gap-4">
            {product?.description?.split("\n")}
          </div>
        </div>
        <button className="btn wfit mx-auto flex items-center justify-center min-w-[200px]">
          <Image
            src={"/assets/icons/bag.svg"}
            alt="check"
            width={22}
            height={22}
          ></Image>
          <Link href={"/"} className="text-base text-white">
            Buy Now
          </Link>
        </button>
      </div>
      {similarProducts && similarProducts.length > 0 && (
        <div className="py-14 flex flex-col gap-2 w-full">
          <p className="section-text">Similar Products</p>
          <div className="flex flex-wrap gap-10 mt-7 w-full">
            {similarProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
