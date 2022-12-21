import React,{ useEffect, useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Link, useNavigate, useParams } from 'react-router-dom';
import crud from "../../conexiones/crud";
import ViewProducto from "./ViewProducto";


const HomeProducto = () => {
  
  const navigate = useNavigate();

  const {idCategoria} = useParams();

  const [producto, setProducto] = useState([]);

  const cargarProducto = async () => {
    const response = await crud.GET(`/api/producto/${idCategoria}`);
    setProducto(response);
  };

  console.log(producto);
    
  useEffect(()=>{
    cargarProducto();
  },[]);

  return (
    <>
      <Header/>
      <div className="md:flex md:min-h-screen">
        <Sidebar/>
        <main className="flex-1">
        <div className="mt-10 flex justify-center">
        <h1 className="text-white to-indigo-cyan bg-clip-text font-display text-5xl tracking-tight text-transparent">
          PRODUCTOS DISPONIBLES
        </h1>
        </div>
        <div classname="p-10">
         
            <Link            
              to={`/crear-producto/${idCategoria}`}
              className="bg-cyan-600 w-full p-3 text-white uppercase font-bold mt-5 text-center rounded-lg">
                Crear producto                       
            </Link>

        </div>

        <div classname="bg-cyan-600 shadow-mt-10 rounded-lg">
          {producto.map( producto => 
             <ViewProducto
             key={producto._id}
             producto = {producto}
             />
          )};

        </div>       

        </main>
        
     
      </div>
    
    
    </>
    );
}

export default HomeProducto;