import React from 'react';
import SectionHeader from "@/app/components/SectionHeader";

const SignUp: React.FC = () => {
    return (
        <section className="bg-red-900 bg-fixed h-[480px] section bg-cover mx-auto max-w-5xl bg-center bg-no-repeat" id="contact">
            <div className="container mx-auto h-full">
                <div>
                    <SectionHeader pretitle="Міу Міу Міу я тебе по IP знайду" title="Пишіть якщо ви котик"/>
                    <div className="relative flex items-center w-full max-w-xl">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Email address"
                                className="w-full h-[64px] outline-none rounded-full bg-[#4d0919] backdrop-blur-[15px] px-8 pr-[120px]"
                            />
                            <button
                                type="submit"
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-red-800 h-[64px] w-[120px] rounded-full text-[15px] hover:bg-red-700 transition-all"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;