import Camp from "./Campaing/Camp";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function ListCamp() {
  const [campaings, SetCampaings] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://apidelasilo.azurewebsites.net/api/CampanasIns/${userData.idAsilo}`)
      .then((response) => response.json())
      .then((data) => {
        SetCampaings(data);
      })
      .catch((error) => console.log(error));
  }, [location]);

  return (
    <>
      <button
        type="button"
        class="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
        onClick={() => {
          navigate("/NewCampaing");
        }}
      >
        Nueva Campaña
      </button>
      <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <h2 class="text-2xl font-bold mb-6 mt-4 ml-40 mr-40 text-center">
          Campañas activas
        </h2>
        <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Nombre de la campaña
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Requerimientos
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Beneficiario
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Estado de Campaña
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Fecha de inicio
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Fecha de fin
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 border-t border-gray-100">
            {campaings
              .filter((camp) => camp.estado == 0)
              .map((campaing) => (
                <Camp
                  camp={campaing}
                  id={campaing.idCampana}
                  campaingName={campaing.nombre}
                  requirements={campaing.requerimiento}
                  beneficiary={campaing.beneficiario}
                  status={campaing.estado}
                  initialDate={new Date(
                    campaing.fechaInicio
                  ).toLocaleDateString()}
                  endDate={new Date(campaing.fechaFin).toLocaleDateString()}
                ></Camp>
              ))}
          </tbody>
        </table>
      </div>
      <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <h2 class="text-2xl font-bold mb-6 mt-4 ml-40 mr-40 text-center">
          Campañas cerradas
        </h2>
        <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Nombre de la campaña
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Requerimientos
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Beneficiario
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Estado de Campaña
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Fecha de inicio
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Fecha de fin
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 border-t border-gray-100">
            {campaings
              .filter((camp) => camp.estado == 1)
              .map((campaing) => (
                <Camp
                  camp={campaing}
                  id={campaing.idCampana}
                  campaingName={campaing.nombre}
                  requirements={campaing.requerimiento}
                  beneficiary={campaing.beneficiario}
                  status={campaing.estado}
                  initialDate={new Date(
                    campaing.fechaInicio
                  ).toLocaleDateString()}
                  endDate={new Date(campaing.fechaFin).toLocaleDateString()}
                ></Camp>
              ))}
          </tbody>
        </table>
      </div>
      <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <h2 class="text-2xl font-bold mb-6 mt-4 ml-40 mr-40 text-center">
          Campañas en espera
        </h2>
        <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Nombre de la campaña
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Requerimientos
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Beneficiario
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Estado de Campaña
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Fecha de inicio
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Fecha de fin
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 border-t border-gray-100">
            {campaings
              .filter((camp) => camp.estado == 2)
              .map((campaing) => (
                <Camp
                  camp={campaing}
                  id={campaing.idCampana}
                  campaingName={campaing.nombre}
                  requirements={campaing.requerimiento}
                  beneficiary={campaing.beneficiario}
                  status={campaing.estado}
                  initialDate={new Date(
                    campaing.fechaInicio
                  ).toLocaleDateString()}
                  endDate={new Date(campaing.fechaFin).toLocaleDateString()}
                ></Camp>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default ListCamp;
