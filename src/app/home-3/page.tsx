'use client';

import { useState } from 'react';
import Search from "@/components/Search";
import SearchFull from "@/components/SearchFull";
import Shortcut from "@/components/TabServices";
import Wrapper from "@/components/Wrapper";
import Image from 'next/image'
import TabServices2 from '@/components/TabServices2';
import Banner from '@/components/Banner';
import BannerPromo from '@/components/BannerPromo';
import Container from '@/components/Container'
import LocationSearch from '@/components/LocationSearch';


export default function Home3() {
    // const [showFullSearch, setShowFullSearch] = useState(false);

    return (
        <div className='bg-[#F3F4F6] flex flex-col gap-4'>

            <Container>
                <LocationSearch />
            </Container>

            <Container>
                <TabServices2 />
            </Container>

            <Container>
                <Banner />
            </Container>


            <div className='bg-white py-4'>
                <BannerPromo />
            </div>

        </div>
    );
}
