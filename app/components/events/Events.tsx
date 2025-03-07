import React from 'react';
import SectionHeader from "@/app/components/SectionHeader";
import EventBox from "@/app/components/events/EventBox";

const Events = () => {
    return (
        <section className='section' id="about">
            <div className="container mx-auto">
                <SectionHeader pretitle="Content" title="Upcoming events"/>
                <EventBox />
            </div>
        </section>
    );
};

export default Events;