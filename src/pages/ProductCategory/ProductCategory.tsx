import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import './ProductCategory.scss'
import { Header } from "../../components/common/Header/Header";
import { ProductCategoryPanel } from "../../components/ManageProductCategory/Panel/Panel";
import { ListProductCategory } from "../../components/ManageProductCategory/ListProductCategory/ListProductCategory";
import { productCategoryPath } from "../../config/route-config";
import { AddProductCategory } from "../../components/ManageProductCategory/AddProductCategory/AddProductCategory";
import { EditProductCategory } from "../../components/ManageProductCategory/EditProductCategory/EditProductCategory";
import { Empty } from "antd";
const ProductCategoryPage = ({
    categories,
    isFetching,
    fetchProductCategories,
    requestAddProductCategory,
    requestEditProductCategory,
    requestDeleteProductCategory,
}: any) => {
    useEffect(() => {
        if (categories.length < 1) {
            fetchProductCategories()
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="product-category">
            <Header title="Product Category" />
            <div className="product-category__wrapper">
                <div className="product-category__wrapper-left">
                    <ProductCategoryPanel />
                    <ListProductCategory 
                    isFetching={isFetching}
                    requestEditProductCategory={requestEditProductCategory} 
                    requestDeleteProductCategory={requestDeleteProductCategory} 
                    categories={categories} />
                </div>
                <div className="product-category__wrapper-right">
                    <Switch>
                        <Route exact path={`${productCategoryPath}`} render={() => <Empty />} />
                        <Route path={`${productCategoryPath}/add`} render={props => (
                            <AddProductCategory
                                {...props}
                                isFetching={isFetching}
                                requestAddProductCategory={requestAddProductCategory}
                            />
                        )} />
                        <Route path={`${productCategoryPath}/edit/:id`} render={props => {
                            const id = props.match.params.id;
                            const category = categories.find((item: any) => item.id === id)
                            return (
                                <EditProductCategory
                                    {...props}
                                    category={category ? category : false}
                                    requestEditProductCategory={requestEditProductCategory}
                                />)
                        }} />
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default ProductCategoryPage