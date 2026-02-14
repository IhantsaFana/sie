import React, { useState } from 'react';
import { generateValentinePoem } from '../services/gemini';
import { Sparkles, Loader2, PenTool } from 'lucide-react';

export const PoemGenerator: React.FC = () => {
    const [poem, setPoem] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        const generatedPoem = await generateValentinePoem();
        setPoem(generatedPoem);
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center w-full">
            {!poem && !loading && (
                <button
                    onClick={handleGenerate}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-valentine-400 to-valentine-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:from-valentine-500 hover:to-valentine-700 hover:-translate-y-1 transition-all duration-300 font-bold text-lg"
                >
                    <Sparkles className="w-5 h-5" />
                    Un ptit poème pour toi
                </button>
            )}

            {loading && (
                <div className="flex flex-col items-center gap-3 text-valentine-600 font-medium">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <span className="animate-pulse">Cupidon prépare ses rimes...</span>
                </div>
            )}

            {poem && (
                <div className="relative p-6 md:p-8 bg-[#fff9f0] rounded-xl shadow-md w-full mx-auto transform transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-4 rotate-1 border border-[#e8dfd0]">
                    {/* Paper texture effect */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] rounded-xl"></div>

                    <Sparkles className="absolute -top-4 -right-4 w-10 h-10 text-yellow-400 fill-yellow-400 animate-pulse z-10" />

                    <div className="relative z-10">
                        <p className="whitespace-pre-wrap text-lg font-sans italic font-medium text-valentine-900 leading-relaxed text-center">
                            "{poem}"
                        </p>
                    </div>

                    <div className="mt-6 flex justify-center relative z-10">
                        <button
                            onClick={handleGenerate}
                            className="flex items-center gap-1 text-sm text-valentine-400 hover:text-valentine-600 transition-colors"
                        >
                            <PenTool className="w-3 h-3" />
                            Un autre ?
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
