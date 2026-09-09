import React from 'react';
import Image from 'next/image';
import { MapPin, Clock, Star, CheckCircle } from 'lucide-react';

interface TemplateProps {
  data: {
    hero: { title: string; subtitle: string; cta: string };
    about: { title: string; content: string };
    features: { title: string; items: string[] };
  };
}

export default function AdventureTemplate({ data }: TemplateProps) {
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-emerald-500 selection:text-white">
      {/* Navbar (Static for template) */}
      <nav className="fixed w-full z-50 bg-stone-900/90 backdrop-blur-sm text-white px-8 py-4 flex justify-between items-center">
        <div className="text-xl font-bold tracking-tighter uppercase text-emerald-400">
          TrekExplorer
        </div>
        <div className="flex gap-6 text-sm font-medium">
          <a href="#" className="hover:text-emerald-400 transition-colors">La Ruta</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Itinerario</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Reseñas</a>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-lg hover:shadow-emerald-600/30">
          Reservar Ahora
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-stone-900/40 z-10" />
        <Image 
          src="https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop" 
          alt="Mountain landscape" 
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-sm font-medium mb-6 backdrop-blur-md">
            <MapPin size={14} /> Destino Destacado
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
            {data.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-stone-200 mb-10 max-w-2xl font-light drop-shadow">
            {data.hero.subtitle}
          </p>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-lg px-8 py-4 rounded-full font-bold transition-all shadow-xl shadow-emerald-600/20 hover:scale-105">
            {data.hero.cta}
          </button>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="relative z-30 -mt-12 max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-stone-100">
          <div className="flex items-center gap-4 md:justify-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-stone-500 font-medium">Duración</p>
              <p className="font-bold text-lg">3 Días, 2 Noches</p>
            </div>
          </div>
          <div className="flex items-center gap-4 md:justify-center pt-6 md:pt-0">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-sm text-stone-500 font-medium">Punto de inicio</p>
              <p className="font-bold text-lg">Cusco, Perú</p>
            </div>
          </div>
          <div className="flex items-center gap-4 md:justify-center pt-6 md:pt-0">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Star size={24} />
            </div>
            <div>
              <p className="text-sm text-stone-500 font-medium">Dificultad</p>
              <p className="font-bold text-lg">Moderada</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-stone-800">{data.about.title}</h2>
            <p className="text-lg text-stone-600 leading-relaxed">
              {data.about.content}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
              <Image 
                src="https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop" 
                alt="Machu Picchu 1" 
                fill
                sizes="(max-width: 768px) 50vw, 300px"
                className="object-cover" 
              />
            </div>
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg mt-8">
              <Image 
                src="https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop" 
                alt="Machu Picchu 2" 
                fill
                sizes="(max-width: 768px) 50vw, 300px"
                className="object-cover" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features/Highlights */}
      <section className="py-24 bg-stone-900 text-white px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">{data.features.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {data.features.items.map((item, idx) => (
              <div key={idx} className="bg-stone-800 p-8 rounded-2xl border border-stone-700 hover:border-emerald-500 transition-colors">
                <CheckCircle className="text-emerald-400 mb-6" size={32} />
                <h3 className="text-xl font-bold mb-4">{item.split(':')[0]}</h3>
                <p className="text-stone-400 leading-relaxed">
                  {item.split(':')[1] || "Una experiencia inolvidable que cambiará tu perspectiva."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Simple Footer */}
      <footer className="bg-stone-950 py-12 text-center text-stone-500">
        <p>© 2026 Cusco Creativos S.A.C. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
