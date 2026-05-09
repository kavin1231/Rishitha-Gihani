import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaMusic, FaPause } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

export default function WeddingPage() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
    setTimeout(() => setLoaded(true), 1200);
  }, []);

  // 🎵 MUSIC CONTROL
  // 🎵 MUSIC CONTROL
  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  // 🎵 auto unlock on first click
  useEffect(() => {
    const unlock = () => {
      audioRef.current
        ?.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    };

    window.addEventListener("click", unlock, { once: true });
  }, []);

  // ✨ floating particles
  const particles = Array.from({ length: 25 });

  // 🌟 floating lights
  const lights = Array.from({ length: 8 });

  if (showIntro) {
    return (
      <div className="fixed inset-0 z-[100] bg-black">
        <video
          autoPlay
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          onEnded={() => setShowIntro(false)}
          onError={() => setShowIntro(false)}
        >
          <source
            src="https://res.cloudinary.com/dagiis3pz/video/upload/v1778311043/wedding-site/counting.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    );
  }

  if (!opened) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
        {/* ✨ GOLD GLOW */}
        <div className="absolute w-[500px] h-[500px] bg-yellow-400/10 blur-[120px] rounded-full"></div>

        {/* 🌌 BACKGROUND PARTICLES */}
        <div className="absolute inset-0">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-40 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${2 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* 💌 INVITATION CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="
          relative
          z-10
          w-[90%]
          max-w-2xl
          rounded-[40px]
          border
          border-yellow-400/30
          bg-white/[0.03]
          backdrop-blur-2xl
          shadow-[0_0_80px_rgba(255,215,0,0.15)]
          overflow-hidden
          "
        >
          {/* TOP GOLD LINE */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

          <div className="p-14 text-center">
            <p className="tracking-[8px] uppercase text-yellow-300 text-xs mb-6">
              Wedding Invitation
            </p>

            <h1 className="text-5xl md:text-7xl text-white font-light leading-tight">
              Chamath <span className="text-yellow-400">&</span> Dulyana
            </h1>

            <div className="w-32 h-[1px] bg-yellow-400 mx-auto my-8"></div>

            <p className="text-gray-300 leading-8 max-w-xl mx-auto">
              Together with their families, invite you to celebrate a beautiful
              journey of love, joy, and forever memories.
            </p>

            {/* ✨ OPEN BUTTON */}
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(255,215,0,0.4)",
              }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setOpened(true);

                setTimeout(() => {
                  audioRef.current?.play();
                  setPlaying(true);
                }, 500);
              }}
              className="
              mt-12
              px-10
              py-5
              rounded-full
              border
              border-yellow-400
              text-yellow-300
              uppercase
              tracking-[5px]
              text-sm
              hover:bg-yellow-400
              hover:text-black
              transition-all
              duration-700
              "
            >
              Open Invitation ✨
            </motion.button>
          </div>

          {/* BOTTOM GOLD LINE */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white font-serif overflow-x-hidden">
      {/* 🎶 AUDIO */}
      <audio ref={audioRef} loop>
        <source
          src="https://res.cloudinary.com/dagiis3pz/video/upload/v1778311076/wedding-site/music.mp3"
          type="audio/mp3"
        />
      </audio>

      {/* 🎧 MUSIC BUTTON */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 bg-yellow-400 text-black p-4 rounded-full shadow-2xl hover:scale-110 transition"
      >
        {playing ? <FaPause /> : <FaMusic />}
      </button>

      {/* ✨ FLOATING GOLD PARTICLES */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-40 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* 🌟 FLOATING LIGHT EFFECT */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {lights.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
            }}
            className="absolute w-72 h-72 bg-yellow-400/5 blur-3xl rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* 🔥 HERO (AGENCY STYLE) */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        {/* VIDEO */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source
            src="https://res.cloudinary.com/dagiis3pz/video/upload/v1778312438/wedding-site/hero.mp4"
            type="video/mp4"
          />
        </video>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/50" />

        {/* GOLD GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />

        {/* HERO CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="relative z-10 text-center px-6"
        >
          <p className="tracking-[10px] text-yellow-300 uppercase text-sm mb-4">
            Wedding Invitation
          </p>

          <h1 className="text-6xl md:text-8xl font-light text-white leading-tight">
            Chamath <span className="text-yellow-400">&</span> Dulyana
          </h1>

          <div className="w-32 h-[1px] bg-yellow-400 mx-auto my-8"></div>

          <p className="text-gray-300 max-w-xl mx-auto text-lg leading-8">
            Together with their families, invite you to celebrate a day filled
            with love, joy, and forever memories.
          </p>

          <button
            onClick={() =>
              document.getElementById("story").scrollIntoView({
                behavior: "smooth",
              })
            }
            className="mt-10 border border-yellow-400 px-8 py-4 tracking-[4px] uppercase text-sm hover:bg-yellow-400 hover:text-black transition duration-500"
          >
            Explore Experience
          </button>
        </motion.div>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-yellow-400"
        >
          ↓
        </motion.div>
      </section>

      {/* CONTENT SECTIONS - G5 BACKGROUND */}
      <div
        className="relative"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dagiis3pz/image/upload/f_auto,q_auto,w_1280/v1778311050/wedding-site/g5.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black"></div>

        <div className="relative z-10">
          {/* 💌 STORY */}
          <section id="story" className="py-24 text-center" data-aos="fade-up">
            <h2 className="text-5xl text-yellow-400 mb-6">Our Story</h2>
            <p className="max-w-2xl mx-auto text-gray-400 leading-8">
              A journey that turned two hearts into one forever ✨
            </p>
          </section>

          {/* 📅 EVENTS (AGENCY CARDS) */}
          <section className="py-24 px-6">
            <h2 className="text-5xl text-yellow-400 text-center mb-14">
              Wedding Events
            </h2>

            <div className="grid md:grid-cols-3 gap-10">
              {["Engagement", "Wedding", "Reception"].map((e, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.06 }}
                  className="
group
bg-white/[0.03]
backdrop-blur-2xl
border border-yellow-400/20
p-10
rounded-[30px]
text-center
shadow-[0_0_40px_rgba(255,215,0,0.08)]
hover:shadow-[0_0_60px_rgba(255,215,0,0.2)]
hover:-translate-y-3
transition-all
duration-700
"
                  data-aos="zoom-in"
                >
                  <h3 className="text-2xl text-yellow-300 mb-3">{e}</h3>
                  <p className="text-gray-300">Dec 20, 2026</p>
                  <p className="text-gray-500">10:00 AM</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 🖼️ GALLERY (LUXURY GRID) */}
          <section className="py-24 text-center">
            <h2 className="text-5xl text-yellow-400 mb-12">Moments</h2>

            <div className="px-6">
              <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 4, 3].map((img) => (
                  <motion.img
                    key={img}
                    whileHover={{ scale: 1.05 }}
                    src={`https://res.cloudinary.com/dagiis3pz/image/upload/f_auto,q_auto,w_800/v1778311046/wedding-site/g${img}.jpg`}
                    loading="lazy"
                    className="
w-full
rounded-[30px]
h-[420px]
object-cover
shadow-[0_0_50px_rgba(0,0,0,0.5)]
hover:scale-[1.03]
hover:rotate-[1deg]
transition-all
duration-700
"
                    data-aos="fade-up"
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* CONTENT SECTIONS - G6 BACKGROUND */}
      <div
        className="relative"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dagiis3pz/image/upload/f_auto,q_auto,w_1280/v1778311051/wedding-site/g6.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black"></div>

        <div className="relative z-10">
          {/* 🎥 VIDEO */}
          <section className="py-24 text-center">
            <h2 className="text-5xl text-yellow-400 mb-10">Our Moments</h2>

            <video
              controls
              className="w-full max-w-5xl mx-auto rounded-2xl shadow-2xl"
            >
              <source
                src="https://res.cloudinary.com/dagiis3pz/video/upload/v1778311077/wedding-site/video.mp4"
                type="video/mp4"
              />
            </video>
          </section>

          {/* 🧭 LOCATION */}
          <section className="py-24 text-center">
            <h2 className="text-5xl text-yellow-400 mb-10">Location</h2>

            <iframe
              className="w-full h-[400px]"
              src="https://www.google.com/maps?q=Hotel+Green+Court&z=17&output=embed"
              title="Hotel Green Court location"
            />

            <a
              href="https://maps.app.goo.gl/gXEDApzEuzMtrDZ57"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block text-yellow-400 underline underline-offset-4"
            >
              Open in Google Maps
            </a>
          </section>

          {/* 📝 RSVP */}
          <section className="py-28 px-6 text-center relative overflow-hidden">
            {/* ✨ BACKGROUND LIGHT */}
            <div className="absolute inset-0 bg-yellow-400/5 blur-3xl"></div>

            {/* 🌟 GOLD ORBS */}
            <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-52 h-52 bg-yellow-400/10 rounded-full blur-3xl"></div>

            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              {/* SMALL TEXT */}
              <p className="tracking-[8px] uppercase text-yellow-300 text-sm mb-5">
                Join Our Celebration
              </p>

              {/* HEADING */}
              <h2 className="text-5xl md:text-7xl text-yellow-400 mb-8 leading-tight">
                RSVP
              </h2>

              {/* DESCRIPTION */}
              <p className="max-w-2xl mx-auto text-gray-300 leading-8 text-lg mb-12">
                Your presence will make our special day even more meaningful.
                Kindly confirm your attendance through the form below.
              </p>

              {/* PREMIUM BUTTON */}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSd5SC31tZzlzRKC7bJ6_8TX7mTOZU26mXNrd7l4cpNc0Q8F-Q/viewform?usp=publish-editor"
                target="_blank"
                rel="noreferrer"
                className="
                inline-flex
                items-center
                gap-4
                px-12
                py-5
                rounded-full
                border
                border-yellow-400
                text-yellow-300
                uppercase
                tracking-[4px]
                text-sm
                bg-white/[0.03]
                backdrop-blur-xl
                hover:bg-yellow-400
                hover:text-black
                hover:scale-105
                hover:shadow-[0_0_50px_rgba(255,215,0,0.4)]
                transition-all
                duration-700
                "
              >
                Reserve Your Seat ✨
              </a>

              <p className="mt-6 text-gray-500 italic">
                RSVP before December 10, 2026
              </p>
            </motion.div>
          </section>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="py-8 text-center border-t border-yellow-400/20">
        <p className="text-gray-500 tracking-widest">
          Crafted by Invitations.lk ✨
        </p>
      </footer>
    </div>
  );
}
