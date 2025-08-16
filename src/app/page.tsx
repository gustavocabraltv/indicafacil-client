'use client';

import React, { useState, useRef, useEffect } from 'react';

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "Pintor",
    "Pedreiro", 
    "Marido de Aluguel",
    "Encanador",
    "Truck Assisted Help Moving",
    "Help Moving",
    "Cleaning",
    "Door, Cabinet, & Furniture Repair"
  ];

  const shortcutButtons = [
    "Pintor",
    "Pedreiro", 
    "Encanador",
    "Diarista",
    "Marido de aluguel"
  ];

  // Filter suggestions based on search term
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = suggestions.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredSuggestions(suggestions);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleInputFocus = () => {
    setFilteredSuggestions(suggestions);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      (e.target as HTMLInputElement).blur();
    }
  };

  const handleShortcutClick = (shortcut: string) => {
    setSearchTerm(shortcut);
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-[100] bg-white">
        <nav className="w-full border-b border-gray-300 bg-white">
          <div className="max-w-6xl mx-auto w-full">
            <div className="px-4 py-4 flex justify-between items-center">
              <img src="/logo.svg" alt="Logo" className="h-8" />
              <span className="text-gray-700">Entrar</span>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="w-full">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex justify-center items-center flex-col h-[600px]">
            
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
                />
                <button className="flex  w-[50px] h-[50px] rounded-full items-center justify-center aspect-square">
                  🔍
                </button>
              </div>

              {/* Suggestion Box */}
              {showSuggestions && (
                <div className="overflow-hidden rounded-[18px] mt-3 border border-gray-400 bg-white shadow-[0px_4px_32px_0px_rgba(32,51,86,0.12)] absolute left-4 right-4">
                  <ul>
                    {filteredSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="p-[18px] hover:bg-gray-100 cursor-pointer text-black"
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Shortcut Links */}
              <div className="flex flex-col gap-3 w-full pt-8">
                <span className="text-gray-700">Mais buscados</span>
                <div className="flex flex-wrap gap-3">
                  {shortcutButtons.map((shortcut, index) => (
                    <button
                      key={index}
                      onClick={() => handleShortcutClick(shortcut)}
                      className="rounded-[50px] border border-[#D3D3D3] text-base text-[#545860] py-2.5 px-4 bg-transparent hover:bg-[#0e7A60] hover:text-white hover:border-[#0e7A60] transition-colors duration-200"
                    >
                      {shortcut}
                    </button>
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;