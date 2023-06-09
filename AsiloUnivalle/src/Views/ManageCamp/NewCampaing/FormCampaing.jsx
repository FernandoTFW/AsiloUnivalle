import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  storage,
  db,
  UploadFiles,
} from "../../../components/firebase/connection";
import { addDoc, collection } from "firebase/firestore";

export function FormCampaing() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  let IdAsilo = userData.idAsilo;
  const [Nombre, SetCampName] = useState("");
  const [Requerimiento, SetRequirements] = useState("");
  const [FechaInicio, SetLaunchDate] = useState("");
  const [FechaFin, SetEndDate] = useState("");
  const [Beneficiario, SetType] = useState(0);
  let Estado = 0;
  const [images, SetImages] = useState();

  const handleImageUpload = (e) => {
    SetImages(e.target.files);
  };

  const submitCampaign = async (e) => {
    e.preventDefault();

    let UrlImagen = "";
    let IdCampaign = 1;
    let aux = Array.from(images);
    const newUrl = await UploadFiles(aux[0]);
    UrlImagen = newUrl;

    const fecha1 = new Date(FechaInicio);
    const fecha2 = new Date();

    if (fecha1 <= fecha2) {
      Estado = 0;
    } else {
      Estado = 2;
    }

    try {
      if (Nombre && Requerimiento && FechaInicio && FechaFin) {
        const campaingCollectionRef = collection(db, "campaings");
        const response = await fetch(
          "https://apidelasilo.azurewebsites.net/api/LastId"
        );
        const data = await response.json();

        IdCampaign += data;
        console.log(IdCampaign);
        console.log(data);
        let newCampaing = {
          Nombre,
          Requerimiento,
          Beneficiario,
          UrlImagen,
          FechaInicio: new Date(FechaInicio),
          FechaFin: new Date(FechaFin),
          Estado,
          IdAsilo,
        };
        console.log(newCampaing);
        await addDoc(campaingCollectionRef, {
          Nombre: Nombre,
          Requerimiento: Requerimiento,
          UrlImagen: UrlImagen,
          Beneficiario: Beneficiario,
          FechaInicio: new Date(FechaInicio),
          FechaFin: new Date(FechaFin),
          Estado: Estado,
          IdAsilo: IdAsilo,
          IdCampana: IdCampaign,
        });

        axios
          .post(
            "https://apidelasilo.azurewebsites.net/api/Campanas",
            newCampaing
          )
          .then((response) => {
            console.log(response);
            navigate("/Campaings");
          })
          .catch((error) => {
            console.log(error);
          });

        SetCampName("");
        SetRequirements("");
        SetLaunchDate("");
        SetEndDate("");
        SetType(null);
        SetImages([]);
        navigate("/Campaings");
      } else {
        console.error("Error: all fields must be filled");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div class="container mx-auto py-8">
      <button
        type="button"
        class="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
        onClick={() => {
          navigate("/Campaings");
        }}
      >
        Atras
      </button>
      <h1 class="text-2xl font-bold mb-6 ml-40 mr-40 text-center">
        Registro de Campaña
      </h1>
      <form
        onSubmit={submitCampaign}
        id="myForm"
        class="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md"
      >
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Nombre de campaña
          </label>
          <input
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            value={Nombre}
            onChange={(e) => SetCampName(e.target.value)}
          ></input>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Requerimientos
          </label>
          <input
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            value={Requerimiento}
            onChange={(e) => SetRequirements(e.target.value)}
          ></input>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Tipo de Beneficiario
          </label>
          <select
            name="select"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            onChange={(e) => {
              SetType(parseInt(e.target.value));
            }}
          >
            <option value={0}>Anciano</option>
            <option value={1} selected>
              Grupo
            </option>
            <option value={2}>Institucion</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Fecha de lanzamiento
          </label>
          <input
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="date"
            value={FechaInicio}
            onChange={(e) => SetLaunchDate(e.target.value)}
          ></input>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Fecha de cierre
          </label>
          <input
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="date"
            value={FechaFin}
            onChange={(e) => SetEndDate(e.target.value)}
          ></input>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Imagenes
          </label>
          <input
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          ></input>
        </div>
        <button
          class="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          type="submit"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}
export default FormCampaing;
