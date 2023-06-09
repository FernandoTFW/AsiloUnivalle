import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Reporte = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const [data, setData] = useState([]);

  useEffect(() => {
    // Llamar a la API cuando el componente se monte
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://apidelasilo.azurewebsites.net/api/Donacions/${id}`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateDonacionEstado = async (donacionId) => {
    try {
      const estado = data.find((donacion) => donacion.idDonacion === donacionId)?.estado;
      const updatedDonacion = data.find((donacion) => donacion.idDonacion === donacionId);

      console.log(estado);

      if (updatedDonacion) {
        if (estado === 1) {
          updatedDonacion.estado = 2;
        } else if (estado === 2) {
          updatedDonacion.estado = 3;
          updatedDonacion.fechaRecojo = new Date().toISOString(); // Actualizar la fecha de recojo con la fecha del servidor
        }

        delete updatedDonacion.benefactorNombre; // Eliminar la propiedad benefactorNombre

        await axios.put(`https://apidelasilo.azurewebsites.net//api/Donacions/${donacionId}`, updatedDonacion);
        window.location.reload(); // Refrescar la página después de actualizar
      } else {
        console.log('Donación no encontrada');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMouseEnter = (donacionId) => {
    const donacion = data.find((donacion) => donacion.idDonacion === donacionId);

    if (donacion?.estado === 1) {
      donacion.hoverText = "Entregar";
    } else if (donacion?.estado === 2) {
      donacion.hoverText = "Finalizar";
    }

    setData([...data]);
  };

  const handleMouseLeave = (donacionId) => {
    const donacion = data.find((donacion) => donacion.idDonacion === donacionId);

    donacion.hoverText = "";

    setData([...data]);
  };

  const openWhatsApp = (celular) => {
    const whatsappUrl = `https://wa.me/${celular}`;
    window.open(whatsappUrl, '_blank');
  };

  const renderButton = (donacion) => {
    const estado = donacion.estado;
    const hoverText = donacion.hoverText || "";

    if (estado === 1) {
      return (
        <button
          onClick={() => updateDonacionEstado(donacion.idDonacion)}
          onMouseEnter={() => handleMouseEnter(donacion.idDonacion)}
          onMouseLeave={() => handleMouseLeave(donacion.idDonacion)}
        >
          {hoverText || "Pendiente"}
        </button>
      );
    } else if (estado === 2) {
      return (
        <button
          onClick={() => updateDonacionEstado(donacion.idDonacion)}
          onMouseEnter={() => handleMouseEnter(donacion.idDonacion)}
          onMouseLeave={() => handleMouseLeave(donacion.idDonacion)}
        >
          {hoverText || "En entrega"}
        </button>
      );
    } else if (estado === 3) {
      return (
        <button disabled>Finalizado</button>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-red-100 via-red-300 to-blue-500 min-h-screen flex items-center justify-center">
        <div className="container mx-auto max-w-screen-lg m-5 p-8">
          {data.map((item) => (
            <div
              key={item.idDonacion}
              className="p-4 mb-4 w-full rounded-xl group bg-white bg-opacity-50 shadow-xl hover:rounded-2xl"
            >
              <div className="p-5 space-y-2">
                <div className="space-y-4">
                  <h4 className="text-md font-semibold text-cyan-900 text-justify">
                    {item.title}
                  </h4>
                  <p className="text-gray-600">
                    Descripción: {item.descripcion}
                  </p>
                  <p className="text-gray-600">
                    Nombre Benefactor: {item.anonimo ? "Anonimo" : item.benefactorNombre}
                  </p>
                  {!item.dinero && (
                    <p className="text-gray-600">Items: {item.items || "N/A"}</p>
                  )}
                  {item.dinero && (
                    <p className="text-gray-600">
                      Dinero: {`$${item.dinero.toFixed(2)}`}
                    </p>
                  )}
                  <p className="text-gray-600">
                    Fecha de Donación: {item.fechaDonacion}
                  </p>
                  <p className="text-gray-600">
                    Fecha de Recojo: {item.fechaRecojo || "N/A"}
                  </p>
                </div>
                {/* Resto del contenido de la tarjeta */}
                {renderButton(item)}
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                  onClick={() => openWhatsApp(item.celular)}
                >
                  Contactar a {item.celular} por WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Reporte;
