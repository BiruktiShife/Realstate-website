# Loading System Documentation

This application includes a comprehensive loading system with multiple types of loading indicators and animations.

## Components

### 1. GlobalLoading
Full-screen loading overlay with animated icons and progress indicators.

```tsx
import { GlobalLoading } from '@/components/GlobalLoading';

<GlobalLoading isLoading={true} message="Loading your dream properties..." />
```

### 2. PageLoading
Page-level loading component for route transitions.

```tsx
import { PageLoading } from '@/components/GlobalLoading';

<PageLoading message="Loading page content..." />
```

### 3. InlineLoading
Small loading spinner for inline use.

```tsx
import { InlineLoading } from '@/components/GlobalLoading';

<InlineLoading size="md" />
```

## Context & Hooks

### LoadingContext
Global state management for loading states.

```tsx
import { useLoading } from '@/contexts/LoadingContext';

const { showLoading, hideLoading, setLoadingMessage } = useLoading();

// Show loading
showLoading('Processing...');

// Hide loading
hideLoading();
```

### useAsyncLoading
Hook for handling async operations with loading states.

```tsx
import { useAsyncLoading } from '@/contexts/LoadingContext';

const { executeWithLoading } = useAsyncLoading();

const fetchData = async () => {
  const result = await executeWithLoading(
    () => fetch('/api/data').then(res => res.json()),
    'Fetching data...'
  );
  return result;
};
```

### useFormLoading
Hook for form submissions with loading states.

```tsx
import { useFormLoading } from '@/hooks/usePageLoading';

const { submitWithLoading } = useFormLoading();

const handleSubmit = async (formData) => {
  await submitWithLoading(
    () => submitForm(formData),
    'Submitting form...'
  );
};
```

## Next.js Integration

### Route-level Loading
Create `loading.tsx` files in your route directories:

```tsx
// app/some-route/loading.tsx
import { PageLoading } from '@/components/GlobalLoading';

export default function Loading() {
  return <PageLoading message="Loading route..." />;
}
```

### Layout Integration
The LoadingProvider is already integrated in the root layout.

## Skeleton Components

### CompanyCardSkeleton
Loading placeholder for company cards.

```tsx
import { CompanyCardSkeleton } from '@/components/LoadingSkeleton';

<CompanyCardSkeleton />
```

### PropertyCardSkeleton
Loading placeholder for property cards.

```tsx
import { PropertyCardSkeleton } from '@/components/LoadingSkeleton';

<PropertyCardSkeleton />
```

## Demo

Visit `/loading-demo` to see all loading components in action.

## Customization

### Custom Animations
Add custom animations in `globals.css`:

```css
@keyframes custom-animation {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.animate-custom {
  animation: custom-animation 2s ease-in-out infinite;
}
```

### Custom Loading Messages
Pass different messages for different contexts:

```tsx
showLoading('Uploading images...');
showLoading('Processing payment...');
showLoading('Generating report...');
```
