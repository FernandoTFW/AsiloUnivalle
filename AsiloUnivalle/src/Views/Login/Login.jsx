import React, { useState } from 'react';
import { Link, useNavigate   } from 'react-router-dom';
import axios from 'axios';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  const navigate = useNavigate(); 
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Email:', email);
    console.log('Password:', password);
    try {
      const response = await axios.post('https://localhost:7018/api/Asiloes/login', {
        email,
        password,
      });

      if (response.status === 200) {
        // El inicio de sesión fue exitoso
        const token = response.data.token;
        // Guardar el token en el almacenamiento local o en el estado de la aplicación

        // Establecer el estado de inicio de sesión a true
        setLoggedIn(true);

        console.log('Usuario corecto');
        navigate('/hello');
      } else {
        // El inicio de sesión falló
        const errorMessage = response.data.message;
        // Mostrar el mensaje de error en la interfaz de usuario

        
      }
    } catch (error) {
      // Manejar errores de red u otros errores de solicitud
      console.error('Error:', error);
    }
  };

 

  return (
    <div className="bg-white m-4 p-5 rounded-md w-full xl:h-[500px]  md:w-[500px] lg:w-[600px] xl:w-[900px]">
      <form
        className="bg-white shadow-md rounded m-auto p-10 w-full max-w-xl"
        style={{ maxWidth: '600px' }}
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <Link to="/register">Registro</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
