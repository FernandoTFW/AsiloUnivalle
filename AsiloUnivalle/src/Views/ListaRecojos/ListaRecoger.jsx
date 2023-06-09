import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListaRecoger = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Llamar a la API cuando el componente se monte
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://apidelasilo.azurewebsites.net/api/Donacions/lista/${id}`
      );
      const sortedData = response.data.sort(
        (a, b) => new Date(a.fechaDonacion) - new Date(b.fechaDonacion)
      );
      setData(sortedData);
    } catch (error) {
      console.log(error);
    }
  };

  const renderGroupedData = () => {
    const groupedData = {};

    data.forEach((item) => {
      const fechaDonacion = item.fechaDonacion.split("T")[0]; // Obtener la fecha sin la parte de la hora
      if (!groupedData[fechaDonacion]) {
        groupedData[fechaDonacion] = [item];
      } else {
        groupedData[fechaDonacion].push(item);
      }
    });

    return Object.entries(groupedData).map(([fechaDonacion, items]) => (
      <div key={fechaDonacion}>
        <h1>Donaciones en espera </h1>
        <h2>{fechaDonacion} </h2>
        {items.map((item) => (
          <div
            key={item.idDonacion}
            className="p-4 mb-4 w-full rounded-xl group bg-white bg-opacity-50 shadow-xl hover:rounded-2xl"
          >
            <div className="p-5 space-y-2">
              <div className="space-y-4">
                <h4 className="text-md font-semibold text-cyan-900 text-justify">
                  {item.title}
                </h4>
                <p className="text-gray-600">Descripción: {item.descripcion}</p>
                <p className="text-gray-600">
                  Nombre Benefactor:{" "}
                  {item.anonimo ? "Anonimo" : item.benefactorNombre}
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
            </div>
          </div>
        ))}
      </div>
    ));
  };

  return (
    <>
      <div className="bg-gradient-to-br from-red-100 via-red-300 to-blue-500 min-h-screen flex items-center justify-center">
        <div className="container mx-auto max-w-screen-lg m-5 p-8">
          <button
            type="button"
            class="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
            onClick={() => {
              navigate("/Campaings");
            }}
          >
            Atras
          </button>
          {renderGroupedData()}
        </div>
      </div>
    </>
  );
};

export default ListaRecoger;
