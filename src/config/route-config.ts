import { lazy } from 'react'
import { Redirect } from 'react-router-dom'
import { PrivateRoute } from '../routes/PrivateRoute'
//path
export const productPath = '/a/product'
export const employeePath = '/a/employee'
export const profilePath = '/a/user-profile'
export const productCategoryPath = '/a/type/product-category'
export const vipPath = '/a/type/vip'
export const discountPath = '/a/type/discount'

const Admin = lazy(() => import('../layout/Admin/Admin'))
const ProductPage = lazy(() => import('../redux/container/Product'))
const ProductCategoryPage = lazy(() => import('../redux/container/ProductCategory'))
const VIPPage = lazy(() => import('../redux/container/VIP'))
const DiscountPage = lazy(() => import('../redux/container/Disccount'))
const ConstantTypePage = lazy(() => import('../redux/container/ConstantType'))
const EmployeePage = lazy(() => import('../redux/container/Employee'))
const LoginPage = lazy(() => import('../pages/Login/Login'))
const ProfilePage = lazy(() => import('../pages/Profile/Profile'))

export const routes = [
    {
        path: '/',
        customRoute: Redirect,
        to: '/a',
        exact: true,
    },
    {
        path: '/login',
        component: LoginPage,
    },
    {
        path: '/a',
        component: Admin,
        customRoute: PrivateRoute,
        routes: [
            {
                path: '/a',
                exact: true,
                customRoute: Redirect,
                to: '/a/product'
            },
            {
                path: '/a/type',
                customRoute: Redirect,
                to: '/a/type/product-category',
                exact: true
            },
            {
                path: '/a/type/product-category',
                component: ProductCategoryPage
            },
            {
                path: '/a/type/vip',
                component: VIPPage
            },
            {
                path: '/a/type/discount',
                component: DiscountPage
            },
            {
                path: '/a/type/orther',
                component: ConstantTypePage
            },
            {
                path: '/a/product',
                component: ProductPage
            },
            {
                path: '/a/employee',
                component: EmployeePage
            },
            {
                path: '/a/user-profile',
                component: ProfilePage
            }
        ]
    }
]