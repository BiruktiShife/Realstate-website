import { AdminLayout } from '@/components/AdminLayout';
import { CompanyForm } from '@/components/CompanyForm';

export default function AddCompanyPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Add New Company
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Create a new real estate company profile
          </p>
        </div>
        
        <CompanyForm />
      </div>
    </AdminLayout>
  );
}
