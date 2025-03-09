import React from 'react';
import EventBox from "@/app/components/events/EventBox";
import SectionHeader from "@/app/components/SectionHeader";

const Events = () => {
    return (
        <section className='section' id="fromZero">
            <div className="container mx-auto">
                <SectionHeader pretitle="New Album" title="From Zero"/>
                <EventBox/>
            </div>
        </section>
    );
};

export default Events;