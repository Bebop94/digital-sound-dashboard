import React from 'react';


function ChartRow(props){
    return (
                <tr>
                    <td>{props.product_name}</td>
                    <td>{props.category}</td>
                    <td>{props.product_price}</td>
                    {/* <td>
                        <ul>
                            {props.category.map( (category,i) => 
                                <li key={`category ${i}`}>{category}</li>
                            )}
                        </ul>
                    </td> */}
                    <td>{props.product_stock}</td>
                </tr>
            )
    }
    
        

export default ChartRow;