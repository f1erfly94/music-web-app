import React from 'react';
import SectionHeader from "@/app/components/SectionHeader";


const SignUp: React.FC = () => {
    return (
        <section
            className="relative min-h-[600px] py-24 bg-[url('/assets/photo/group_photo.png')] bg-cover bg-center bg-no-repeat sm:min-h-[700px]"
            id="contact"
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10">
                <div className="container relative z-10 mx-auto flex h-full items-center justify-center px-4 sm:px-6">
                    <div className="w-full max-w-2xl">
                        <SectionHeader pretitle="" title="Subscribe for news" />
                        <div
                            className="relative mx-auto mt-6 flex w-full max-w-md flex-col items-stretch gap-3 sm:w-4/5 sm:max-w-none sm:flex-row sm:items-center sm:gap-0"
                        >
                            <input
                                type="email"
                                placeholder="Email address"
                                className="h-14 w-full rounded-full border border-white/30 bg-white/20 px-6 text-white outline-none backdrop-blur-lg placeholder-white/80 focus:border-white/60 sm:h-[72px] sm:pr-[140px] sm:px-8"
                            />
                            <button
                                type="submit"
                                className="h-14 w-full shrink-0 rounded-full bg-red-800 text-[16px] text-white transition-all hover:bg-red-700 sm:absolute sm:right-0 sm:top-1/2 sm:h-[72px] sm:w-[140px] sm:-translate-y-1/2"
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