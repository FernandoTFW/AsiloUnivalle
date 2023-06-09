import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: -17.3312118,
  lng: -66.2285893,
};




const RegisterForm = () => {
  const [nombre, setName] = useState('');
  const [razonSocial, setRazonSocial] = useState('');
  const [nit, setNit] = useState('');
  const [representante, setRepresentante] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [telefono, setTelefono] = useState('');
  const [celular, setCelular] = useState('');

  const [direccion, setAddress] = useState('');

  const [location, setLocation] = useState(center);

  const [markerLocation, setMarkerLocation] = useState(null);


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAafA-dKEkh5lqptUl2PQa81YBqpxU41Kc',
  });

  

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setLocation({ lat, lng });
    setMarkerLocation({ lat, lng });
  };

 

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Aquí puedes realizar la lógica de envío del formulario y los datos ingresados
    console.log('Name:', nombre);
    console.log('RazonSocial:', razonSocial);
    console.log('NIT:', nit);
    console.log('Representante:', representante);

    console.log('Email:', email);
    console.log('Password:', password);
   
    console.log('Telefono:', telefono);
    console.log('Celular:', celular);

    console.log('Address:', direccion);

   if (markerLocation) {
    const { lat, lng } = markerLocation;
    console.log('Latitude:', lat);
    console.log('Longitude:', lng);

    try {
      const response = await axios.post('https://apidelasilo.azurewebsites.net/api/Asiloes', {
        nombre,
        razonSocial,
        nit,
        representante,
        email,
        password,
        telefono,
        celular,
        direccion,
        
       
        latitud: markerLocation?.lat,
        longitud: markerLocation?.lng,
      });
      console.log('Respuesta de la API:', response.data);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  }

    // Reiniciar los campos del formulario después del envío exitoso
    setName('');
    setRazonSocial('');
    setNit('');
    setRepresentante('');
    setEmail('');
    setPassword('');
    setTelefono('');
    setCelular('');
    setAddress('');
    setLocation(center);
   
    
  };

  return (
    
      <div  className="bg-gradient-to-br from-red-100 via-red-300 to-blue-500 min-h-screen  items-center justify-center">
        <h1 className=" text-black font-bold mb-5 ">Registro de Asilo</h1>
        <form onSubmit={handleSubmit} className="ml-20 mr-20 ">
          <div className="mb-4">

            <label htmlFor="nombre" className="block text-sm font-medium  text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
              value={nombre}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">

            <label htmlFor="razonSocial" className="block text-sm font-medium text-gray-700">
              Razon Social
            </label>
            <input
              type="text"
              id="razonSocial"
              className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
              value={razonSocial}
              onChange={(e) => setRazonSocial(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="nit" className="block text-sm font-medium text-gray-700">
              NIT
            </label>
            <input
              type="text"
              id="nit"
              className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
              value={nit}
              onChange={(e) => setNit(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="representante" className="block text-sm font-medium text-gray-700">
              Representante
            </label>
            <input
              type="text"
              id="representante"
              className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
              value={representante}
              onChange={(e) => setRepresentante(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
          </div>

          <div className="mb-4">
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
              Telefono
            </label>
            <input
              type="number"
              id="telefono"
              className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
            
          </div>

          <div className="mb-4">
            <label htmlFor="celular" className="block text-sm font-medium text-gray-700">
              Celular
            </label>
            <input
              type="number"
              id="celular"
              className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
            />
            
          </div>
          

         
         
          <div className="mb-4">
            <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
              Dirección
            </label>
            <input
              type="text"
              id="direccion"
              className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
              value={direccion}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="map" className="block text-sm font-medium text-gray-700">
              Ubicación en el Mapa
            </label>
            {isLoaded ? (
              <GoogleMap
              mapContainerStyle={containerStyle}
              center={location}
              zoom={10}
              onClick={handleMapClick}
            >
              {markerLocation && (
                <Marker position={markerLocation} />
              )}
            </GoogleMap>
          ) : (
            <div className="h-[300px] bg-gray-300"></div>
          )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Registrarse
            </button>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700"
              onClick={() => {
                // Reiniciar los campos del formulario al hacer clic en el botón de cancelar
                setEmail('');
                setPassword('');
                setNit('');
                setName('');
                setAddress('');
                setLocation(center);
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    
  );
};

export default RegisterForm;
