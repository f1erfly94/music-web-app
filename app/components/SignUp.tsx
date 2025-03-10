import React from 'react';
import SectionHeader from "@/app/components/SectionHeader";


const SignUp: React.FC = () => {
    return (
        <section
            className="relative h-[480px] bg-[url('/assets/photo/group_photo.png')] bg-cover bg-center bg-no-repeat"
            id="contact"
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
                <div className="container relative z-10 mx-auto h-full flex justify-center items-center">
                    <div className="w-full max-w-2xl">
                        <SectionHeader pretitle="" title="Subscribe for news" />
                        <div
                            className="relative flex items-center w-4/5 mx-auto mt-6"
                        >
                            <input
                                type="text"
                                placeholder="Email address"
                                className="w-full h-[72px] outline-none rounded-full bg-white/20 backdrop-blur-lg text-white placeholder-white px-8 pr-[140px] border border-white/30"
                            />
                            <button
                                type="submit"
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-red-800 h-[72px] w-[140px] rounded-full text-[16px] hover:bg-red-700 transition-all text-white"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;