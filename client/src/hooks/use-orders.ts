import { useMutation } from "@tanstack/react-query";
import { api, type CreateOrderInput, type OrderResponse } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateOrder() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: CreateOrderInput) => {
      // Validate with Zod before sending (double safety)
      const validated = api.orders.create.input.parse(data);
      
      const res = await fetch(api.orders.create.path, {
        method: api.orders.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        // Try to parse error message
        try {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to create order");
        } catch (e) {
          throw new Error("Erro ao processar pedido. Tente novamente.");
        }
      }

      return api.orders.create.responses[201].parse(await res.json());
    },
    onError: (error) => {
      toast({
        title: "Erro no pedido",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
