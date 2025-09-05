import { useId, useState } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"

type Item = {
  value: string
  label: string
  price?: string
}

export default function Multistep2() {
  const id = useId()

  const items: Item[] = [
    { value: "1", label: "Apartamentos", price: "$9/mo" },
    { value: "2", label: "Casa" },
    { value: "3", label: "Comercial/escritório" },
    { value: "4", label: "Condomínio (área comum)" },
    { value: "5", label: "Outro" },
  ]

  // múltiplas seleções
  const [selected, setSelected] = useState<Set<string>>(new Set(["2"]))

  const toggle = (v: string, next: boolean) => {
    setSelected((prev) => {
      const s = new Set(prev)
      next ? s.add(v) : s.delete(v)
      return s
    })
  }

  return (
    <fieldset className="space-y-4">
      {/* <legend className="text-foreground text-sm leading-none font-medium">
        Selecione o(s) tipo(s) de imóvel
      </legend> */}

      <div className="rounded-md shadow-xs">
        {items.map((item, i) => {
          const inputId = `${id}-${item.value}`
          const priceId = `${inputId}-price`
          const checked = selected.has(item.value)

          return (
            <div
              key={item.value}
              // estilo do card quando marcado (usa :has() do Tailwind 3.4+)
              className={[
                "relative flex flex-col gap-4 border p-4 outline-none",
                "border-input first:rounded-t-md last:rounded-b-md",
                "has-[[data-state=checked]]:border-primary/50",
                "has-[[data-state=checked]]:bg-accent",
                "has-[[data-state=checked]]:z-10",
                i > 0 ? "-mt-px" : "",
              ].join(" ")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={inputId}
                    checked={checked}
                    onCheckedChange={(v) => toggle(item.value, v === true)}
                    // clicável no card inteiro
                    className="after:absolute after:inset-0"
                    aria-describedby={priceId}
                    value={item.value}
                  />
                  <Label className="inline-flex items-start" htmlFor={inputId}>
                    {item.label}
                    {/* {item.value === "3" && (
                      <Badge className="ms-2 -mt-1">Popular</Badge>
                    )} */}
                  </Label>
                </div>

                <div
                  id={priceId}
                  className="text-muted-foreground text-xs leading-[inherit]"
                >
                  {item.price}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Exemplo de como ler os selecionados */}
      {/* <pre>{JSON.stringify(Array.from(selected), null, 2)}</pre> */}
    </fieldset>
  )
}
