import { getAllCompanies } from "@/services/companyService";
import { ClientHomePage } from "@/components/ClientHomePage";

export default async function Home() {
  const companies = await getAllCompanies();

  return <ClientHomePage companies={companies} />;
}
