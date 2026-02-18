import { ShieldCheck, Truck, ThumbsUp, Wallet } from "lucide-react";

export function TrustBadge() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 px-4 w-full max-w-5xl mx-auto">
      <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-full mb-3">
          <Truck className="w-6 h-6" />
        </div>
        <h4 className="font-bold text-sm md:text-base text-slate-800">Frete Grátis</h4>
        <p className="text-xs text-slate-500">Para todo o Brasil</p>
      </div>
      
      <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="p-3 bg-green-50 text-green-600 rounded-full mb-3">
          <Wallet className="w-6 h-6" />
        </div>
        <h4 className="font-bold text-sm md:text-base text-slate-800">Pague na Entrega</h4>
        <p className="text-xs text-slate-500">Sem risco para você</p>
      </div>

      <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-full mb-3">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h4 className="font-bold text-sm md:text-base text-slate-800">Garantia Total</h4>
        <p className="text-xs text-slate-500">7 dias de satisfação</p>
      </div>

      <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="p-3 bg-green-50 text-green-600 rounded-full mb-3">
          <ThumbsUp className="w-6 h-6" />
        </div>
        <h4 className="font-bold text-sm md:text-base text-slate-800">Aprovado</h4>
        <p className="text-xs text-slate-500">Por especialistas</p>
      </div>
    </div>
  );
}
