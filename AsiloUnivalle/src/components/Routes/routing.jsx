import { Routes, Route } from "react-router-dom";
import RegisterForm from "../../Views/SingUp/SingUpAsilo";
import Login from "../../Views/Login/Login";
import HelloWorld from "../../Views/prueba/home";
import Reporte from "../../Views/ReporteDonaciones/Reporte";
import ListaRecoger from "../../Views/ListaRecojos/ListaRecoger";
import ListCamp from "../../Views/ManageCamp/ListCamp";
import FormCampaing from "../../Views/ManageCamp/NewCampaing/FormCampaing";
import { EditFormCampaing } from "../../Views/ManageCamp/EditCamp/EditForm";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} /> {/* Ruta raíz */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/hello" element={<HelloWorld/>}></Route>
      <Route path="/Campaings" element={<ListCamp/>} />
      <Route path="/NewCampaing" element={<FormCampaing/>} />
      <Route path="/EditCampaing/:id" element={<EditFormCampaing/>} />
      <Route path="/report/:id" element={<Reporte/>}></Route>
      <Route path="/lista/:id" element={<ListaRecoger/>}></Route>
    </Routes>
  );
};

export default Routing;
