'use client';

import Wrapper from "@/components/Wrapper";
import Image from "next/image";

type PopularService = {
  img: string;           // caminho da imagem (popular-01.png, etc.)
  title: string;
  reviewScore: number;   // 0–5
  price: number;         // número em BRL (ex.: 197 -> R$197,00)
};

const Cards: PopularService[] = [
  { img: "/popular-01.png", title: "Pintura de paredes e tetos", reviewScore: 4.9, price: 197 },
  { img: "/popular-02.png", title: "Pedreiro", reviewScore: 4.9, price: 197 },
  { img: "/popular-03.png", title: "Pequenos reparos", reviewScore: 4.9, price: 197 },
  { img: "/popular-04.png", title: "Serviço de limpeza", reviewScore: 4.9, price: 197 },
  { img: "/popular-05.png", title: "Reparo de telhado", reviewScore: 4.9, price: 197 },
  { img: "/popular-06.png", title: "Serviços de encanamento", reviewScore: 4.9, price: 197 },
  { img: "/popular-07.png", title: "Ar Condicionado", reviewScore: 4.9, price: 690 },
  { img: "/popular-08.png", title: "Decks & varandas", reviewScore: 4.9, price: 197 },
  { img: "/popular-09.png", title: "Pintura de Desocupação", reviewScore: 4.9, price: 197 },
];

const fmtBRL = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);

export default function Test() {
  return (
    <div className="text-black">
      <Wrapper className="flex flex-col gap-4 pt-8 pb-8 !max-w-2xl lg:!px-0 px-2">
     

        {/* container dos cards com grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {Cards.map((s) => (
            <article
              key={s.title}
              className="p-3 rounded-md border-[0.25px] border-gray-200 bg-white flex gap-4 items-center"
            >
              <Image src={s.img} width={60} height={60} alt={s.title} />
              <div>
                <h2 className="text-base font-semibold">{s.title}</h2>

                <div className="flex items-center gap-2 text-[12px]">
                  <span className="font-bold inline-flex items-center gap-2">
                    <Image
                      src="/star-yellow.svg"
                      width={16}
                      height={16}
                      alt="Avaliação"
                    />
                    {s.reviewScore.toFixed(1)}
                  </span>

                  {/* divisor vertical que não "colapsa" em flex */}
                  <span className="bg-gray-300 w-px self-stretch my-1 " />

                  <span className="text-gray-600">
                    Preço médio{" "}
                    <span className="font-bold text-black">{fmtBRL(s.price)}</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Wrapper>
    </div>
  );
}