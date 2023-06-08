import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  storage,
  db,
  UploadFiles,
} from "../../../components/firebase/connection";
import { addDoc, collection } from "firebase/firestore";

export function FormCampaing() {
  const navigate = useNavigate();
  const [campName, SetCampName] = useState("");
  const [requirements, SetRequirements] = useState("");
  const [beneficiary, SetBeneficiary] = useState("");
  const [launchDate, SetLaunchDate] = useState("");
  const [endDate, SetEndDate] = useState("");
  const [type, SetType] = useState(0);
  const [images, SetImages] = useState();

  const handleImageUpload = (e) => {
    SetImages(e.target.files);
  };

  const submitCampaign = async (e) => {
    e.preventDefault();

    let arrayURL = "";
    let aux = Array.from(images);
    const newUrl = await UploadFiles(aux[0]);
    arrayURL=newUrl;

    try {
      if (campName && requirements && beneficiary && launchDate && endDate) {
        const campaingCollectionRef = collection(db, "campaings");
        await addDoc(campaingCollectionRef, {
          name: campName,
          requirements: requirements,
          beneficiary: type,
          launchDate: launchDate,
          endDate: endDate,
          images: arrayURL,
        });
        SetCampName("");
        SetRequirements("");
        SetBeneficiary("");
        SetLaunchDate("");
        SetEndDate("");
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
            value={campName}
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
            value={requirements}
            onChange={(e) => SetRequirements(e.target.value)}
          ></input>
        </div>
        <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
            Tipo de Beneficiario
          </label>
          <select name="select" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" onChange={(e)=>{SetType(e.target.value); console.log(e.target.value);}}>
            <option value={0}>
              Anciano
            </option>
            <option value={1} selected>
              Grupo
            </option>
            <option value={2}>
              Institucion
            </option>
          </select>
        </div>
        {/* <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Beneficiario
          </label>
          <input
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            value={beneficiary}
            onChange={(e) => SetBeneficiary(e.target.value)}
          ></input>
        </div> */}
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Fecha de lanzamiento
          </label>
          <input
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="date"
            value={launchDate}
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
            value={endDate}
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
