import React, { useEffect } from 'react'
import MetaData from '../components/layouts/MetaData'
import { useGetProductsQuery } from '../redux/api/productsApi';
import ProductItem from '../components/products/ProductItem';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const Home = () => {

    const { data, isLoading, error, isError } = useGetProductsQuery()
   
    useEffect(() => {
        if(isError){
            toast.error(error?.data?.message)
        }
      }, [isError]);

  if(isLoading) return <Loader />

  return (
    <>
    <MetaData title="Buy Best Products From Prasan Store" />
    <div className="row">
        <div className="col-6 col-md-12">
        <h1 id="products_heading" className="text-secondary">
            Latest Products
        </h1>
        <section id="products" className="mt-5">
            <div className="row">
            {
             data?.products?.map((product) =>{
                return (
                    <ProductItem product={product}  key={product?._id} />
                )
             })   
            }
            </div>
        </section>
        </div>
    </div>
    </>
  )
}

export default Home