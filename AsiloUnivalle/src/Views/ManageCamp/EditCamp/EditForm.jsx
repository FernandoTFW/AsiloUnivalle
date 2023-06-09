import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import {
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
import { Data } from "@react-google-maps/api";

export function EditFormCampaing() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const userData = JSON.parse(localStorage.getItem("userData"));
  let IdAsilo = userData.idAsilo;
  let Estado = 0;
  let initial = new Date();
  let end= new Date();
  let formatedInitial;
  let formatedEnd;

  const [Nombre, SetCampName] = useState("");
  const [Requerimiento, SetRequirements] = useState("");
  const [FechaInicio, SetLaunchDate] = useState("");
  const [FechaFin, SetEndDate] = useState("");
  const [Beneficiario, SetType] = useState(0);
  let [Campaing, SetCampaing] = useState(null);
  const [images, SetImages] = useState(null);

  const handleImageUpload = (e) => {
    SetImages(e.target.files);
  };

  useEffect(() => {
    fetch(`https://apidelasilo.azurewebsites.net/api/Campanas/${id}`)
      .then((response) => response.json())
      .then((data) => {
        SetCampaing(data);
        SetCampName(data.nombre);
        SetRequirements(data.requerimiento);
        SetLaunchDate(data.fechaInicio);
        initial = new Date(data.fechaInicio)
        formatedInitial = initial.toISOString().split('T')[0];
        SetEndDate(data.fechaFin);
        end = new Date(data.fechaFin);
        formatedEnd = end.toISOString().split('T')[0];
        SetType(data.beneficiario);
      })
      .catch((error) => console.log(error));
  }, []);

  const submitCampaign = async (e) => {
    e.preventDefault();
    let UrlImagen = "";
    if (images != null) {
      let aux = Array.from(images);
      const newUrl = await UploadFiles(aux[0]);
      UrlImagen = newUrl;
    }

    const fecha1 = new Date(FechaInicio);
    const fecha2 = new Date();

    if (fecha1 <= fecha2) {
      Estado = 0;
    } else {
      Estado = Campaing.estado;
    }
    try {
      if (Nombre && Requerimiento && FechaInicio && FechaFin) {
        Campaing.nombre = Nombre;
        Campaing.requerimiento = Requerimiento;
        Campaing.fechaInicio = new Date(FechaInicio);
        Campaing.fechaFin = new Date(FechaFin);
        Campaing.beneficiario = Beneficiario;
        if (UrlImagen == "") {
          UrlImagen = Campaing.urlImagen;
        }
        let newCampaing = {
          IdCampana: Campaing.idCampana,
          Nombre,
          Requerimiento,
          Beneficiario,
          UrlImagen,
          FechaInicio: new Date(FechaInicio),
          FechaFin: new Date(FechaFin),
          Estado,
          IdAsilo,
        };
        const q = query(
          collection(db, "campaings"),
          where("IdCampana", "==", Campaing.idCampana)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc2) => {
          updateDoc(doc(db, "campaings", doc2.id), newCampaing );
        });

        axios
          .put(
            "https://apidelasilo.azurewebsites.net/api/Campanas/"+Campaing.idCampana,
            Campaing
          )
          .then((response) => {
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
            value={Beneficiario}
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
            value={formatedInitial}
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
            value={formatedEnd}
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
export default EditFormCampaing;
