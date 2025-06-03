import { Suspense } from 'react';
import ResultsClient from '@/components/ResultsClient';

export default function ResultsPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading results...</p>}>
      <ResultsClient />
    </Suspense>
  );
}
