import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import {
  storage,
  db,
  UploadFiles,
} from "../../../components/firebase/connection";
import { addDoc, collection } from "firebase/firestore";

export function EditFormCampaing() {
  const navigate = useNavigate();
  let IdAsilo = 1;
  const [Nombre, SetCampName] = useState("");
  const [Requerimiento, SetRequirements] = useState("");
  const [FechaInicio, SetLaunchDate] = useState("");
  const [FechaFin, SetEndDate] = useState("");
  const [Beneficiario, SetType] = useState(0);
  let [Campaing,SetCampaing] = useState(null);
  let Estado = 0;
  const [images, SetImages] = useState(null);
  const searchParams = new URLSearchParams(window.location.search)
  let id = searchParams.get('id')==null? null:searchParams.get('id').toString();
  const location = useLocation();
  const handleImageUpload = (e) => {
    SetImages(e.target.files);
  };

  useEffect(() => {
    fetch(`https://apidelasilo.azurewebsites.net/api/Campanas/${id}`)
      .then((response) => response.json())
      .then((data) => {
        SetCampaing(data);
        SetCampName(Campaing.nombre);
        SetRequirements(Campaing.requerimiento);
        SetLaunchDate(Campaing.fechaInicio);
        SetEndDate(Campaing.fechaFin);
        SetType(Campaing.beneficiario);

      })
      .catch((error) => console.log(error));
  }, [location]);

  const submitCampaign = async (e) => {
    e.preventDefault();
    let UrlImagen = "";
    if(images != null){
        let aux = Array.from(images);
        const newUrl = await UploadFiles(aux[0]);
        UrlImagen = newUrl;
    }
    
    

    const fecha1 = new Date(FechaInicio);
    const fecha2 = new Date();

    if (fecha1 <= fecha2) {
      Estado = 0;
      
    } else {
      Estado = 2;
    }
    try {
      if (Nombre && Requerimiento && FechaInicio && FechaFin) {
        Campaing.nombre = Nombre;
        Campaing.requerimiento = Requerimiento;
        Campaing.fechaInicio = FechaInicio;
        Campaing.fechaFin = FechaFin;
        Campaing.beneficiario = Beneficiario;
        const campaingCollectionRef = collection(db, "campaings");
        let newCampaing = {
          Nombre,
          Requerimiento,
          Beneficiario,
          UrlImagen,
          FechaInicio:new Date(FechaInicio).toISOString(),
          FechaFin:new Date(FechaFin).toISOString(),
          Estado,
          IdAsilo,
        };
        console.log(newCampaing);
        await addDoc(campaingCollectionRef, {
          Nombre: Nombre,
          Requerimiento: Requerimiento,
          UrlImagen:UrlImagen,
          Beneficiario: Beneficiario,
          FechaInicio: FechaInicio,
          FechaFin: FechaFin,
          Estado: Estado,
          IdAsilo: IdAsilo,
        });

        axios
          .post("https://apidelasilo.azurewebsites.net/api/Campanas",newCampaing)
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
            value={1}
          >
            <option value={0}>Anciano</option>
            <option value={1} selected>
              Grupo
            </option>
            <option value={2}>Institucion</option>
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
