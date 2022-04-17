import React from "react";
import { useCart } from "react-use-cart";
import { Itemcard } from "./Cursosfake";
import { Cart } from "./Carritofinal";
import { CartProvider } from "react-use-cart";
import "../../styles/carritofinal.css";
import bootstrap from '../../img/bootstrap.jpg';
import excel from '../../img/excel.png';
import excel2 from '../../img/excel2.png';
import python from '../../img/python.png';
import idiomas from '../../img/idiomas.jpg';
import idiomas2 from '../../img/idiomas2.jpg';
import idiomas3 from '../../img/idiomas3.jpg';
import idiomas4 from '../../img/idiomas4.jpg';

export const CarroFuncional = () => {

    return (
        <>
            <h1 className="text-center mt-3">Revisa todos los cursos</h1>
            <section id="muestrario" className="py-4 container">
                <div className="row justify-content-center">
                    <CartProvider>
                        <div className="col-8" id="supercontainertarjetas">
                            {data.cursosData.map((item, index) => {
                                return (

                                    <Itemcard id={item.id} img={item.img} item={item} name={item.name} description={item.description} price={item.price} key={index} />
                                )
                            })}
                        </div>
                        <div className="col-4">
                            <Cart />
                        </div>

                    </CartProvider>
                </div>
            </section>

        </>
    )
}


export const data = {
    cursosData: [
        {
            id: 1,
            img: excel,
            name: "Excel intermedio",
            description: "Curso para aprender excel intermedio",
            categoría: "Informática",
            price: 35000
        },
        {
            id: 2,
            img: excel2,
            name: "Excel avanzado",
            description: "Curso para aprender excel avanzado",
            categoría: "Informática",
            price: 50000
        },
        {
            id: 3,
            img: idiomas,
            name: "Inglés Intermedio",
            description: "Curso para aprender inglés intermedio",
            categoría: "Idiomas",
            price: 40000
        },
        {
            id: 4,
            img: idiomas2,
            name: "Inglés avanzado",
            description: "Curso para aprender inglés avanzado",
            categoría: "Idiomas",
            price: 79000
        },
        {
            id: 5,
            img: python,
            name: "Aprende Python",
            description: "Curso para aprender Python",
            categoría: "Informática",
            price: 35000
        },
        {
            id: 6,
            img: idiomas3,
            name: "Aprende chino mandarín",
            description: "Curso para aprender chino mandarin",
            categoría: "Idiomas",
            price: 100000
        },
        {
            id: 7,
            img: bootstrap,
            name: "Aprende Bootstrap 5",
            description: "Curso para aprender Bootstrap",
            categoría: "Informática",
            price: 45000
        },
        {
            id: 8,
            img: idiomas4,
            name: "Aprende español principiante",
            description: "Curso de inducción al idioma español",
            categoría: "Idiomas",
            price: 37990
        },
    ]
}