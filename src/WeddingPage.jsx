import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FaMusic, FaPause } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { config } from "./config";

export default function WeddingPage() {
  const audioRef = useRef(null);
  const introRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [opened, setOpened] = useState(false);
  const [musicMuted, setMusicMuted] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
    const timer = setTimeout(() => setLoaded(true), 1200);

    return () => clearTimeout(timer);
  }, []);

  // 🎵 MUSIC CONTROL - Optimized with useCallback
  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  }, [playing]);

  useEffect(() => {
    if (showIntro) {
      introRef.current?.play().catch(() => {});
    }
  }, [showIntro]);

  useEffect(() => {
    if (!opened || showIntro || !audioRef.current) return;

    audioRef.current.muted = false;
    audioRef.current
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [opened, showIntro]);

  const particles = useMemo(
    () =>
      Array.from({ length: 25 }, () => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        duration: `${2 + Math.random() * 4}s`,
      })),
    []
  );

  const lights = useMemo(
    () =>
      Array.from({ length: 8 }, () => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        duration: `${4 + Math.random() * 4}s`,
      })),
    []
  );

  if (showIntro) {
    return (
      <>
        <audio ref={audioRef} loop autoPlay muted={musicMuted} preload="auto">
          <source src={config.media.backgroundMusic} type="audio/mp3" />
        </audio>

        <div className="fixed inset-0 z-[100] bg-black">
          <video
            ref={introRef}
            autoPlay
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            onEnded={() => {
              setMusicMuted(false);
              setShowIntro(false);
            }}
            onError={() => {
              setMusicMuted(false);
              setShowIntro(false);
            }}
          >
            <source src={config.media.introVideo} type="video/mp4" />
          </video>
        </div>
      </>
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
          className="relative z-10 w-[90%] max-w-2xl rounded-[40px] border border-yellow-400/30 bg-white/[0.03] backdrop-blur-2xl shadow-[0_0_80px_rgba(255,215,0,0.15)] overflow-hidden"
        >
          {/* TOP GOLD LINE */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

          <div className="p-14 text-center">
            <p className="tracking-[8px] uppercase text-yellow-300 text-xs mb-6">
              Wedding Invitation
            </p>

            <h1 className="text-5xl md:text-7xl text-white font-light leading-tight">
              Rishitha <span className="text-yellow-400">&</span> Gihani
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
                setPlaying(false);
                setMusicMuted(true);
                setShowIntro(true);
              }}
              className="mt-12 px-10 py-5 rounded-full border border-yellow-400 text-yellow-300 uppercase tracking-[5px] text-sm hover:bg-yellow-400 hover:text-black transition-all duration-700"
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
      <audio ref={audioRef} loop muted={musicMuted} preload="auto">
        <source src={config.media.backgroundMusic} type="audio/mp3" />
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
              top: particles[i].top,
              left: particles[i].left,
              animationDuration: particles[i].duration,
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
              top: lights[i].top,
              left: lights[i].left,
            }}
          />
        ))}
      </div>

      {/* 🔥 HERO (AGENCY STYLE) */}
      <section className="h-[110vh] relative flex items-center justify-center overflow-hidden">
        {/* VIDEO */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={config.media.heroVideo} type="video/mp4" />
        </video>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/20" />

        {/* GOLD GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

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
            Rishitha <span className="text-yellow-400">&</span> Gihani
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

      {/* CONTENT SECTIONS - BACK1 BACKGROUND */}
      <div
        className="relative min-h-screen mt-8"
        style={{
          backgroundImage: `url('${config.media.backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10">
          {/* 💌 STORY */}
          <section
            id="story"
            className="min-h-screen flex items-center justify-center px-6 py-24 text-center"
            data-aos="fade-up"
          >
            <div className="bg-black/30 backdrop-blur-sm p-12 rounded-3xl">
              <h2 className="text-5xl text-yellow-400 mb-6">Our Story</h2>
              <p className="max-w-2xl mx-auto text-gray-300 leading-8">
                Two hearts from different journeys found each other through
                love, laughter, and countless beautiful memories. What began as
                a simple connection slowly grew into a forever kind of love.
                Together, they now begin a new chapter filled with happiness,
                dreams, and endless togetherness. Join us as we celebrate the
                beginning of their beautiful forever story. 💍✨
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* CONTENT SECTIONS - G6 BACKGROUND */}
      <div
        className="relative"
        style={{
          backgroundImage: `url('${config.media.backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black"></div>

        <div className="relative z-10">
          {/* 🖼️ GALLERY (LUXURY GRID) */}
          <section className="py-24 text-center">
            <h2 className="text-5xl text-yellow-400 mb-12">Moments</h2>

            <div className="px-6">
              <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((img) => (
                  <motion.img
                    key={img}
                    whileHover={{ scale: 1.05 }}
                    src={config.media[`gallery${img}`]}
                    loading="lazy"
                    alt={`Gallery image ${img}`}
                    className="w-full rounded-[30px] h-[420px] object-cover shadow-[0_0_50px_rgba(0,0,0,0.5)] hover:scale-[1.03] hover:rotate-[1deg] transition-all duration-700"
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

            <div className="px-6">
              <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6">
                <video
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-[850px] rounded-2xl shadow-2xl object-cover"
                >
                  <source src={config.media.momentsVideo1} type="video/mp4" />
                </video>

                <video
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-[850px] rounded-2xl shadow-2xl object-cover"
                >
                  <source src={config.media.momentsVideo2} type="video/mp4" />
                </video>
              </div>
            </div>
          </section>

          {/* 🧭 LOCATION */}
          <section className="py-24 text-center">
            <h2 className="text-5xl text-yellow-400 mb-10">Location</h2>

            <iframe
              className="w-full h-[400px]"
              src="https://www.google.com/maps?q=Tangerine+Beach+Hotel&z=17&output=embed"
              title="Tangerine Beach Hotel location"
              loading="lazy"
            />

            <a
              href={config.googleMapsLocation}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-6 inline-block text-yellow-400 underline underline-offset-4"
            >
              Open in Google Maps
            </a>
          </section>

          {/* � INVITATION DETAILS */}
          <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-black text-center">
            <div
              data-aos="zoom-in"
              className="max-w-3xl border border-yellow-700 p-10 rounded-3xl bg-[#111]"
            >
              <p className="text-yellow-500 tracking-[6px] uppercase text-sm">
                Together With Their Families
              </p>

              <h1 className="text-5xl md:text-7xl text-yellow-400 font-luxury mt-8 leading-tight">
                Gihani <span className="text-white">&</span> Rishitha
              </h1>

              <div className="mt-10 text-gray-300 space-y-3 text-sm md:text-base">
                <p>Mr. Silva & Mrs. (Late) Silva</p>
                <p className="text-yellow-500">Together With</p>
                <p>Mr. & Mrs. Fernando</p>
              </div>

              <p className="mt-10 text-gray-400 tracking-wide">
                Will be honored to have the presence of
              </p>

              <p className="mt-6 text-yellow-400 text-xl">
                To celebrate the wedding of their children
              </p>

              <div className="mt-10 space-y-3">
                <h2 className="text-3xl text-white font-semibold">
                  Thursday, 25th June 2026
                </h2>

                <p className="text-yellow-500">
                  Poruwa Ceremony Begins at 10.00 AM
                </p>
              </div>

              <div className="mt-10">
                <h3 className="text-2xl text-yellow-400">
                  Tangerine Beach Hotel
                </h3>

                <p className="text-gray-400 mt-2">De Abrew Road, Waskaduwa</p>
              </div>

              <div className="mt-12 border-t border-yellow-700 pt-6">
                <p className="text-yellow-500 uppercase tracking-[4px]">
                  RSVP Regrets Only
                </p>

                <p className="mt-4 text-gray-300">Deepal - 0715217746</p>

                <p className="text-gray-300">Saman - 0702808136</p>
              </div>
            </div>
          </section>

          {/* �📝 RSVP */}
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
                href={config.rsvpFormUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-4 px-12 py-5 rounded-full border border-yellow-400 text-yellow-300 uppercase tracking-[4px] text-sm bg-white/[0.03] backdrop-blur-xl hover:bg-yellow-400 hover:text-black hover:scale-105 hover:shadow-[0_0_50px_rgba(255,215,0,0.4)] transition-all duration-700"
              >
                Reserve Your Seat ✨
              </a>
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
