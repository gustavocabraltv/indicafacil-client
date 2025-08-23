'use client';

import { useState } from 'react';
import Search from "@/components/Search";
import SearchFull from "@/components/SearchFull";
import Shortcut from "@/components/TabServices";
import Wrapper from "@/components/Wrapper";
import Image from 'next/image'
import TabServices from '@/components/TabServices';
import Banner from '@/components/Banner';

export default function Home2() {
    const [showFullSearch, setShowFullSearch] = useState(false);

    return (
        <>
            <div>

                <Wrapper className='mt-6'>
                    <div className='flex gap-2 text-black font-semibold underline decoration-dotted decoration-gray-400 underline-offset-6'>
                        <Image src='/location.svg' alt='location' width={20} height={20} />
                        <span>Criciúma, Santa Catarina</span>
                    </div>
                    {showFullSearch ? (
                        <SearchFull onClose={() => setShowFullSearch(false)} />
                    ) : (
                        <Search onOpen={() => setShowFullSearch(true)} />
                    )}
                </Wrapper>
            </div>

            <TabServices />
            <div className='mx-auto max-w-screen-xl px-0 sm:px-6 lg:px-8 py-4'>
                <Banner />
            </div>

        </>
    );
}
