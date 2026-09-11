import React from 'react';
import { LandingData } from '@/types/landing';
import AdventureTemplate from './AdventureTemplate';
import PremiumTemplate from './PremiumTemplate';
import CulturalTemplate from './CulturalTemplate';
import BohoTemplate from './BohoTemplate';
import AgencyPortalTemplate from './AgencyPortalTemplate';

interface TemplateRendererProps {
  data: LandingData;
  isLive?: boolean;
  viewMode?: 'desktop' | 'tablet' | 'mobile';
}

export default function TemplateRenderer({ data, isLive = false, viewMode = 'desktop' }: TemplateRendererProps) {
  switch (data.template) {
    case 'agency-portal':
      return <AgencyPortalTemplate data={data} isLive={isLive} viewMode={viewMode} />;
    case 'premium':
      return <PremiumTemplate data={data} isLive={isLive} viewMode={viewMode} />;
    case 'cultural':
      return <CulturalTemplate data={data} isLive={isLive} viewMode={viewMode} />;
    case 'boho-nature':
      return <BohoTemplate data={data} isLive={isLive} viewMode={viewMode} />;
    case 'adventure':
    default:
      return <AdventureTemplate data={data} isLive={isLive} viewMode={viewMode} />;
  }
}

