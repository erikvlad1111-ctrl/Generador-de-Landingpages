import React from 'react';
import { LandingData } from '@/types/landing';
import AdventureTemplate from './AdventureTemplate';
import PremiumTemplate from './PremiumTemplate';
import CulturalTemplate from './CulturalTemplate';

interface TemplateRendererProps {
  data: LandingData;
  isLive?: boolean;
}

export default function TemplateRenderer({ data, isLive = false }: TemplateRendererProps) {
  switch (data.template) {
    case 'premium':
      return <PremiumTemplate data={data} isLive={isLive} />;
    case 'cultural':
      return <CulturalTemplate data={data} isLive={isLive} />;
    case 'adventure':
    default:
      return <AdventureTemplate data={data} isLive={isLive} />;
  }
}
