import { FirebaseServices } from "../../../services/firebase"
import { collections, sub_collections, types_docs } from "../../../constant/FirebaseEnum"
import { IProductCategory } from "../../../model/IProductCategory";
import { undefinedError } from "../../../constant";


export const getProductCategoriesAPI = async () => {
    const categoryCollectionRef = FirebaseServices.generalLV1SubCollectionRef(collections.types, types_docs.product_category, sub_collections.types)
    try {
        const querySnapshot = await categoryCollectionRef.orderBy("createAt", "desc").get();
        return querySnapshot.docs.map(doc => {
            const category: IProductCategory = {
                id: doc.data().id,
                name: doc.data().name,
                createAt: doc.data().createAt.toDate(),
                updateAt: doc.data().updateAt.toDate(),
                isDeleted: doc.data().isDeleted
            }
            return category
        });
    }
    catch (error) {
        return [error, undefinedError]
    }
}

export const addProductCategoryAPI = async (category: IProductCategory) => {
    const categoryDocsRef = FirebaseServices.generalLV1SubCollectionRef(collections.types, types_docs.product_category, sub_collections.types).doc()
    const id = categoryDocsRef.id

    try {
        const newCategory = { ...category, id }
        await categoryDocsRef.set(newCategory)
        return newCategory
    } catch (error) {
        return [error, undefinedError]
    }
}

export const updateProductCategoryAPI  = async (category: IProductCategory) => {
    const categoryDocsRef = FirebaseServices
        .generalLV1SubCollectionRef(collections.types, types_docs.product_category, sub_collections.types)
        .doc(category.id)
    try {
        const categoryClone: IProductCategory = {...category, updateAt: new Date()}
        delete categoryClone.createAt
        delete categoryClone.id
        await categoryDocsRef.update(categoryClone)
        return {...category, ...categoryClone}
    } catch (error) {
        return [error, undefinedError]
    }
}

export const deleteProductCategoryAPI  = async (id: string) => {
    const categoryDocsRef = FirebaseServices
        .generalLV1SubCollectionRef(collections.types, types_docs.product_category, sub_collections.types)
        .doc(id)
    try {
        await categoryDocsRef.update({isDeleted: true})
        return id
    } catch (error) {
        return [error, undefinedError]
    }
}