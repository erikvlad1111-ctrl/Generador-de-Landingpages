export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg border border-slate-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Cusco Creativos</h1>
          <p className="text-slate-500 mt-2">Landing Page Generator</p>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm text-center text-slate-600">
            Bienvenido al sistema interno. Por favor, inicia sesión para continuar.
          </p>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}
