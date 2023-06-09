import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HelloWorld = () => {
  const navigate = useNavigate();

  // Obtener los datos del usuario desde el almacenamiento local
  const userData = JSON.parse(localStorage.getItem('userData'));

  const handleLogout = () => {
    // Eliminar los datos de inicio de sesión del almacenamiento local
    localStorage.clear();

    // Redireccionar al inicio de sesión
    navigate('/login');
  };

  const openWhatsApp = () => {
    const phoneNumber = userData.celular; // Obtener el número de teléfono desde userData
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <div className="bg-gradient-to-br from-red-100 via-red-300 to-blue-500 min-h-screen flex items-center justify-center">
        <div className="bg-white m-4 p-5 rounded-md">
          <h1 className="text-2xl text-black font-bold mb-4">¡Hola Mundo!</h1>
          {userData && (
            <p className="text-2xl text-black font-bold mb-4">
              ¡Bienvenido, {userData.nombre}! Tu correo electrónico es {userData.email}.
            </p>
          )}
          <Link className='bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4' to={`/report/${2}`}>Reporte</Link>
          <Link className='bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4' to={`/lista/${2}`}>Lista Pendientes</Link>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            onClick={openWhatsApp}
          >
            Contactar por WhatsApp
          </button>
        </div>
      </div>
    </>
  );
};

export default HelloWorld;
