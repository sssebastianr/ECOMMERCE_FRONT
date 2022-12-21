import React,{ useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useNavigate } from 'react-router-dom';
import crud from '../conexiones/crud';
import swal from 'sweetalert';

const CrearCategoria = () => {
  
  const navigate = useNavigate();

  const [categoria, setCategoria ] = useState({
    nombre:'',
    imagen:''
  });

  const { nombre, imagen } = categoria;


  const onChange = (e) =>{
      setCategoria({
        ...categoria,
        [e.target.name]: e.target.value
      })
  };

  const ingresarCategoria = async () =>{
    const data = {
      nombre: categoria.nombre,
      imagen: categoria.imagen
    }
   //console.log(data);
   const response = await crud.POST(`/api/categoria`, data);
   const mensaje = response.msg;
    const mensaje1 = "La categoria fue creada correctamente";
    swal({
      title:'Informacion',
      text: mensaje1,
      icon: 'success',
      buttons:{
        confirm:{
          text:'OK',
          value: true,
          visible: true,
          className: 'btn btn-primary',
          closeModal: true
        }
      }
   });
   //Redireccionar nuevamente a Admin
   navigate("/admin");
    
  };

  const onSubmit = (e) =>{
    e.preventDefault();
    ingresarCategoria();
  }


  return (
    <>
      <Header/>
      <div className="md:flex md:min-h-screen">
        <Sidebar/>
        <main className="flex-1">
        <div className="mt-10 flex justify-center">
        <h1 className="inline bg-gradient-to-r from-white via-white to-white bg-clip-text font-display text-5xl tracking-tight text-transparent">
          CREAR CATEGORIA
        </h1>
        </div>

        <div className="mt-10 flex justify-center">
        <form 
        onSubmit={onSubmit}
        className="my-10 bg-white shadow rounded-lg p-10"
    >
      <div className="my-5">
        <label className="uppercase text-gray-600 block text-lx font-bold">Nombre de la categoria</label>
        <input 
        type="nombre"
        id="nombre"
        name="nombre"
        placeholder="Nombre"
        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
        value={nombre}
        onChange={onChange}
        />

          <label className="uppercase text-gray-600 block text-lx font-bold">Imagen de la categoria</label>
        <input 
        type="text"
        id="imagen"
        name="imagen"
        placeholder="Imagen"
        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
        value={imagen}
        onChange={onChange}
        />

       
      </div>
      <input 
          type="submit"
          value="Crear Categoria"
          className="bg-cyan-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-cyan-200 transition-colors"
      />

  </form>
        </div>

        </main>
        
     
      </div>
    
    
    </>
    );
}

export default CrearCategoria;