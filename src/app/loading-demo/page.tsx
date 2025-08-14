import { LoadingDemo } from '@/components/LoadingDemo';

export default function LoadingDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Loading System Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore all the different loading states and animations available in the application.
          </p>
        </div>
        <LoadingDemo />
      </div>
    </div>
  );
}
