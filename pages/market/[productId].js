import React from 'react'
import { useRouter } from 'next/router'

const ProductDetails = () => {
    const router = useRouter()

    console.log(router.pathname);
    console.log(router.query);
    return (
        <div>
            
        </div>
    )
}

export default ProductDetails
