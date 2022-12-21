import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import crud from "../conexiones/crud";
import swal from 'sweetalert';

const Login = () => {

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState ({
    email:'', 
    password:''    
  });
  
  const {email, password}=usuario;

  const onChange = (e) => {
      setUsuario({
        ...usuario,
        [e.target.name]: e.target.value
      })
  };

  const ingresarCuenta = async () =>{

    const data = {
      email: usuario.email,
      password: usuario.password
    }
    console.log(data);
    const response = await crud.POST(`/api/auth`, data);
    const mensaje = response.msg;
      console.log(mensaje);
      if(mensaje === "el usuario no existe"){
        const mensaje = "el usuario no existe";
      swal({
        title:'Error',
        text: mensaje,
        icon: 'error',
        buttons:{
          confirm:{
            text:'OK',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      });

      }else if(mensaje === "password incorrecto"){
        const mensaje = "password incorrecto";
      swal({
        title:'Error',
        text: mensaje,
        icon: 'error',
        buttons:{
          confirm:{
            text:'OK',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      });
      }else{
        const jwt = response.token;        

        //Aqui se guarda la informacion en el Local Storage
        localStorage.setItem('token', jwt);

        // Redireccionar nuevamente a la pagina de login
        navigate("/admin");
      }  
      
      
      
  };


  const onSubmit = (e) =>{
    e.preventDefault();
    ingresarCuenta();
  }

  
  return (
    <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
    <div className='md:w-2/3 lg:w-2/5'>
    <h1 className="inline bg-gradient-to-r from-white via-white to-white bg-clip-text font-display text-5xl tracking-tight text-transparent">
        INICIAR SESIÓN
      </h1>
      <form 
      onSubmit={onSubmit}
      className="my-10 bg-white shadow rounded-lg p-10"
      >
        <div className="my-5">
          <label className="uppercase text-gray-900 block text-lx font-bold">Email</label>
          <input 
          type="email"
          id="email"
          name="email"
          placeholder="Email de Registro"
          className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          value={email}
          onChange={onChange}
          />

          <label className="uppercase text-gray-900 block text-lx font-bold">Password</label>
          <input 
          type="password"
          id="password"
          name="password"
          placeholder="Password de Registro"
          className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          value={password}
          onChange={onChange}
          />
        </div>
        <input 
            type="submit"
            value="Iniciar Sesión"
            className="bg-cyan-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-cyan-200 transition-colors"
        />

        <Link
          className="block text-center my-5 "
        to={"/crear-cuenta"}
        >
          Crear Cuenta
        </Link>
    </form>
    
    </div>
      
    </main>
    );

  }

export default Login;