'use client';

import { useState } from 'react';
import Wrapper from '@/components/Wrapper';
import Image from 'next/image';
import Search from '@/components/Search';
import SearchFull from '@/components/SearchFull';

export default function LocationSearch() {
  const [showFullSearch, setShowFullSearch] = useState(false);

  return (
    <div className="bg-white">
      <Wrapper className="py-4 w-full">
        <div className="flex gap-2 text-black font-semibold underline decoration-dotted decoration-gray-400 underline-offset-6">
          <Image src="/location.svg" alt="location" width={20} height={20} />
          <span>Criciúma, Santa Catarina</span>
        </div>

        {showFullSearch ? (
          <SearchFull onClose={() => setShowFullSearch(false)} />
        ) : (
          <Search variant="alt" onOpen={() => setShowFullSearch(true)} />
        )}
      </Wrapper>
    </div>
  );
}
