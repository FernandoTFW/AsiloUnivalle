import Camp from "./Campaing/Camp";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ListCamp() {
  const navigate = useNavigate();

  return (
    <>
      <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <button
          type="button"
          class="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
          onClick={() => {
            navigate("/NewCampaing");
          }}
        >
          Nueva Campaña
        </button>
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
                Fecha de inicio
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Fecha de fin
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 border-t border-gray-100">
            <Camp
              key={1}
              campaingName={"JPF"}
              requirements={"Pañales"}
              name={"Federico Almanza"}
              status={3}
              initialDate={"20/05/2023"}
              endDate={"20/05/2023"}
            ></Camp>
          </tbody>
        </table>
      </div>
    </>
  );
}
export default ListCamp;
