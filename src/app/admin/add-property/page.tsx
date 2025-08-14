import { AdminLayout } from '@/components/AdminLayout';
import { PropertyForm } from '@/components/PropertyForm';

export default function AddPropertyPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Add New Property
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Add a new property to an existing company
          </p>
        </div>
        
        <PropertyForm />
      </div>
    </AdminLayout>
  );
}
