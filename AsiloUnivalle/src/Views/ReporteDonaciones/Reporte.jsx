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
      const response = await axios.get(`https://localhost:7018/api/Donacions/${id}`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='flex items-center justify-center min-h-screen from-red-100 via-red-300 to-blue-500 bg-gradient-to-br'>
        <div className="flex flex-col">
          {data.map((item) => (
            <div
              key={item.id}
              className="p-4 items-center justify-center w-[980px] rounded-xl group sm:flex space-x-6 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl mb-6"
            >
              <div className="sm:w-8/12 pl-0 p-5">
                <div className="space-y-2">
                  <div className="space-y-4">
                    <h4 className="text-md font-semibold text-cyan-900 text-justify">
                      {item.title}
                    </h4>
                    <p className="text-gray-600">
                      Descripción: {item.descripcion}
                    </p>
                    <p className="text-gray-600">
                      Anónimo: {item.anonimo ? "Sí" : "No"}
                    </p>
                    <p className="text-gray-600">
                      Estado: {item.estado}
                    </p>
                    <p className="text-gray-600">
                      Dinero: {item.dinero ? `$${item.dinero.toFixed(2)}` : "N/A"}
                    </p>
                    <p className="text-gray-600">
                      Items: {item.items || "N/A"}
                    </p>
                    <p className="text-gray-600">
                      Fecha de Donación: {item.fechaDonacion}
                    </p>
                    <p className="text-gray-600">
                      Fecha de Recojo: {item.fechaRecojo || "N/A"}
                    </p>
                  </div>
                  {/* Resto del contenido de la tarjeta */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Reporte;
