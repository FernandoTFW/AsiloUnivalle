import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';


const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: -17.3312118,
  lng: -66.2285893,
};




const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nit, setNit] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState(center);
  const [celular, setCelular] = useState('');
  const [telefono, setTelefono] = useState('');

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

 

  const handleSubmit = (event) => {
    event.preventDefault();

    // Aquí puedes realizar la lógica de envío del formulario y los datos ingresados
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('NIT:', nit);
    console.log('Name:', name);
    console.log('Address:', address);
    console.log('Celular:', celular);
    console.log('Telefono:', telefono);
   if (markerLocation) {
    const { lat, lng } = markerLocation;
    console.log('Latitude:', lat);
    console.log('Longitude:', lng);
  }

    // Reiniciar los campos del formulario después del envío exitoso
    setEmail('');
    setPassword('');
    setNit('');
    setName('');
    setAddress('');
    setLocation(center);
    setCelular('');
    setTelefono('');
  };

  return (
    
      <div className="bg-white m-4 p-5 rounded-md w-full md:w-[500px] lg:w-[600px] xl:w-[900px]">
        <h2 className=" text-black font-bold mb-5 ">Registro de Asilo</h2>
        <form onSubmit={handleSubmit} >
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
            <label htmlFor="Celular" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="Celular" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Dirección
            </label>
            <input
              type="text"
              id="address"
              className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
              value={address}
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
