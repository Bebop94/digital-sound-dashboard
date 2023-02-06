import React from 'react';
import ChartRow from './ChartRow';
import { useState, useEffect, useRef} from 'react';

let tableRowsData = [
    {
        Title: 'Billy Elliot ',
        Length: '123',
        Rating: '5',
        Categories: ['Drama','Comedia'],
        Awards: 2
    },
    {
        Title: 'Alicia en el país de las maravillas',
        Length: '142',
        Rating: '4.8',
        Categories: ['Drama','Acción','Comedia'],
        Awards: 3
    },
    
]


function Chart (){

    const [productsData, setProductsData] = useState([])

    function getProductsData() {
        fetch(`/api/products`)
        .then(res => res.json())
        .then(data => {
            setProductsData(data.products)
        })
    }

    useEffect(() => {
        getProductsData()
    }, [])

    return (
        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Categoria</th>
                                <th>Precio</th>
                                {/* <th>Categoria</th> */}
                                <th>Stock</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Nombre</th>
                                <th>Categoria</th>
                                <th>Precio</th>
                                {/* <th>Categoria</th> */}
                                <th>Stock</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {
                            productsData.map( ( row , i) => {
                                return <ChartRow { ...row} key={i}/>
                            })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default Chart;