import { useState } from 'react';
// @ts-ignore
import confetti from 'canvas-confetti';
import { Heart, Stars } from 'lucide-react';
import { EvasiveButton } from './components/EvasiveButton';
import { PoemGenerator } from './components/PoemGenerator';

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);

  const handleYes = () => {
    setIsTransitioning(true);
    triggerConfetti();

    // Wait for animation to finish before showing the card
    setTimeout(() => {
      setAccepted(true);
      setIsTransitioning(false);
    }, 800);
  };

  const handleNoInteraction = () => {
    setNoCount((prev) => prev + 1);
    setYesScale((prev) => prev + 0.3); // Le bouton Oui grandit à chaque refus
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#e11d48', '#fda4af', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#e11d48', '#fda4af', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const getQuestionText = () => {
    const phrases = [
      "Veux-tu être ma Valentine ?",
      "Tu es sûre ?",
      "Vraiment sûre ?",
      "Pense aux chocolats !",
      "Ne me brise pas le cœur !",
      "Je vais pleurer...",
      "Tu es cruelle !",
      "Dernière chance !",
      "Allez, s'il te plaît ?",
      "Je ne lâcherai pas l'affaire !",
      "Regarde comme le bouton Oui est beau !",
      "Tu n'as plus le choix haha"
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  // Background animated blobs
  const BackgroundBlobs = () => (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
    </div>
  );

  if (accepted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10 animate-in fade-in duration-700">
        <BackgroundBlobs />

        <div className="bg-white/40 backdrop-blur-xl p-6 md:p-10 rounded-3xl shadow-2xl border border-white/50 max-w-lg w-full text-center animate-float relative z-20">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <Heart className="w-20 h-20 text-valentine-500 fill-valentine-500 animate-pulse-fast drop-shadow-lg" />
              <Stars className="absolute -top-4 -right-4 w-8 h-8 text-yellow-400 animate-bounce" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-script font-bold mb-4 text-valentine-600 drop-shadow-sm">
            Ouiiii ! Je le savais !
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 font-medium">
            C'est le début d'une magnifique journée. ❤️
          </p>

          <PoemGenerator />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative selection:bg-valentine-200">
      <BackgroundBlobs />

      <div className={`z-20 text-center w-full max-w-4xl flex flex-col items-center transition-all duration-500 ${isTransitioning ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        {/* Decorative Image */}
        <div className="mb-8 relative group cursor-pointer">
          <div className="absolute inset-0 bg-valentine-400 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform opacity-20"></div>
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmM2ZDJ5b2FhZ3RnbW51bWg0bmM2ZDJ5b2FhZ3RnbW51bWg0biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/cLS1cfxvGOPVpf9g3y/giphy.gif"
            alt="Cute bear love"
            className="relative rounded-2xl shadow-xl border-4 border-white/80 object-cover h-48 w-48 md:h-60 md:w-60 transform transition-transform duration-500 hover:scale-105"
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-valentine-600 mb-12 drop-shadow-sm transition-all duration-300 leading-tight px-4 min-h-[100px] flex items-center justify-center">
          {getQuestionText()}
        </h1>
      </div>

      {/* Buttons Container */}
      <div className="flex flex-wrap items-center justify-center gap-8 w-full relative h-32 z-30">
        {/* Yes Button - Grows to fill screen on click */}
        <button
          onClick={handleYes}
          style={!isTransitioning ? {
            transform: `scale(${yesScale})`,
            transformOrigin: 'center'
          } : undefined}
          className={`
            bg-gradient-to-r from-valentine-500 to-valentine-600 text-white font-bold shadow-lg 
            transition-all duration-700 ease-in-out flex items-center justify-center gap-3
            ${isTransitioning
              ? 'fixed inset-0 w-[200vw] h-[200vw] rounded-full z-50 !translate-x-0 !translate-y-0 !scale-100'
              : 'px-8 py-4 rounded-full text-2xl shadow-valentine-500/30 hover:shadow-valentine-500/50'
            }
          `}
        >
          {isTransitioning ? (
            <Heart className="w-32 h-32 animate-ping fill-white/50" />
          ) : (
            <>Oui ! <Heart className="fill-white w-6 h-6" /></>
          )}
        </button>

        {/* No Button - Fades out during transition */}
        <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <EvasiveButton onInteract={handleNoInteraction} />
        </div>
      </div>
    </div>
  );
}
