import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import { ArrowRightIcon, SparklesIcon } from "lucide-react";

function HomePage() {
  return (
    <div className="flex h-screen text-base bg-base-100">
      {/* LEFT SIDE */}
      <div className="relative flex flex-col flex-1 p-8 overflow-hidden lg:p-12">
        {/* NAVBAR */}
        <nav className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center shadow-lg size-9 rounded-xl bg-linear-to-br from bg-amber-400 to-orange-500 shadow-gray-500/20 ">
              <SparklesIcon className="size-5 text-primary-content" />
            </div>
            <span className="text-xl font-bold">Whisper</span>
          </div>

          <div className="flex items-center gap-2">
            <SignInButton mode="modal">
              <button className="px-5 py-2.5 text-sm font-medium text-base-content/50 hover:text-base-content transition">
                Sign in
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button className="gap-2 text-sm font-semibold border-none rounded-full shadow-lg btn bg-linear-to-r from-amber-500 to-orange-500 hover:opacity-90 shadow-orange-500/25">
                Get Started
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </SignUpButton>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <div className="relative z-10 flex flex-col justify-center flex-1 max-w-xl">
          {/* Tag */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-wider uppercase border rounded-full bg-amber-500/10 border-amber-500/20 text-amber-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Now Available
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight font-mono">
            Messaging for
            <br />
            <span className="text-transparent bg-linear-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text">
              everyone
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-md mt-6 text-lg leading-relaxed text-base-content/70">
            Secure, blazing-fast conversations with real-time presence and
            instant delivery. Connect with anyone, anywhere.
          </p>

          {/* CTA BTNS */}
          <div className="flex items-center gap-4 mt-10">
            <SignUpButton mode="modal">
              <button className="flex items-center gap-3 px-8 py-4 font-semibold transition group bg-base-100 text-base-content rounded-2xl hover:bg-base-200">
                Start chatting
                <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </SignUpButton>

            <SignInButton mode="modal">
              <button className="px-8 py-4 font-semibold transition text-base-content/60 hover:text-base-content">
                I have an account
              </button>
            </SignInButton>
          </div>

          {/* Avatars */}
          <div className="flex items-center gap-4 mt-8">
            <div className="-space-x-3 avatar-group">
              <div className="avatar">
                <div className="w-10 border-2 rounded-full border-base-100">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                    alt="User avatar"
                  />
                </div>
              </div>
              <div className="avatar">
                <div className="w-10 border-2 rounded-full border-base-100">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                    alt="User avatar"
                  />
                </div>
              </div>
              <div className="avatar">
                <div className="w-10 border-2 rounded-full border-base-100">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                    alt="User avatar"
                  />
                </div>
              </div>
              <div className="avatar">
                <div className="w-10 border-2 rounded-full border-base-100">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
                    alt="User avatar"
                  />
                </div>
              </div>
              <div className="avatar avatar-placeholder">
                <div className="w-10 border-2 rounded-full border-base-100 bg-base-300 text-base-content">
                  <span className="font-mono text-xs">+5k</span>
                </div>
              </div>
            </div>
            <span className="text-sm text-base-content/70">
              Join{" "}
              <span className="font-mono text-base-content/80">10,000+</span>{" "}
              happy users
            </span>
          </div>

          {/* STATS */}
          <div className="flex items-center gap-10 mt-12">
            <div>
              <div className="font-mono text-2xl font-bold">10K+</div>
              <div className="mt-1 text-xs tracking-wider uppercase text-base-content/60">
                Users
              </div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <div className="font-mono text-2xl font-bold">99.9%</div>
              <div className="mt-1 text-xs tracking-wider uppercase text-base-content/60">
                Uptime
              </div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <div className="font-mono text-2xl font-bold">&lt;50ms</div>
              <div className="mt-1 text-xs tracking-wider uppercase text-base-content/60">
                Latency
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative items-center justify-center flex-1 hidden overflow-hidden lg:flex bg-base-200">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Radial Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]
           bg-linear-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-[100px]"
        />

        {/* Image Container */}
        <div className="relative z-10">
          {/* Decorative border */}
          <div className="absolute p-px -inset-px rounded-3xl bg-linear-to-b from-white/20 to-white/5">
            <div className="w-full h-full rounded-3xl bg-base-200" />
          </div>

          {/* Card */}
          <div className="relative p-6 border shadow-2xl rounded-3xl border-base-300 bg-base-200/80 backdrop-blur-xl">
            <img
              src="/auth.png"
              alt="Chat illustration"
              className="w-80 xl:w-96 rounded-2xl"
            />

            {/* Floating elements */}
            <div className="absolute px-4 py-2 text-sm font-medium border rounded-full -top-4 -right-4 bg-emerald-500/20 border-emerald-500/30 text-emerald-400 backdrop-blur-sm">
              ● 3 online
            </div>

            <div className="absolute -bottom-4 -left-4 px-4 py-2.5 bg-base-300/40 border border-base-300 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-linear-to-br from-amber-400 to-orange-500" />
                  <div className="w-6 h-6 rounded-full bg-linear-to-br from-rose-400 to-pink-500" />
                </div>
                <span className="text-sm text-base-content/80">typing...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
