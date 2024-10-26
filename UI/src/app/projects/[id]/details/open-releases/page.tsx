import React from "react";
import OpenReleases from "@/src/components/projects/details/open-release";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Open Releases',
  description: 'View and manage open releases for the project',
};

function OpenReleasesPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-6">
      <OpenReleases />
    </div>
  );
}

export default OpenReleasesPage;
