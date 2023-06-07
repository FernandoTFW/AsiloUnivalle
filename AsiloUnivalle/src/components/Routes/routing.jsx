
import { Routes, Route } from "react-router-dom";
import RegisterForm from "../../Views/SingUp/SingUpAsilo";
import Login from "../../Views/Login/Login";
import HelloWorld from "../../Views/prueba/home";

const Routing = () => {
  return (
    <Routes>
        <Route path="/" element={<Login />} /> {/* Ruta raíz */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/hello" element={<HelloWorld/>}></Route>
    </Routes>
  );
};

export default Routing;


