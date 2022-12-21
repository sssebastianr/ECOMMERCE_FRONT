import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import crud from "../conexiones/crud";
import Header from "./Header";
import Sidebar from "./Sidebar";
import swal from 'sweetalert';


const Admin = () => {

  const navigate = useNavigate();  

  useEffect(()=>{
    const autenticarUsuario = async () =>{
      const token = localStorage.getItem('token')
      //console.log(token)
      if(!token){
        navigate("/login");
      }
    }
    autenticarUsuario()
  },[navigate]); //Se utilizan [] para que se ejecute solo una vez

  const [categoria, setCategoria] = useState([]);

  const cargarCategoria = async () => {
    const response = await crud.GET(`/api/categoria`);
    console.log(response);
    setCategoria(response.categoria);
  } 

  useEffect (() => {
    cargarCategoria();
  },[]);

  const borrarCategoria = async (e, idCategoria) => {
    swal({
      title: "Estas seguro de eliminar esta categoria?",
      text: "Una vez eliminada, no podras recuperar esta categoria",
      icon: "warning",
      buttons: true,
      dangerMode: true,   
    })
    .then((willDelete) => {
      if(willDelete) {

        e.preventDefault();
        const response = crud.DELETE(`/api/categoria/${idCategoria}`);        
        //console.log(response.msg);
        const mensaje = response.msg;        
        if(response){
          swal("La categoria ha sido eliminada correctamente",{
            icon: "succes",
          });
        }
        cargarCategoria();        
      }else{
        swal("Se cancelo la accion");
      }
    });
        
  }

  const actualizarCategoria = async ( idCategoria ) => {
    
    navigate(`/actualizar-categoria/${idCategoria}`)
  }

  const crearProducto = async (idCategoria) =>{
    navigate(`/home-producto/${idCategoria}`);
  }


  
  return (
    <>
      <Header/>
      <div className="md:flex md:min-h-screen">
        <Sidebar/>
        <main classname="flex-1">

          <h1 className="inline bg-gradient-to-r from-white via-white to-white bg-clip-text font-display text-5xl tracking-tight text-transparent">
            CATEGORIAS
          </h1>

          <div>

            <table>

              <thead className = "bg-cyan-50">

                <tr>

                  <th>IMAGEN</th>
                  <th>NOMBRE</th>
                  <th>ID</th>
                  <th>OPCIONES</th>

                </tr>

              </thead>

              <tbody className="bg-white">
                {
                  categoria.map(
                    item =>
                    <tr key = {item._id}>
                      <td><img src={item.imagen} width="150" height="150"></img></td>
                      <td>{item.nombre}</td>
                      <td>{item._id}</td>
                      <td>
                        <input 
                          type="submit"
                          value="Eliminar"
                          className="bg-red-400 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-red-100 transition-colors"
                        onClick={(e) => borrarCategoria(e, item._id)}

                        />

                          <input 
                          type="submit"
                          value="Actualizar"
                          className="bg-cyan-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-cyan-200 transition-colors"
                          onClick={(e) => actualizarCategoria(item._id)}
                        />

                        <input 
                          type="submit"
                          value="Crear producto"
                          className="bg-cyan-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-cyan-200 transition-colors"
                          onClick={(e) => crearProducto(item._id)}
                        />
                      </td>
                    </tr>
                  )
                }

              </tbody>

            </table>

          </div>

        </main>  
      
      </div>

    </>
    );

  }

export default Admin;