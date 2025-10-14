"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Test from "@/components/Test";

// 🔗 Catálogo central de rotas sugeridas (nome + url)
// Edite livremente os hrefs conforme sua IA de rotas.
const SUGGESTIONS = [
  { label: "Pintor", href: "/service-request/category/pintura" },
  { label: "Pedreiro", href: "/service-request/category/pedreiro" },
  {
    label: "Marido de Aluguel",
    href: "/service-request/category/marido-de-aluguel",
  },
  { label: "Encanador", href: "/service-request/category/encanador" },
  {
    label: "Diarista",
    href: "/service-request/category/diarista",
  },
  { label: "Limpeza", href: "/service-request/category/diarista" },
];

// ⚡ Atalhos com controle de URL independente
const SHORTCUTS = [
  { label: "Pintor", href: "/service-request/category/pintura" },
  { label: "Pedreiro", href: "/service-request/category/pedreiro" },
  { label: "Encanador", href: "/service-request/category/encanador" },
  { label: "Diarista", href: "/service-request/category/diarista" },
  {
    label: "Marido de aluguel",
    href: "/service-request/category/marido-de-aluguel",
  },
];

const HomePage: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [filteredSuggestions, setFilteredSuggestions] =
    useState<typeof SUGGESTIONS>(SUGGESTIONS);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Filtra sugestões com base no termo
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = SUGGESTIONS.filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredSuggestions(SUGGESTIONS);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  // Fecha a caixa de sugestões ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleInputFocus = () => {
    setFilteredSuggestions(SUGGESTIONS);
    setShowSuggestions(true);
  };

  const goTo = (href: string) => {
    setShowSuggestions(false);
    router.push(href);
  };

  const handleSuggestionClick = (suggestion: {
    label: string;
    href: string;
  }) => {
    setSearchTerm(suggestion.label);
    goTo(suggestion.href);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setShowSuggestions(false);
      (e.target as HTMLInputElement).blur();
      return;
    }
    if (e.key === "Enter") {
      // 1) Se houver uma correspondência exata, vai nela
      const exact = SUGGESTIONS.find(
        (s) => s.label.toLowerCase() === searchTerm.toLowerCase().trim()
      );
      if (exact) {
        goTo(exact.href);
        return;
      }
      // 2) Se houver filtro com resultados, vai no primeiro resultado
      if (filteredSuggestions.length > 0) {
        goTo(filteredSuggestions[0].href);
        return;
      }
      // 3) Fallback para página de busca com query (ajuste a rota se quiser)
      router.push(`/buscar?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleShortcutClick = (shortcut: { label: string; href: string }) => {
    setSearchTerm(shortcut.label);
    goTo(shortcut.href);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-[100] bg-white">
        <nav className="w-full border-b border-gray-300 bg-white">
          <div className="max-w-6xl mx-auto w-full">
            <div className="px-4 py-4 flex justify-between items-center">
              <Link href="/">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  className="h-8"
                  width={190}
                  height={50}
                />
              </Link>
              <Link href="/login" className="text-gray-700">
                Entrar
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="w-full">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex justify-center items-center flex-col h-[500px]">
            {/* Hero Headline */}
            <div className="w-fit pt-14 pb-8 h-fit flex justify-center items-center">
              <h1 className="text-black text-center w-[60%] text-[55px] font-semibold leading-tight max-[480px]:w-full max-[480px]:text-4xl max-[480px]:px-4">
                Encontre o profissional certo em Criciúma
              </h1>
            </div>

            {/* Search Container Wrapper */}
            <div className="px-3 relative w-full max-w-2xl">
              {/* Search Container */}
              <div
                ref={searchContainerRef}
                className="flex items-center py-2.5 px-4 border border-[#D7D7D7] rounded-full shadow-[0px_4px_32px_0px_rgba(32,51,86,0.12)] bg-white w-full focus-within:border-black transition-colors duration-200"
              >
                <input
                  type="text"
                  placeholder="O que você precisa?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={handleInputFocus}
                  onKeyDown={handleKeyDown}
                  className="w-full h-[50px] pl-4 border-none outline-none text-base text-black"
                  aria-autocomplete="list"
                  aria-expanded={showSuggestions}
                  aria-controls="suggestion-listbox"
                />
                <button
                  onClick={() => {
                    // comportamento igual ao Enter
                    const exact = SUGGESTIONS.find(
                      (s) =>
                        s.label.toLowerCase() ===
                        searchTerm.toLowerCase().trim()
                    );
                    if (exact) return goTo(exact.href);
                    if (filteredSuggestions.length > 0)
                      return goTo(filteredSuggestions[0].href);
                    router.push(
                      `/buscar?q=${encodeURIComponent(searchTerm.trim())}`
                    );
                  }}
                  className="flex w-[50px] h-[50px] rounded-full items-center justify-center aspect-square"
                  aria-label="Buscar"
                >
                  <Image
                    src="/search-icon.svg"
                    alt="Search"
                    width={32}
                    height={32}
                  />
                </button>
              </div>

              {/* Suggestion Box */}
              {showSuggestions && (
                <div className="overflow-hidden rounded-[18px] mt-3 border border-gray-400 bg-white shadow-[0px_4px_32px_0px_rgba(32,51,86,0.12)] absolute left-4 right-4">
                  <ul
                    id="suggestion-listbox"
                    role="listbox"
                    aria-label="Sugestões"
                  >
                    {filteredSuggestions.map((suggestion, index) => (
                      <li
                        key={suggestion.label + index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="p-[18px] hover:bg-gray-100 cursor-pointer text-black"
                        role="option"
                        aria-selected={false}
                      >
                        {suggestion.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Shortcut Links */}
              <div className="flex flex-col gap-3 w-full pt-8">
                <span className="text-gray-700">Mais buscados</span>
                <div className="flex flex-wrap gap-3">
                  {SHORTCUTS.map((s, i) => (
                    <Link
                      key={s.label + i}
                      href={s.href}
                      prefetch
                      // onClick={() => setSearchTerm(s.label)}
                      className="cursor-pointer rounded-[50px] border border-[#D3D3D3] text-base text-[#545860] py-2.5 px-4 bg-transparent hover:bg-[#FF4C44] hover:text-white hover:border-[#FF4C44] transition-colors duration-200"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Test />
    </div>
  );
};

export default HomePage;
