import React from 'react';
import { Search, Star, Users, CheckCircle } from 'lucide-react';

const steps = [
    {
        icon: Search,
        title: 'Explore',
        description:
            'Discover top 10 verified travel agencies, hotels, DMCs, and influencers tailored to your destination.'
    },
    {
        icon: Star,
        title: 'Evaluate',
        description:
            'Compare profiles, view certifications, and check curated ratings before making a decision.'
    },
    {
        icon: Users,
        title: 'Engage',
        description:
            'Connect directly with professionals or claim your business listing for official recognition.'
    },
    {
        icon: CheckCircle,
        title: 'Get Certified',
        description:
            'Apply for TravelTop10 certification to boost visibility and earn traveler trust.'
    }
];

const HowWeWorkSection = () => (

    <section className="py-16 bg-white" id="how-we-work"> <div className="container mx-auto px-4"> <div className="text-center mb-12"> <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">How We Work</h2> <p className="text-lg text-muted-foreground max-w-2xl mx-auto"> Whether you're a traveler or a travel business, our process helps you discover, connect, and grow with confidence. </p> </div> <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto"> {steps.map((step, idx) => { const Icon = step.icon; return (<div key={idx} className="flex flex-col items-center text-center p-6 bg-[#EF4B4B]/10 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"> <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#EF4B4B]/20 mb-4"> <Icon className="h-8 w-8 text-[#EF4B4B]" /> </div> <h3 className="text-xl font-bold mb-2 text-[#0F0F0F]">{step.title}</h3> <p className="text-muted-foreground">{step.description}</p> </div>); })} </div> </div> </section>);
export default HowWeWorkSection;