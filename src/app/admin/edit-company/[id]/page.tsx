import { AdminLayout } from '@/components/AdminLayout';
import { CompanyForm } from '@/components/CompanyForm';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';

interface EditCompanyPageProps {
  params: {
    id: string;
  };
}

export default async function EditCompanyPage({ params }: EditCompanyPageProps) {
  const company = await prisma.company.findUnique({
    where: {
      id: params.id,
    },
    include: {
      properties: {
        include: {
          images: {
            orderBy: {
              order: 'asc',
            },
          },
        },
      },
    },
  });

  if (!company) {
    notFound();
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Edit Company
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Update company information for {company.name}
          </p>
        </div>
        
        <CompanyForm company={company} isEdit={true} />
      </div>
    </AdminLayout>
  );
}
