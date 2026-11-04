"use client";

import React, { Suspense } from 'react';
import { LoginPortalView } from './login/page';

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-sm">
          Cargando módulo de seguridad...
        </div>
      }
    >
      <LoginPortalView />
    </Suspense>
  );
}
