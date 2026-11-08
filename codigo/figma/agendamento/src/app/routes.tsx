import { Navigate, createBrowserRouter } from "react-router";
import ReceptionLayout from "./layouts/ReceptionLayout";
import LoginScreen from "./screens/LoginScreen";
import ReceptionWorkspace from "./screens/reception/ReceptionWorkspace";
import { CreateAccountScreen, RecoverPasswordScreen, RecoverySentScreen, ResetPasswordScreen } from "./screens/AuthScreens";
import { getSession } from "./services/prototypeAuth";

function ProtectedReception() {
  return getSession() ? <ReceptionLayout /> : <Navigate to="/login" replace />;
}

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <LoginScreen /> },
  { path: "/criar-conta", element: <CreateAccountScreen /> },
  { path: "/recuperar-senha", element: <RecoverPasswordScreen /> },
  { path: "/recuperar-senha/enviado", element: <RecoverySentScreen /> },
  { path: "/redefinir-senha", element: <ResetPasswordScreen /> },
  {
    path: "/reception",
    element: <ProtectedReception />,
    children: [
      { index: true, element: <ReceptionWorkspace section="dashboard" /> },
      { path: "agenda", element: <ReceptionWorkspace section="agenda" /> },
      { path: "pacientes", element: <ReceptionWorkspace section="patients" /> },
      { path: "notificacoes", element: <ReceptionWorkspace section="notifications" /> },
      { path: "profissionais", element: <ReceptionWorkspace section="professionals" /> },
      { path: "recursos", element: <ReceptionWorkspace section="resources" /> },
      { path: "configuracoes", element: <ReceptionWorkspace section="settings" /> },
      { path: "*", element: <Navigate to="/reception" replace /> },
    ],
  },
  { path: "*", element: <Navigate to="/login" replace /> },
]);
