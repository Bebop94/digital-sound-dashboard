import React from 'react';
import errorImage from '../assets/images/404.png';
import { useState, useEffect, useRef} from 'react';

function LastCreatedProduct(){

    const [lastProduct, setLastProduct] = useState()

    function lastProductIndex() {
        fetch(`/api/products`)
        .then(res => res.json())
        .then(data => {
            let lastIndex = data.products.length-1
            setLastProduct(data.products[lastIndex])
        })
    }
    
    useEffect(() => {
        lastProductIndex()
        console.log('Last product cargado')
        console.log(lastProduct)
    }, [])

    if (lastProduct) {
    return(
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Last Created Product</h5>
                </div>
                <div className="card-body">
                <p>{lastProduct.product_name}</p>
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={lastProduct.imagen} alt="Imagen de producto"/>
                    </div>
                    <p>{lastProduct.product_description_short}</p>
                    <a className="btn btn-danger" rel='external' href='/'>View product detail</a>
                </div>
            </div>
        </div>
    )
    } else {
        return (
            <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Last Product in Data Base</h5>
                </div>
                <div className="card-body">
                <p>Loading...</p>
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={errorImage} alt="Imagen de producto"/>
                    </div>
                    <p>Loading...</p>
                    <a className="btn btn-danger" rel='external' href='/'>View product detail</a>
                </div>
            </div>
        </div>
        )
    }
}

export default LastCreatedProduct;
