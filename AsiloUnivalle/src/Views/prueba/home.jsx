import React from 'react';
import { Link, useNavigate   } from 'react-router-dom';

const HelloWorld = () => {
  return (
    <>
     <div className="bg-white m-4 p-5 rounded-md">
      <h1 className="text-2xl text-black font-bold mb-4">¡Hola Mundo!</h1>
      <p className="text-2xl text-black font-bold mb-4">Bienvenido a la página de "Hola Mundo". Aquí puedes mostrar contenido adicional o funcionalidades específicas.</p>
      <Link to={`/report/${1}`}>Reporte</Link>
    
    </div>
   
    </>
   
    
  );
};

export default HelloWorld;
