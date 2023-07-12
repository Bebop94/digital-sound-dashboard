import React from 'react';
import { useState, useEffect, useRef} from 'react';

// import noPoster from '../assets/images/no-poster.jpg';

function SearchProducts(){

	const [products, setProducts] = useState([]);

	const [keyword, setKeyword] = useState(null)

	const searchKeyword = useRef();

	useEffect(() => {
		console.log(keyword)
		fetch(`/api/products/${keyword}`)
		.then(res => res.json())
		.then(data => {
			setProducts(data.products)
		})
	}, [keyword]);

	const searchProduct = async(e) => {
		e.preventDefault()
		console.log('executing')
		await setKeyword(searchKeyword.current.value)
	}

	// Credenciales de API
	// const apiKey = 'f819b810'; // Intenta poner cualquier cosa antes para probar

	return(
		<div className="container-fluid">
			{
				<>
					<div className="row my-4">
						<div className="col-12 col-md-6">
							{/* Buscador */}
							<form onSubmit={searchProduct} method="GET">
								<div className="form-group">
									<label htmlFor="">Buscar por título:</label>
									<input ref={searchKeyword} type="text" className="form-control" />
								</div>
								<button className="btn btn-info" type='submit'>Search</button>
							</form>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2>Películas para la palabra: {keyword}</h2>
						</div>
						{/* Listado de películas */}
						{
							products.length > 0 && products.map((product, i) => {
								return (
									<div className="col-sm-6 col-md-3 my-4" key={i}>
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h5 className="m-0 font-weight-bold text-gray-800">{product.product_name}</h5>
											</div>
											<div className="card-body">
												<div className="text-center">
													<img 
														className="img-fluid px-3 px-sm-4 mt-3 mb-4" 
														src={product.imagen}
														alt={product.product_name} 
														style={{ width: '90%', height: '400px', objectFit: 'cover' }} 
													/>
												</div>
												<p>{product.Year}</p>
											</div>
										</div>
									</div>
								)
							})
						}
					</div>
					{ products.length === 0 && <div className="alert alert-warning text-center">No se encontraron películas</div>}
				</>
			}
		</div>
	)
}

export default SearchProducts;
