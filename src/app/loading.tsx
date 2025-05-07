"use client";
export default function GlobalLoading() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      <div
        className="h-0.5 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-400 rounded-full shadow-md animate-[gradient-x_1.2s_ease-in-out_infinite]"
        style={{
          backgroundSize: "200% 100%",
          backgroundPosition: "0% 50%",
        }}
      />
      <style jsx global>{`
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
} 