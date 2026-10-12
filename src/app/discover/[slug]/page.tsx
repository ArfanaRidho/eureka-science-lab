import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { DISCOVERIES } from '@/data/discoveries';
import { SCIENTISTS } from '@/data/scientists';
import DiscoveryDetailView from '@/components/DiscoveryDetailView';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return DISCOVERIES.map((d) => ({
    slug: d.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const discovery = DISCOVERIES.find((d) => d.slug === slug);
  if (!discovery) {
    return {
      title: 'Penemuan Tidak Ditemukan — EurekaLab',
    };
  }

  return {
    title: `${discovery.title} — EurekaLab`,
    description: discovery.summary,
    openGraph: {
      title: `${discovery.title} — EurekaLab`,
      description: discovery.tagline,
    },
  };
}

export default async function DiscoveryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const discovery = DISCOVERIES.find((d) => d.slug === slug);

  if (!discovery) {
    notFound();
  }

  const contributingScientists = discovery.scientistIds.map((id) =>
    SCIENTISTS.find((s) => s.id === id)
  );

  const relatedDiscoveries = discovery.relatedDiscoverySlugs.map((s) =>
    DISCOVERIES.find((d) => d.slug === s)
  );

  return (
    <DiscoveryDetailView
      discovery={discovery}
      contributingScientists={contributingScientists}
      relatedDiscoveries={relatedDiscoveries}
    />
  );
}
