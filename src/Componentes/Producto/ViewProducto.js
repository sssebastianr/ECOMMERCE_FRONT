import react, { Component } from 'react';

export const ViewProducto = ({producto}) =>{

    const {nombre, descripcion, stock, precio, imagen} = producto;



    return(
        <div className='border-b p-5 flex justify-between items-center'>
            <div className='flex flex-col items-start'>
                <p className='mb-1 text-xl text-gray-50'>nombre{nombre}</p>
                <p className='mb-1 text-sm text-gray-50 uppercase'>descripcion{descripcion}</p>
                <p className='mb-1 text-gray-50'>stock{stock}</p>
                <p className='mb-1 text-gray-50'>precio{precio}</p>
                <img src ={imagen} width ="150" height="150">
                </img>
                
                
            </div>

            <div className='flex flex-col lg:file-row gap-2'>
            <button
                          className="bg-cyan-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                          //onClick={() => handleModalEditarTarea(tarea)}
                      >Editar</button>

                    <button
                          className="bg-red-400 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                         // onClick={() => handleModalEliminarTarea(tarea)}
                      >Eliminar</button>

            </div>
            
        </div>
    )
}

export default ViewProducto;