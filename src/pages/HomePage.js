import React from 'react';
import HeroSection from "../components/hero/HeroSection";
import AestheticSection from "../components/aesthetic/AestheticSection";
import Collections from "../components/hero/Collections"

export default function HomePage() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <HeroSection/>
            <Collections/>
            <AestheticSection/>
        </>
    );
}
