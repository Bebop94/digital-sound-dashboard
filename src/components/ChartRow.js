import React from 'react';


function ChartRow(props){
    return (
                <tr>
                    <td>{props.product_name}</td>
                    <td>{props.category}</td>
                    <td>{props.product_price}</td>
                    <td>{props.product_stock}</td>
                </tr>
            )
    }
    
        

export default ChartRow;