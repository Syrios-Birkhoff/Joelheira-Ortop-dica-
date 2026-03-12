import { Button } from "@/components/ui/button";
import { TrustBadge } from "@/components/TrustBadge";
import { OrderForm } from "@/components/OrderForm";
import { 
  ArrowDown, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Clock, 
  ShieldCheck, 
  Star,
  Truck 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Images (Simulated imports as per instructions)
// In a real build these would be static imports if in assets, or relative paths if in public
const images = {
  hero: "/images/hero.webp",
  product: "/images/product.jpg",
  pair: "/images/pair.webp",
  beforeAfter1: "/images/before-after-1.jpg",
  beforeAfter2: "/images/before-after-2.jpg",
  howToUse: "/images/how-to-use.webp",
  pricing1: "/images/pricing-1.webp",
  pricing2: "/images/pricing-2.png",
  pricing3: "/images/pricing-3.png",
  carouselLeft: [
    "/images/carousel/left_01.png",
    "/images/carousel/left_02.png",
    "/images/carousel/left_03.png",
    "/images/carousel/left_04.png"
  ],
  carouselRight: [
    "/images/carousel/right_01.jpg",
    "/images/carousel/right_02.jpg",
    "/images/carousel/right_03.jpg",
    "/images/carousel/right_04.jpg",
    "/images/carousel/right_05.jpg"
  ]
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

function ImageCarousel({ images, side }: { images: string[], side: "left" | "right" }) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="space-y-4">
      <div className="relative group overflow-hidden rounded-2xl border-2 border-slate-700 aspect-[4/5] bg-slate-800">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 50) prev();
              else if (info.offset.x < -50) next();
            }}
            className="w-full h-full object-cover cursor-grab active:cursor-grabbing"
          />
        </AnimatePresence>
        
        {/* Navigation Buttons */}
        <button 
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
          data-testid={`button-carousel-${side}-prev`}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button 
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
          data-testid={`button-carousel-${side}-next`}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
        
        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full transition-colors ${i === index ? 'bg-white' : 'bg-white/40'}`} 
            />
          ))}
        </div>
      </div>
      <p className="text-slate-300 italic text-center text-sm">
        {side === "left" ? "Resultados reais de nossos clientes." : "Transformações incríveis com uso contínuo."}
      </p>
    </div>
  );
}

export default function Home() {
  const scrollToOrder = () => {
    const element = document.getElementById("order-form");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Notification Bar */}
      <div className="bg-slate-900 text-white py-2 px-4 text-center text-xs md:text-sm font-bold tracking-wide sticky top-0 z-50 shadow-md">
        <span className="animate-pulse">🚚 ENVIAMOS PARA TODO BRASIL – PAGUE SOMENTE NA ENTREGA 🚚</span>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-8 md:pt-16 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 text-center md:text-left z-10"
            >
              <div className="inline-block bg-lime-100 text-lime-700 px-4 py-1.5 rounded-full text-sm font-bold mb-2">
                Recomendado por Ortopedistas
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-slate-900 leading-[1.1]">
                Volte a Caminhar com Confiança e Estabilidade Total
              </h1>
              <p className="text-lg text-slate-600 md:pr-8 leading-relaxed">
                A Tecnologia de Compressão 3D que Protege seus Joelhos no Dia a Dia.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                <Button 
                  asChild
                  className="cta-gradient h-16 px-8 text-xl font-bold rounded-full shadow-xl shadow-orange-500/20"
                >
                  <a href="#ofertas">QUERO ALÍVIO AGORA</a>
                </Button>
              </div>
              
              <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-slate-500 font-medium">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>4.9/5 Avaliações</span>
                </div>
                <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span>Garantia de 30 Dias</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl transform translate-y-10"></div>
              {/* Using descriptive comment for Unsplash fallback if dynamic, but here we use provided assets */}
              {/* Product Hero Image */}
              <img 
                src={images.hero}
                alt="Joelheira Ortopédica em uso por pessoa ativa"
                className="relative w-full max-w-md mx-auto rounded-3xl shadow-2xl border-4 border-white transform hover:-translate-y-2 transition-transform duration-500"
              />
              
              <div className="absolute -bottom-4 -left-4 md:bottom-6 md:-left-6 bg-red-600 py-2 px-4 rounded-lg shadow-lg border border-red-500 flex items-center gap-2 z-20">
                <div className="bg-white/20 p-1.5 rounded-full">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-white/80 font-bold uppercase leading-none mb-0.5">Aproveite:</p>
                  <p className="text-sm font-black text-white leading-tight uppercase">RESTAM APENAS 14 UNIDADES</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-b border-slate-100">
        <TrustBadge />
      </section>

      {/* Pain Points / Problem Agitation */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
              Você Sente Essas Dores Diariamente?
            </h2>
            <p className="text-lg text-slate-600">Não ignore os sinais do seu corpo. A dor no joelho pode evoluir para problemas crônicos.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Dificuldade ao Caminhar", desc: "Sentir pontadas ou fraqueza a cada passo que dá." },
              { title: "Dor ao Subir Escadas", desc: "Aquela fisgada aguda que faz você evitar degraus." },
              { title: "Inchaço e Rigidez", desc: "Joelhos inchados ao final do dia ou ao acordar." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-red-400 hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
                  <ArrowDown className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution / Product Details */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div {...fadeInUp} className="order-2 md:order-1">
              <video 
                src="/videos/demo.mp4"
                autoPlay 
                loop 
                muted 
                playsInline
                className="rounded-3xl shadow-2xl border-4 border-slate-100 w-full object-cover"
              />
            </motion.div>
            
            <motion.div {...fadeInUp} className="order-1 md:order-2 space-y-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 leading-tight">
                A Tecnologia Que Devolveu o Movimento a Milhares de Brasileiros
              </h2>
              <div className="space-y-6">
                {[
                  { title: "Compressão 3D Premium", desc: "Tecido elástico de alta tecnologia que melhora a circulação sanguínea e oxigenação muscular." },
                  { title: "Estabilização Total", desc: "Suporte lateral que mantém a patela alinhada, prevenindo lesões e torções." },
                  { title: "Respirável e Confortável", desc: "Use o dia todo sem suor excessivo ou desconforto. Perfeito para qualquer estação." },
                  { title: "Design Anatômico", desc: "Se adapta perfeitamente ao formato do seu joelho, não escorrega e não enrola." }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1">
                      <div className="w-8 h-8 bg-lime-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-lime-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900">{feature.title}</h4>
                      <p className="text-slate-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Before and After Proof */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 px-2 break-words sm:text-2xl min-[480px]:text-3xl" style={{ fontSize: 'clamp(24px, 5vw, 36px)', lineHeight: '1.2' }}>
              RESULTADOS REAIS E VISÍVEIS
            </h2>
            <p className="text-slate-300 text-lg">Veja como a Joelheira Ortopédica transformou a vida de quem sofria com dores crônicas.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ImageCarousel images={images.carouselLeft} side="left" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ImageCarousel images={images.carouselRight} side="right" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How to use / Comparison */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
                <h3 className="text-3xl font-display font-bold text-slate-900">Por que escolher nossa Joelheira?</h3>
                <p className="text-slate-600 mb-4">Diferente de remédios que agridem o estômago ou cirurgias arriscadas, nossa solução é 100% natural, segura e imediata.</p>
                
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-lime-100 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-lime-600" />
                    </div>
                    <span className="text-slate-700 font-medium">Sem efeitos colaterais</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-lime-100 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-lime-600" />
                    </div>
                    <span className="text-slate-700 font-medium">Alívio imediato da dor</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-lime-100 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-lime-600" />
                    </div>
                    <span className="text-slate-700 font-medium">Muito mais barato que fisioterapia</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-lime-100 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-lime-600" />
                    </div>
                    <span className="text-slate-700 font-medium">Durável e lavável</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-full min-h-[300px] bg-slate-200">
                <img 
                  src={images.howToUse}
                  alt="Comparativo de tratamentos"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Omnicash / Trust Building Section */}
      <section className="py-12 bg-blue-50 border-y border-blue-100">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-block p-4 bg-white rounded-full shadow-md mb-6 animate-bounce">
            <Truck className="w-10 h-10 text-lime-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 mb-6">
            AQUI O RISCO É ZERO: <span className="text-lime-600">PAGUE SÓ QUANDO RECEBER!</span>
          </h2>
          <p className="text-xl text-slate-700 leading-relaxed mb-8">
            Sabemos que comprar na internet pode dar medo. Por isso, confiamos tanto na qualidade do nosso produto que <strong>enviamos primeiro</strong>. Você confere a mercadoria em suas mãos e só então faz o pagamento para o entregador.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100">
              <span className="block text-2xl font-bold text-slate-900 mb-1">100%</span>
              <span className="text-sm text-slate-500">Seguro</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100">
              <span className="block text-2xl font-bold text-slate-900 mb-1">24h</span>
              <span className="text-sm text-slate-500">Expedição</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100">
              <span className="block text-2xl font-bold text-slate-900 mb-1">5.000+</span>
              <span className="text-sm text-slate-500">Entregas</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100">
              <span className="block text-2xl font-bold text-slate-900 mb-1">Brasil</span>
              <span className="text-sm text-slate-500">Todo País</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-16 md:py-24 bg-slate-50" id="ofertas">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-black text-red-600 mb-4 tracking-tight">
              OFERTA EXCLUSIVA POR TEMPO LIMITADO
            </h2>
            <p className="text-xl text-slate-600 font-medium">Peça hoje e garanta <span className="text-slate-900 font-bold underline decoration-lime-500 decoration-2">Frete Grátis</span> para todo Brasil.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Card 1: Basic */}
            <motion.div 
              {...fadeInUp}
              className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 flex flex-col items-center text-center relative hover:shadow-xl transition-shadow"
            >
              <div className="h-[180px] w-full flex items-center justify-center mb-6 overflow-hidden">
                <img src={images.pricing1} alt="1 Joelheira" className="max-h-full object-contain" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">1 Joelheira</h3>
              <p className="text-slate-500 text-sm mb-4">Para proteção individual</p>
              <div className="mt-auto w-full">
                <div className="text-slate-400 line-through text-lg font-bold mb-1">R$ 129,90</div>
                <div className="text-4xl font-black text-slate-900 mb-6">R$ 79,90</div>
                <Button 
                  asChild
                  variant="outline"
                  className="w-full h-14 border-lime-500 text-lime-700 hover:bg-lime-50 font-bold text-lg rounded-xl"
                >
                  <a href="https://app.coinzz.com.br/checkout/1-unidade-vguqb-745">COMPRAR AGORA</a>
                </Button>
                <p style={{ fontSize: '11px', color: '#666', textAlign: 'center', marginTop: '5px' }}>⚠️ Fique tranquilo: Seu CPF será solicitado na próxima etapa apenas para a emissão da Nota Fiscal. Nenhuma cobrança será feita agora.</p>
              </div>
              <div className="mt-6 flex items-center justify-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <div className="flex items-center gap-1"><Truck className="w-3 h-3" /> Frete Grátis</div>
                <div className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Envio Imediato</div>
              </div>
            </motion.div>

            {/* Card 2: Champion (Most Popular) */}
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 1.05 }}
              whileInView={{ opacity: 1, y: 0, scale: 1.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-lime-500 flex flex-col items-center text-center relative z-10"
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-lime-500 text-white px-6 py-1 rounded-full text-sm font-black uppercase tracking-widest shadow-lg">
                MAIS VENDIDO
              </div>
              <div className="h-[180px] w-full flex items-center justify-center mb-6 overflow-hidden">
                <img src={images.pricing2} alt="2 Joelheiras" className="max-h-full object-contain" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">2 Joelheiras (Par)</h3>
              <div className="bg-lime-50 text-lime-700 px-4 py-2 rounded-xl text-xs font-bold mb-4 leading-tight">
                💡 Recomendado por Especialistas: Proteja ambas as pernas para evitar sobrecarga no joelho saudável.
              </div>
              <div className="mt-auto w-full">
                <div className="text-slate-400 line-through text-lg font-bold mb-1">R$ 239,90</div>
                <div className="text-5xl font-black text-slate-900 mb-6">R$ 139,90</div>
                <Button 
                  asChild
                  className="w-full h-16 bg-lime-500 hover:bg-lime-600 text-white font-black text-xl rounded-xl shadow-xl shadow-lime-500/20 animate-pulse"
                >
                  <a href="https://app.coinzz.com.br/checkout/2-unidades-ucdqy-746">COMPRAR AGORA</a>
                </Button>
                <p style={{ fontSize: '11px', color: '#666', textAlign: 'center', marginTop: '5px' }}>⚠️ Fique tranquilo: Seu CPF será solicitado na próxima etapa apenas para a emissão da Nota Fiscal. Nenhuma cobrança será feita agora.</p>
              </div>
              <div className="mt-6 flex items-center justify-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <div className="flex items-center gap-1"><Truck className="w-3 h-3" /> Frete Grátis</div>
                <div className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Envio Imediato</div>
              </div>
            </motion.div>

            {/* Card 3: Family */}
            <motion.div 
              {...fadeInUp}
              className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 flex flex-col items-center text-center relative hover:shadow-xl transition-shadow"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md">
                MELHOR CUSTO BENEFÍCIO
              </div>
              <div className="h-[180px] w-full flex items-center justify-center mb-6 overflow-hidden">
                <img src={images.pricing3} alt="3 Joelheiras" className="max-h-full object-contain" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">3 Joelheiras (Família)</h3>
              <p className="text-slate-500 text-sm mb-4">Perfeito para presentear ou dividir com a família.</p>
              <div className="mt-auto w-full">
                <div className="text-slate-400 line-through text-lg font-bold mb-1">R$ 359,90</div>
                <div className="text-4xl font-black text-slate-900 mb-6">R$ 179,90</div>
                <Button 
                  asChild
                  variant="outline"
                  className="w-full h-14 border-lime-500 text-lime-700 hover:bg-lime-50 font-bold text-lg rounded-xl"
                >
                  <a href="https://app.coinzz.com.br/checkout/3-unidades-msqig-747">COMPRAR AGORA</a>
                </Button>
                <p style={{ fontSize: '11px', color: '#666', textAlign: 'center', marginTop: '5px' }}>⚠️ Fique tranquilo: Seu CPF será solicitado na próxima etapa apenas para a emissão da Nota Fiscal. Nenhuma cobrança será feita agora.</p>
              </div>
              <div className="mt-6 flex items-center justify-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <div className="flex items-center gap-1"><Truck className="w-3 h-3" /> Frete Grátis</div>
                <div className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Envio Imediato</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center text-sm border-t border-slate-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-center gap-6 mb-8">
            {/* Placeholder icons for payments/socials */}
            <div className="w-10 h-6 bg-slate-700 rounded opacity-50"></div>
            <div className="w-10 h-6 bg-slate-700 rounded opacity-50"></div>
            <div className="w-10 h-6 bg-slate-700 rounded opacity-50"></div>
            <div className="w-10 h-6 bg-slate-700 rounded opacity-50"></div>
          </div>
          <p className="mb-4">
            © {new Date().getFullYear()} Loja Ortopédica Oficial. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Rastrear Pedido</a>
            <a href="#" className="hover:text-white transition-colors">Contato</a>
          </div>
          <p className="mt-8 text-xs text-slate-600 max-w-2xl mx-auto">
            Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. Depois que você sair do Facebook, a responsabilidade não é deles e sim do nosso site. Fazemos todos os esforços para indicar claramente e mostrar todas as provas do produto e usar resultados reais.
          </p>
        </div>
      </footer>
    </div>
  );
}
