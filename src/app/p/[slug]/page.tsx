"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import TemplateRenderer from '@/templates/TemplateRenderer';
import { getStoredLandings, LandingData } from '@/data/landingStore';

export default function PublicLandingPage() {
  const params = useParams();
  const slug = (params?.slug as string) || '';
  const [landing] = useState<LandingData | null>(() => {
    const landings = getStoredLandings();
    if (!slug) return landings[0] || null;
    return landings.find(l => l.slug.toLowerCase() === slug.toLowerCase()) || landings[0] || null;
  });

  if (!landing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800 p-6 text-center">
        <h1 className="text-3xl font-bold mb-3">Landing no encontrada</h1>
        <p className="text-slate-500 mb-6">La landing page que buscas no existe o fue retirada.</p>
        <Link 
          href="/demo" 
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <ArrowLeft size={16} /> Volver al Sistema
        </Link>
      </div>
    );
  }

  const cleanPhone = (landing.whatsapp || '+51984123456').replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(`Hola ${landing.guideName || 'Cusco Creativos'}, vi su página web "${landing.name}" y deseo información para reservar.`);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  return (
    <div className="relative">
      {/* Visual Public Landing */}
      <TemplateRenderer data={landing} isLive={true} />

      {/* Floating WhatsApp Button for tourist */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center gap-3 group"
      >
        <MessageCircle size={28} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-bold text-sm pr-1">
          ¡Chatea con el Guía!
        </span>
      </a>
    </div>
  );
}
