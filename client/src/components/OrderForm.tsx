import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertOrderSchema } from "@shared/schema";
import { useCreateOrder } from "@/hooks/use-orders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckCircle2, ShieldCheck, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type OrderFormData = {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  quantity: number;
  totalPrice: number;
};

// Extend schema for form-specific handling if needed, but here we match DB mainly
// We will manually set totalPrice based on quantity
const formSchema = insertOrderSchema.extend({});

export function OrderForm() {
  const [success, setSuccess] = useState(false);
  const createOrder = useCreateOrder();
  
  const form = useForm<OrderFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      quantity: 1,
      totalPrice: 9700, // 97.00
    },
  });

  const quantity = form.watch("quantity");
  
  // Pricing Logic
  const getPrice = (qty: number) => {
    if (qty === 1) return 9700;
    if (qty === 2) return 14700; // Discount for 2
    if (qty === 3) return 19700; // Discount for 3
    return 9700 * qty;
  };

  const currentPrice = getPrice(quantity);

  const onSubmit = (data: OrderFormData) => {
    const finalData = {
      ...data,
      totalPrice: currentPrice,
    };
    
    createOrder.mutate(finalData, {
      onSuccess: () => {
        setSuccess(true);
        // Scroll to success message if needed
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    });
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto p-8 bg-green-50 border border-green-200 rounded-2xl text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-green-800 mb-4 font-display">Pedido Confirmado!</h2>
        <p className="text-lg text-green-700 mb-6">
          Parabéns! Recebemos seu pedido com sucesso.
        </p>
        <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm text-left">
          <p className="font-semibold text-slate-800 mb-2">Próximos passos:</p>
          <ul className="space-y-3 text-slate-600 text-sm">
            <li className="flex items-start gap-2">
              <span className="bg-green-100 text-green-700 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</span>
              Vamos preparar seu pacote com cuidado.
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-green-100 text-green-700 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</span>
              Você receberá o código de rastreio por WhatsApp/SMS.
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-green-100 text-green-700 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</span>
              <strong>O pagamento será feito apenas na entrega.</strong>
            </li>
          </ul>
        </div>
        <Button 
          className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 text-lg"
          onClick={() => window.location.reload()}
        >
          Voltar ao Início
        </Button>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-2 border-slate-200 shadow-xl overflow-hidden" id="order-form">
      <div className="bg-slate-900 text-white p-4 text-center">
        <h3 className="text-xl font-bold font-display flex items-center justify-center gap-2">
          <ShieldCheck className="w-5 h-5 text-green-400" />
          Finalizar Pedido Seguro
        </h3>
        <p className="text-sm text-slate-300">Seus dados estão protegidos. Pague somente na entrega.</p>
      </div>
      
      <CardContent className="p-6 md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Offer Selection */}
            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 mb-6">
              <Label className="text-base font-bold text-slate-800 mb-3 block">Escolha sua Oferta:</Label>
              <RadioGroup 
                defaultValue="1" 
                className="grid gap-3"
                onValueChange={(val) => form.setValue("quantity", parseInt(val))}
              >
                <div className={`flex items-center justify-between space-x-2 rounded-lg border p-4 cursor-pointer transition-all ${quantity === 1 ? 'border-primary bg-white shadow-md ring-1 ring-primary' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="q1" />
                    <Label htmlFor="q1" className="cursor-pointer font-medium">1 Joelheira (Unidade)</Label>
                  </div>
                  <span className="font-bold text-slate-900">R$ 97,00</span>
                </div>
                
                <div className={`relative flex items-center justify-between space-x-2 rounded-lg border p-4 cursor-pointer transition-all ${quantity === 2 ? 'border-primary bg-white shadow-md ring-1 ring-primary' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                  <div className="absolute -top-3 right-4 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Mais Vendido</div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="q2" />
                    <Label htmlFor="q2" className="cursor-pointer font-medium">2 Joelheiras (Par)</Label>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs text-slate-400 line-through">R$ 194,00</span>
                    <span className="font-bold text-green-600 text-lg">R$ 147,00</span>
                  </div>
                </div>

                <div className={`flex items-center justify-between space-x-2 rounded-lg border p-4 cursor-pointer transition-all ${quantity === 3 ? 'border-primary bg-white shadow-md ring-1 ring-primary' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="q3" />
                    <Label htmlFor="q3" className="cursor-pointer font-medium">3 Joelheiras (Família)</Label>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs text-slate-400 line-through">R$ 291,00</span>
                    <span className="font-bold text-green-600 text-lg">R$ 197,00</span>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 border-b pb-2">Dados de Entrega</h4>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome" className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp / Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="(00) 00000-0000" className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CEP</FormLabel>
                        <FormControl>
                          <Input placeholder="00000-000" className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço e Número</FormLabel>
                        <FormControl>
                          <Input placeholder="Rua, número, complemento" className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade</FormLabel>
                      <FormControl>
                        <Input placeholder="Sua cidade" className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <FormControl>
                        <Input placeholder="UF" maxLength={2} className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="bg-slate-100 p-4 rounded-xl flex items-center justify-between border border-slate-200 mt-6">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-slate-600" />
                <span className="text-slate-600 font-medium text-sm">Frete Expresso</span>
              </div>
              <span className="font-bold text-green-600">GRÁTIS</span>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-lg font-bold text-slate-700">Total a Pagar:</span>
              <span className="text-2xl font-black text-slate-900">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentPrice / 100)}
              </span>
            </div>

            <Button 
              type="submit" 
              className="w-full cta-gradient h-16 text-lg md:text-xl font-bold rounded-xl animate-pulse-slow shadow-xl"
              disabled={createOrder.isPending}
            >
              {createOrder.isPending ? "Processando..." : "ENVIAR PEDIDO AGORA"}
            </Button>
            
            <p className="text-center text-xs text-slate-500 mt-2 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Pagamento realizado somente no ato da entrega. Risco Zero.
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
