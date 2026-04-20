'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useBreadcrumbStore } from '@/stores/breadcrumbStore';
import cn from 'classnames';
import Button from '@/components/shared/Button';
import { useRouter } from 'next/navigation';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import IProduct from '@/types/IProduct';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import Breadcrumb from '@/components/shared/Breadcrumb';
import Select from '@/components/shared/Select';
import ProductItem from '@/components/site/ProductItem';
import ProductGallery from '@/components/site/ProductGallery';
import ProductPrice from '@/components/site/ProductPrice';
import ProductTags from '@/components/site/ProductTags';

interface Props {
  product: any;
  initialSelectedVariants: {
    [key: string]: string;
  };
  recommendedProducts: IProduct[];
}

const ProductContainer = ({
  product,
  initialSelectedVariants,
  recommendedProducts = [],
}: Props) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const { setSteps } = useBreadcrumbStore();
  const { addCart, removeCart, cart } = useCartStore();

  const [selectedVariants, setSelectedVariants] = useState<{
    [key: string]: string;
  }>(initialSelectedVariants);

  const selectedVariantParams = useMemo(() => {
    return Object.keys(selectedVariants)
      .map((key) => `${key}=${selectedVariants[key]}`)
      .join('&');
  }, [selectedVariants]);

  const handleClickValue = (title: string, value: string) => {
    setSelectedVariants((pre) => ({
      ...pre,
      [title]: value,
    }));

    const objVariants = { ...selectedVariants, [title]: value };
    const params = Object.keys(objVariants)
      .map((key) => `${key}=${objVariants[key]}`)
      .join('&');

    if (Object.keys(params).length < product.variants.length) return;
    router.push(`/${product.categories[0].slug}/${product.slug}?${params}`);
  };

  useEffect(() => {
    setSteps([
      {
        title: product.categories[0].title,
        path: `/${product.categories[0].slug}`,
      },
      {
        title: product.title,
        path: `/${product.categories[0].slug}/${product.slug}${
          selectedVariantParams ? `?${selectedVariantParams}` : ''
        }`,
      },
    ]);
  }, [product, selectedVariantParams, setSteps]);

  return (
    <>
      <div className="w-full max-w-[1240px] mx-auto flex flex-col gap-6 md:gap-12 px-4 sm:px-6 md:px-8">
        <Breadcrumb className="-mb-2 md:-mb-4" />

        <div className="w-full flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8">
          <ProductGallery
            product={product}
            title={product.title}
            images={product.images || []}
            thumbnail={product.thumbnail}
          />

          <div className="flex-1 w-full flex flex-col gap-3 md:gap-4 mt-4 lg:mt-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight mt-0 md:mt-1">
              {product.title}
            </h1>

            <div className="-mt-1 md:-mt-2">
              <ProductTags tags={product.tags} />
            </div>

            <ProductPrice
              price={product.price}
              discountPrice={product.discountPrice}
            />

            <p className="text-xs text-gray-500 -mt-2 opacity-50">
              KDV dahildir
            </p>

            {product.type == 'VARIABLE' &&
              product.variants.map((variant: any, variantIndex: number) => (
                <section key={variantIndex} className="flex flex-col gap-1">
                  <h2 className="font-medium text-slate-700">
                    {variant.title}:
                  </h2>

                  {variant.type == 'BUTTON' && (
                    <div
                      className={cn(
                        'w-full',
                        'grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2 flex-wrap'
                      )}
                    >
                      {variant.values.map((value: any, valueIndex: number) => (
                        <button
                          key={valueIndex}
                          className={cn(
                            'w-full h-[36px] sm:h-[40px]',
                            'rounded-md border-2 border-slate-200 box-border',
                            'flex items-center justify-center',
                            'text-xs sm:text-sm text-center text-slate-400 font-semibold',
                            'transition-all duration-300',
                            'relative',
                            'hover:border-primary-100 hover:text-primary-300 hover:bg-primary-100/25',
                            {
                              '!border-primary-100 !text-primary-300 bg-primary-100/25':
                                selectedVariants[variant.title] == value.title,
                            }
                          )}
                          onClick={() =>
                            handleClickValue(variant.title, value.title)
                          }
                        >
                          {selectedVariants[variant.title] == value.title && (
                            <IoIosCheckmarkCircle
                              size={20}
                              className="text-primary-300 absolute -top-2 -right-2 z-10 sm:text-2xl sm:-top-2.5 sm:-right-2.5"
                            />
                          )}
                          {value.title}
                        </button>
                      ))}
                    </div>
                  )}

                  {variant.type == 'COLOR' && (
                    <div
                      className={cn(
                        'w-full',
                        'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 flex-wrap'
                      )}
                    >
                      {variant.values.map((value: any, valueIndex: number) => (
                        <button
                          key={valueIndex}
                          className={cn(
                            'w-full min-h-[36px] sm:min-h-[40px]',
                            'p-1 sm:p-2',
                            'rounded-md border-2 border-slate-200 box-border',
                            'flex flex-col items-center justify-center gap-1 sm:gap-1.5',
                            'text-xs sm:text-sm text-center text-slate-400 font-semibold',
                            'transition-all duration-300',
                            'relative',
                            'hover:border-primary-100 hover:text-primary-300 hover:bg-primary-100/25',
                            {
                              '!border-primary-100 !text-primary-300 bg-primary-100/25':
                                selectedVariants[variant.title] == value.title,
                            }
                          )}
                          onClick={() =>
                            handleClickValue(variant.title, value.title)
                          }
                        >
                          {selectedVariants[variant.title] == value.title && (
                            <IoIosCheckmarkCircle
                              size={20}
                              className="text-primary-300 absolute -top-2 -right-2 z-10 sm:text-2xl sm:-top-2.5 sm:-right-2.5"
                            />
                          )}
                          <div
                            className="w-[12px] min-w-[12px] h-[12px] min-h-[12px] sm:w-[15px] sm:min-w-[15px] sm:h-[15px] sm:min-h-[15px] rounded-full border border-slate-200"
                            style={{ backgroundColor: value.value }}
                          ></div>
                          {value.title}
                        </button>
                      ))}
                    </div>
                  )}

                  {variant.type == 'SELECT' && (
                    <div className="w-full">
                      <Select
                        value={selectedVariants[variant.title]}
                        options={variant.values.map((i: any) => ({
                          label: i.title,
                          value: i.title,
                        }))}
                        onSelect={(value) =>
                          handleClickValue(variant.title, value)
                        }
                        className="w-full sm:w-[175px] sm:min-w-[175px]"
                      />
                    </div>
                  )}
                </section>
              ))}

            {product.status === 'PUBLISHED' && parseInt(product.stock) > 0 ? (
              cart.findIndex((i) => i.id == product.id) == -1 ? (
                <Button
                  size="large"
                  color="primary"
                  onClick={() =>
                    user ? addCart(product) : router.push('/giris-yap')
                  }
                  className="mt-2"
                >
                  Sepete Ekle
                </Button>
              ) : (
                <Button
                  size="large"
                  color="red"
                  onClick={() => removeCart(product)}
                  className="mt-2"
                >
                  Sepetten Çıkar
                </Button>
              )
            ) : product.status === 'PUBLISHED' && parseInt(product.stock) === 0 ? (
              <Button
                size="large"
                color='black'
                disabled
                className="mt-2"
              >
                Stokta Yok
              </Button>
            ) : (
              <Button
                color='black'
                size="large"
                disabled
                className="mt-2"
              >
                Satışta Değil
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 group">
          <h2 className="text-lg sm:text-xl font-bold relative">
            Açıklama
            <div className="w-[30px] sm:w-[50px] h-[2px] bg-primary-400 mt-1 sm:mt-2 transition-all duration-500 absolute top-full left-1/2 -translate-x-1/2 group-hover:w-[100%]"></div>
          </h2>
          <p className="w-full max-w-full sm:max-w-[90%] md:max-w-[85%] text-slate-500 mt-3 md:mt-4 text-center text-sm sm:text-base">
            {product.summary.length > 0 ? (
              product.summary
            ) : (
              <span className="text-gray-400 italic">Henüz açıklama yok</span>
            )}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 group">
          <h2 className=" text-lg sm:text-xl font-bold relative">
            Detaylar
            <div className="w-[30px] sm:w-[50px] h-[2px] bg-primary-400 mt-1 sm:mt-2 transition-all duration-500 absolute top-full left-1/2 -translate-x-1/2 group-hover:w-[100%]"></div>
          </h2>
          <div
            className="w-full max-w-full sm:max-w-[90%] md:max-w-[85%] text-slate-500 mt-3 md:mt-4 text-sm sm:text-base"
            dangerouslySetInnerHTML={{
              __html:
                product.description.length > 0
                  ? product.description
                  : '<span class="text-gray-400 italic">Henüz detay yok</span>',
            }}
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-6 md:gap-8 max-w-[1200px] mx-auto mt-12 sm:mt-16 md:mt-24 px-4 sm:px-6 md:px-8">
        <section className="flex flex-col gap-3 md:gap-4 group mt-6 sm:mt-8 md:mt-12">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold relative">
              Benzer Ürünlerimize Göz Atın
              <div className="w-[30px] sm:w-[50px] h-[2px] bg-primary-400 mt-1 transition-all duration-500 absolute top-full left-0 group-hover:w-full"></div>
            </h2>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
            {[...recommendedProducts].map((product, index) => (
              <ProductItem key={index} {...product} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductContainer;
