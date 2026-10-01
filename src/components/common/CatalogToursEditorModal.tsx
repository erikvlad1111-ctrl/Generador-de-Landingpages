'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  X, Sparkles, Layers, DollarSign, Clock, MapPin, 
  RotateCcw, Check, Edit2, Image as ImageIcon, ChevronRight,
  Plus, CheckCircle2, BookmarkPlus
} from 'lucide-react';
import { CatalogTourItem, LandingData } from '@/types/landing';
import { DEFAULT_SECONDARY_CATALOG_TOURS } from '@/data/defaultCatalogTours';
import { getStoredLandings } from '@/data/landingStore';
import { SAMPLE_TOUR_IMAGES } from '@/data/sampleImages';

interface CatalogToursEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTours?: CatalogTourItem[];
  onSave: (tours: CatalogTourItem[]) => void;
  currentSignatureTourName?: string;
}

export default function CatalogToursEditorModal({
  isOpen,
  onClose,
  currentTours,
  onSave,
  currentSignatureTourName = 'Tour Estrella (Configurado en el Formulario)'
}: CatalogToursEditorModalProps) {
  const [tours, setTours] = useState<CatalogTourItem[]>(() => {
    return (currentTours && currentTours.length > 0) ? currentTours : DEFAULT_SECONDARY_CATALOG_TOURS;
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [userLandings, setUserLandings] = useState<LandingData[]>([]);
  const [showImportSelector, setShowImportSelector] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTours((currentTours && currentTours.length > 0) ? currentTours : DEFAULT_SECONDARY_CATALOG_TOURS);
      setUserLandings(getStoredLandings());
    }
  }, [isOpen, currentTours]);

  if (!isOpen) return null;

  const handleUpdateField = (id: string, field: keyof CatalogTourItem, value: any) => {
    setTours(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleResetDefaults = () => {
    if (confirm('¿Restaurar los 6 tours sugeridos por defecto para el catálogo?')) {
      setTours(DEFAULT_SECONDARY_CATALOG_TOURS);
      setEditingId(null);
    }
  };

  const handleImportLanding = (targetTourId: string, landing: LandingData) => {
    setTours(prev => prev.map(t => {
      if (t.id === targetTourId) {
        return {
          ...t,
          title: landing.name,
          price: landing.price || '$50 USD',
          duration: landing.duration || 'Full Day',
          location: landing.destination || 'Cusco, Perú',
          image: landing.heroImage || t.image,
          tag: 'Mi Landing'
        };
      }
      return t;
    }));
    setShowImportSelector(null);
  };

  const handleSaveAndClose = () => {
    onSave(tours);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-start justify-between bg-gradient-to-r from-slate-900 to-indigo-950 text-white">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-300 shadow-inner">
              <Layers size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold tracking-tight text-white">
                  Editor del Catálogo de Tours
                </h3>
                <span className="text-[11px] bg-blue-500/20 text-blue-200 font-semibold px-2.5 py-0.5 rounded-full border border-blue-400/20">
                  6 Tours en Vitrina
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Personaliza los 6 tours del catálogo que se muestran en la sección de tours en los 5 diseños.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            title="Cerrar ventana"
          >
            <X size={20} />
          </button>
        </div>

        {/* Informative strip */}
        <div className="bg-blue-50/80 border-b border-blue-100 px-6 py-3 flex items-center justify-between text-xs text-blue-900 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Sparkles size={15} className="text-blue-600 shrink-0" />
            <span>
              <strong>Catálogo Multitour (6 Tours):</strong> Configura las 6 tarjetas de la vitrina. El Tour Principal sigue editándose en el formulario.
            </span>
          </div>
          <button
            type="button"
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-700 hover:text-blue-900 hover:underline cursor-pointer ml-auto"
          >
            <RotateCcw size={13} />
            Restaurar 6 tours por defecto
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {tours.map((tour, index) => {
              const isEditing = editingId === tour.id;
              const slotNumber = index + 1;

              return (
                <div 
                  key={tour.id} 
                  className={`border rounded-2xl transition-all duration-200 ${
                    isEditing 
                      ? 'border-blue-500 bg-blue-50/20 shadow-md ring-2 ring-blue-500/10' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {/* Card Bar */}
                  <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-4">
                      {/* Thumbnail Preview */}
                      <div className="relative w-20 h-16 sm:w-24 sm:h-18 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-2xs">
                        <Image
                          src={tour.image || 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop'}
                          alt={tour.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                        <span className="absolute bottom-1 right-1 bg-black/70 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                          #{slotNumber}
                        </span>
                      </div>

                      {/* Info */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                            Posición #{slotNumber} en Catálogo
                          </span>
                          {tour.tag && (
                            <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/50">
                              {tour.tag}
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                          {tour.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1 text-emerald-600 font-bold">
                            <DollarSign size={13} /> {tour.price}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={13} /> {tour.duration || 'Full Day'}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={13} /> {tour.location || 'Cusco'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      {/* Import Landing Button */}
                      {userLandings.length > 0 && (
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setShowImportSelector(showImportSelector === tour.id ? null : tour.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                            title="Rellenar con datos de tus otras landings"
                          >
                            <BookmarkPlus size={14} className="text-blue-600" />
                            <span>Importar Landing</span>
                          </button>

                          {/* Import Dropdown */}
                          {showImportSelector === tour.id && (
                            <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-20 space-y-1">
                              <div className="px-2.5 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                Selecciona una Landing
                              </div>
                              <div className="max-h-48 overflow-y-auto space-y-1">
                                {userLandings.map((l) => (
                                  <button
                                    key={l.id}
                                    type="button"
                                    onClick={() => handleImportLanding(tour.id, l)}
                                    className="w-full text-left p-2 rounded-xl hover:bg-blue-50 text-xs transition-colors flex items-center justify-between group"
                                  >
                                    <div className="truncate pr-2">
                                      <p className="font-bold text-slate-800 group-hover:text-blue-600 truncate">{l.name}</p>
                                      <p className="text-[10px] text-slate-400">{l.price} • {l.duration}</p>
                                    </div>
                                    <ChevronRight size={14} className="text-slate-400 group-hover:text-blue-600 shrink-0" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => setEditingId(isEditing ? null : tour.id)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isEditing
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                        }`}
                      >
                        <Edit2 size={13} />
                        <span>{isEditing ? 'Listo' : 'Editar'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Inline Edit Form */}
                  {isEditing && (
                    <div className="p-4 sm:p-5 pt-0 border-t border-blue-100/60 mt-2 bg-blue-50/30 rounded-b-2xl space-y-3">
                      <div className="grid sm:grid-cols-2 gap-3 pt-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Título del Tour
                          </label>
                          <input
                            type="text"
                            value={tour.title}
                            onChange={(e) => handleUpdateField(tour.id, 'title', e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 bg-white outline-none"
                            placeholder="Ej. Tour Salkantay Trek Clásico"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Ubicación / Destino
                          </label>
                          <input
                            type="text"
                            value={tour.location || ''}
                            onChange={(e) => handleUpdateField(tour.id, 'location', e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 bg-white outline-none"
                            placeholder="Ej. Anta - Mollepata"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Precio de Referencia
                          </label>
                          <input
                            type="text"
                            value={tour.price}
                            onChange={(e) => handleUpdateField(tour.id, 'price', e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 bg-white outline-none"
                            placeholder="Ej. $45 USD"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Duración Estimada
                          </label>
                          <input
                            type="text"
                            value={tour.duration || ''}
                            onChange={(e) => handleUpdateField(tour.id, 'duration', e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 bg-white outline-none"
                            placeholder="Ej. Full Day (05:00 - 18:00)"
                          />
                        </div>
                      </div>

                      {/* Image selector */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          URL de Imagen o Foto Rápida
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={tour.image}
                            onChange={(e) => handleUpdateField(tour.id, 'image', e.target.value)}
                            className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 bg-white outline-none font-mono"
                            placeholder="https://images.unsplash.com/..."
                          />
                        </div>

                        {/* Quick Presets */}
                        <div className="flex items-center gap-2 mt-2 overflow-x-auto pb-1">
                          <span className="text-[10px] text-slate-400 font-semibold shrink-0">Fotos rápidas:</span>
                          {SAMPLE_TOUR_IMAGES.map((img) => (
                            <button
                              key={img.id}
                              type="button"
                              onClick={() => handleUpdateField(tour.id, 'image', img.url)}
                              className={`relative w-8 h-8 rounded-lg overflow-hidden border shrink-0 transition-transform hover:scale-105 cursor-pointer ${
                                tour.image === img.url ? 'ring-2 ring-blue-600 border-blue-600' : 'border-slate-200'
                              }`}
                              title={img.title}
                            >
                              <Image src={img.url} alt={img.title} fill className="object-cover" unoptimized />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <p className="text-xs text-slate-500 hidden sm:block">
            Los cambios se reflejarán inmediatamente en la sección de Catálogo del Portal.
          </p>
          <div className="flex items-center gap-2.5 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSaveAndClose}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/20 transition-all cursor-pointer hover:scale-101"
            >
              <Check size={14} />
              <span>Guardar Catálogo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
