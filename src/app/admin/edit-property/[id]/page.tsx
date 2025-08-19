import { AdminLayout } from '@/components/AdminLayout';
import { PropertyForm } from '@/components/PropertyForm';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';

interface EditPropertyPageProps {
  params: {
    id: string;
  };
}

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
  const property = await prisma.property.findUnique({
    where: {
      id: params.id,
    },
    include: {
      images: {
        orderBy: {
          order: 'asc',
        },
      },
      company: true,
    },
  });

  if (!property) {
    notFound();
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Edit Property
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Update property information for {property.title}
          </p>
        </div>
        
        <PropertyForm property={property} isEdit={true} />
      </div>
    </AdminLayout>
  );
}
