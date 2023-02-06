import React from 'react';
import SmallCard from './SmallCard';
import { useState, useEffect, useRef} from 'react';
// import axios from 'axios';

/*  Cada set de datos es un objeto literal */

function ContentRowMovies(){

    const [productCount, setProductCount] = useState([])
    const [categoryCount, setCategoryCount] = useState([])
    const [userData, setUserData] = useState([])

    useEffect(() => {
        fetch(`/api/products`)
        .then(res => res.json())
        .then(data => {
            setProductCount(data.count)
            setCategoryCount(Object.keys(data.countByCategory))
        })
        // .catch(console.log('Error en el fetch'))
    }, []);

    useEffect(() => {
        fetch(`/api/users`)
        .then(res => res.json())
        .then(data => {
            setUserData(data.count)
        })
        // .catch(console.log('Error en el fetch'))
    }, []);

    /* <!-- Movies in DB --> */
    let productsInDB = {
        title: 'Products in Data Base',
        color: 'primary', 
        quantity: productCount,
        icon: 'fa-clipboard-list'
    }

    /* <!-- Total awards --> */

    let totalUsers = {
        title:' Total Users', 
        color:'success', 
        quantity: userData,
        icon:'fa-user-check'
    }
    
    /* <!-- Actors quantity --> */
    
    let categoriesInDB = {
        title:'Category quantity' ,
        color:'warning',
        quantity: categoryCount.length,
        icon:'fa-award'
    }

    let cardProps = [productsInDB, totalUsers, categoriesInDB];

        return (
        
            <div className="row">
                
                {cardProps.map( (card, i) => {

                    return <SmallCard {...card} key={i}/>
                
                })}

            </div>
        )
    }

export default ContentRowMovies;