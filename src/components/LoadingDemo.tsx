"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLoading, useAsyncLoading } from '@/contexts/LoadingContext';
import { useFormLoading, useNavigationLoading } from '@/hooks/usePageLoading';
import { GlobalLoading, PageLoading, InlineLoading } from '@/components/GlobalLoading';
import { LoadingSpinner, CompanyCardSkeleton, PropertyCardSkeleton } from '@/components/LoadingSkeleton';

export function LoadingDemo() {
  const [showPageLoading, setShowPageLoading] = useState(false);
  const [showInlineLoading, setShowInlineLoading] = useState(false);
  
  const { showLoading, hideLoading } = useLoading();
  const { executeWithLoading } = useAsyncLoading();
  const { submitWithLoading } = useFormLoading();
  const { navigateWithLoading } = useNavigationLoading();

  // Simulate async operations
  const simulateApiCall = () => new Promise(resolve => setTimeout(resolve, 3000));
  const simulateFormSubmit = () => new Promise(resolve => setTimeout(resolve, 2000));
  const simulateNavigation = () => console.log('Navigating...');

  const handleGlobalLoading = () => {
    showLoading('Processing your request...');
    setTimeout(hideLoading, 3000);
  };

  const handleAsyncLoading = async () => {
    await executeWithLoading(
      simulateApiCall,
      'Fetching property data...'
    );
    alert('Data loaded successfully!');
  };

  const handleFormLoading = async () => {
    await submitWithLoading(
      simulateFormSubmit,
      'Saving company information...'
    );
    alert('Form submitted successfully!');
  };

  const handleNavigationLoading = () => {
    navigateWithLoading(
      simulateNavigation,
      'Preparing your destination...'
    );
  };

  return (
    <div className="space-y-8 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Loading System Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Global Loading Controls */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Global Loading</h3>
            <div className="flex gap-4 flex-wrap">
              <Button onClick={handleGlobalLoading}>
                Show Global Loading
              </Button>
              <Button onClick={handleAsyncLoading}>
                Async Operation
              </Button>
              <Button onClick={handleFormLoading}>
                Form Submission
              </Button>
              <Button onClick={handleNavigationLoading}>
                Navigation Loading
              </Button>
            </div>
          </div>

          {/* Page Loading Demo */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Page Loading</h3>
            <Button 
              onClick={() => setShowPageLoading(!showPageLoading)}
              variant="outline"
            >
              Toggle Page Loading
            </Button>
            {showPageLoading && (
              <div className="h-64 relative">
                <PageLoading message="Loading page content..." />
              </div>
            )}
          </div>

          {/* Inline Loading Demo */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Inline Loading</h3>
            <Button 
              onClick={() => setShowInlineLoading(!showInlineLoading)}
              variant="outline"
            >
              Toggle Inline Loading
            </Button>
            {showInlineLoading ? (
              <InlineLoading size="lg" />
            ) : (
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
                Content loaded successfully!
              </div>
            )}
          </div>

          {/* Loading Spinner Demo */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Loading Spinner</h3>
            <LoadingSpinner />
          </div>

          {/* Skeleton Loading Demo */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Skeleton Loading</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CompanyCardSkeleton />
              <PropertyCardSkeleton />
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
