import { createBrowserRouter } from "react-router";

import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { DashboardLayout } from "./components/DashboardLayout";
import { AdminDashboard } from "./components/pages/AdminDashboard";
import { AdminInstrutores } from "./components/pages/AdminInstrutores";
import { AdminAlunos } from "./components/pages/AdminAlunos";
import { AdminFrota } from "./components/pages/AdminFrota";
import { AdminFinanceiro } from "./components/pages/AdminFinanceiro";
import { AdminConfiguracoes } from "./components/pages/AdminConfiguracoes";
import { InstrutorDashboard } from "./components/pages/InstrutorDashboard";
import { InstrutorVeiculos } from "./components/pages/InstrutorVeiculos";
import { InstrutorRotas } from "./components/pages/InstrutorRotas";
import { InstrutorAgenda } from "./components/pages/InstrutorAgenda";
import { InstrutorFinanceiro } from "./components/pages/InstrutorFinanceiro";
import { Configuracoes } from "./components/pages/Configuracoes";
import { CondutorDashboard } from "./components/pages/CondutorDashboard";
import { CondutorLocacao } from "./components/pages/CondutorLocacao";
import { CondutorAgendar } from "./components/pages/CondutorAgendar";
import { CondutorHistorico } from "./components/pages/CondutorHistorico";
import { AulaDetalhe } from "./components/pages/AulaDetalhe";
import { RedirectToLogin } from "./components/pages/RedirectToLogin";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: SignupPage,
  },
  {
    path: "/admin",
    Component: () => DashboardLayout({ requiredRole: "admin" }),
    children: [
      { index: true, Component: AdminDashboard },
      { path: "instrutores", Component: AdminInstrutores },
      { path: "frota", Component: AdminFrota },
      { path: "alunos", Component: AdminAlunos },
      { path: "financeiro", Component: AdminFinanceiro },
      { path: "configuracoes", Component: AdminConfiguracoes },
    ],
  },
  {
    path: "/instrutor",
    Component: () => DashboardLayout({ requiredRole: "instrutor" }),
    children: [
      { index: true, Component: InstrutorDashboard },
      { path: "veiculos", Component: InstrutorVeiculos },
      { path: "rotas", Component: InstrutorRotas },
      { path: "agenda", Component: InstrutorAgenda },
      { path: "financeiro", Component: InstrutorFinanceiro },
      { path: "configuracoes", Component: Configuracoes },
    ],
  },
  {
    path: "/condutor",
    Component: () => DashboardLayout({ requiredRole: "condutor" }),
    children: [
      { index: true, Component: CondutorDashboard },
      { path: "agendar", Component: CondutorAgendar },
      { path: "locacao", Component: CondutorLocacao },
      { path: "historico", Component: CondutorHistorico },
      { path: "historico/:aulaId", Component: AulaDetalhe },
      { path: "configuracoes", Component: Configuracoes },
    ],
  },
  {
    path: "*",
    Component: RedirectToLogin,
  },
]);