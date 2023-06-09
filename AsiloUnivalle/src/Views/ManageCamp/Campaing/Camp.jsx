import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  storage,
  db,
  UploadFiles,
} from "../../../components/firebase/connection";
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
async function Update(idCampaign, campaing, navigate) {
  const q = query(
    collection(db, "campaings"),
    where("IdCampana", "==", idCampaign)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc2) => {
    console.log(doc2.id, " => ", doc2.data());
    updateDoc(doc(db, "campaings", doc2.id), { Estado: campaing.estado });
  });
  axios
    .put(
      "https://apidelasilo.azurewebsites.net/api/Campanas/" + idCampaign,
      campaing
    )
    .then((response) => {
      console.log(response);
      navigate("/Campaings");
    })
    .catch((error) => {
      console.log(error);
    });
}
export function Camp(props) {
  let {
    camp,
    id,
    campaingName,
    requirements,
    beneficiary,
    status,
    initialDate,
    endDate,
  } = props;
  const navigate = useNavigate();

  let benef = "";
  switch (beneficiary) {
    case 0:
      benef = "Anciano";
      break;
    case 1:
      benef = "Grupo de Ancianos";
      break;
    case 2:
      benef = "Institucion";
      break;
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    camp.estado = 3;
    await Update(id, camp, navigate);
  };

  const handleActive = async (e) => {
    e.preventDefault();
    camp.estado = 0;
    await Update(id, camp, navigate);
  };

  const handleClose = async (e) => {
    e.preventDefault();
    camp.estado = 1;
    await Update(id, camp, navigate);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    navigate(`/EditCampaing/${id}`);
  };

  const handleReport = (e) => {
    e.preventDefault();
    navigate(`/report/${id}`);
  };
  const handleDonations = (e) => {
    e.preventDefault();
    navigate(`/lista/${id}`);
  };

  return (
    <tr>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div>
            <div className="text-sm font-medium text-gray-900">
              {campaingName}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div>
            <div className="text-sm font-medium text-gray-900">
              {requirements}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div>
            <div className="text-sm font-medium text-gray-900">{benef}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <StatusSpan status={status} />
      </td>
      <td className="px-6 py-4">
        <button
          class="relative inline-flex text-sm sm:text-base rounded-full font-medium border-2 border-transparent transition-colors outline-transparent focus:outline-transparent disabled:opacity-50 disabled:pointer-events-none disabled:opacity-40 disabled:hover:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
        text-white bg-green-500 hover:bg-green-700 focus:border-[#B3B3FD] focus:bg-green-600 mb-2 px-4 py-1 sm:py-1 sm:px-2"
          onClick={handleActive}
        >
          Activar
        </button>
        <button
          class="relative inline-flex text-sm sm:text-base rounded-full font-medium border-2 border-transparent transition-colors outline-transparent focus:outline-transparent disabled:opacity-50 disabled:pointer-events-none disabled:opacity-40 disabled:hover:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
        text-white bg-red-500 hover:bg-red-800 focus:bg-red-800 px-4 py-1 sm:py-1 sm:px-2"
          onClick={handleClose}
        >
          Cerrar
        </button>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">{initialDate}</td>
      <td className="px-6 py-4 text-sm text-gray-500">{endDate}</td>
      <td class="px-6 py-4">
        <div class="flex justify-end gap-4">
          <a x-data="{ tooltip: 'Delete' }" onClick={handleDelete} href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
              x-tooltip="tooltip"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </a>
          <a x-data="{ tooltip: 'Edite' }" href="#" onClick={handleEdit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
              x-tooltip="tooltip"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </a>
          <a
            x-data="{ tooltip: 'Donation' }"
            onClick={handleDonations}
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-report-money"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />{" "}
              <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />{" "}
              <rect x="9" y="3" width="6" height="4" rx="2" />{" "}
              <path d="M14 11h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />{" "}
              <path d="M12 17v1m0 -8v1" />{" "}
            </svg>
          </a>
          <a x-data="{ tooltip: 'Reports' }" onClick={handleReport} href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-report-search"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />{" "}
              <path d="M8 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5.697" />{" "}
              <path d="M18 12v-5a2 2 0 0 0 -2 -2h-2" />{" "}
              <rect x="8" y="3" width="6" height="4" rx="2" />{" "}
              <path d="M8 11h4" /> <path d="M8 15h3" />{" "}
              <circle cx="16.5" cy="17.5" r="2.5" />{" "}
              <path d="M18.5 19.5l2.5 2.5" />{" "}
            </svg>
          </a>
        </div>
      </td>
    </tr>
  );
}

function StatusSpan({ status }) {
  let statusName = "";
  switch (status) {
    case 0:
      statusName = "Activo";
      break;
    case 2:
      statusName = "Espera";
      break;
    case 1:
      statusName = "Cerrada";
      break;
    default:
      statusName = "Desconocido";
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatus(
        status
      )}`}
    >
      {statusName}
    </span>
  );
}

function getStatus(status) {
  switch (status) {
    case 0:
      return "bg-green-100 text-green-800";
    case 2:
      return "bg-yellow-100 text-yellow-800";
    case 1:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default Camp;
