"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Linkedin,
  Github,
  Twitter,
  Clock,
  Video,
  Globe,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  UserPlus,
  Calendar as CalendarIcon,
  Send,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/shared/Footer";
import IdeaToApp from "@/components/home/IdeaToApp";
import Image from "next/image";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  startOfWeek,
  endOfWeek,
  startOfToday,
  isBefore,
} from "date-fns";

const GoogleMeetLogo = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2.99609"
      y="5.00391"
      width="14"
      height="14"
      rx="2"
      fill="#00796B"
      fillOpacity="0"
    />
    <path
      d="M14.5 12.0001V7.00012C14.5 5.89555 13.6046 5.00012 12.5 5.00012H4.5C3.39543 5.00012 2.5 5.89555 2.5 7.00012V17.0001C2.5 18.1047 3.39543 19.0001 4.5 19.0001H12.5C13.6046 19.0001 14.5 18.1047 14.5 17.0001V12.0001ZM16.5 14.5001L20.5 18.5001V5.50012L16.5 9.50012V14.5001Z"
      fill="#34A853"
    />
    <path d="M16.5 14.5L20.5 18.5V5.5L16.5 9.5V14.5Z" fill="#00832D" />
    <path
      d="M14.5 12V7C14.5 5.89543 13.6046 5 12.5 5H4.5C3.39543 5 2.5 5.89543 2.5 7V17C2.5 18.1046 3.39543 19 4.5 19H12.5C13.6046 19 14.5 18.1046 14.5 17V12Z"
      fill="#0066DA"
    />
    <path
      d="M14.5 12V7C14.5 5.89543 13.6046 5 12.5 5H4.5C3.39543 5 2.5 5.89543 2.5 7V17C2.5 18.1046 3.39543 19 4.5 19H12.5C13.6046 19 14.5 18.1046 14.5 17V12Z"
      fillOpacity="0.1"
    />
    <path
      d="M14.5 12V7C14.5 5.89543 13.6046 5 12.5 5H4.5C3.39543 5 2.5 5.89543 2.5 7V17C2.5 18.1046 3.39543 19 4.5 19H12.5C13.6046 19 14.5 18.1046 14.5 17V12Z"
      fill="#2684FC"
    />
  </svg>
);

function BookACallContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"calendar" | "message">(() => {
    return searchParams.get("tab") === "message" ? "message" : "calendar";
  });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<"date-time" | "form">(
    "date-time"
  );
  const [use24Hour, setUse24Hour] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [messageData, setMessageData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Calendar Logic
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const timeSlots = [
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ];

  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setBookingStep("form");
  };

  const today = startOfToday();

  // Helper to format time based on 12/24h pref
  const formatTime = (time: string) => {
    if (use24Hour) return time;
    const [h, m] = time.split(":").map(Number);
    const period = h >= 12 ? "pm" : "am";
    const h12 = h % 12 || 12;
    return `${h12}:${m.toString().padStart(2, "0")}${period}`;
  };

  // API Submission Handler
  const handleSubmit = async (
    e: React.FormEvent,
    type: "booking" | "message"
  ) => {
    e.preventDefault();
    setIsSubmitting(true);
    setToastMessage(null);

    const payload =
      type === "booking"
        ? {
            type: "booking",
            ...formData,
            date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : null,
            time: selectedTime,
          }
        : {
            type: "message",
            subject: "Portfolio Contact Form",
            ...messageData,
          };

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setToastMessage(
          type === "booking"
            ? "Booking request sent successfully!"
            : "Message sent successfully!"
        );
        // Reset forms
        if (type === "booking") {
          setFormData({ name: "", email: "", subject: "", message: "" });
          setBookingStep("date-time");
          setSelectedTime(null);
        } else {
          setMessageData({ name: "", email: "", message: "" });
        }
      } else {
        setToastMessage("Failed to send. Please try again.");
      }
    } catch (error) {
      setToastMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
      // Clear toast after 3s
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden font-sans selection:bg-pink-500/30">
      {/* Background Gradients/Noise - keeping consistent with theme */}
      <div className="fixed inset-0 bg-black pointer-events-none -z-10" />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-white text-black px-6 py-3 rounded-full shadow-2xl font-medium text-sm flex items-center gap-2"
          >
            <CheckSquare size={16} className="text-green-500" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <header className="flex justify-between items-center p-6 md:px-12 z-10">
        <Link href="/" className="text-2xl font-bold font-serif">
          AR
        </Link>
        <nav className="hidden md:flex items-center gap-8 bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md">
          <Link
            href="/"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            href="/work"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Work
          </Link>
          <Link
            href="/blog"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Blog
          </Link>
        </nav>
        <Link
          href="/"
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X size={20} />
        </Link>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="sr-only">Book a Call</h1>

        {bookingStep === "date-time" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center mb-12"
          >
            <h4 className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase mb-4">
              Contact
            </h4>
            <h1 className="text-5xl md:text-7xl font-serif font-medium mb-6">
              Let's Get{" "}
              <span className="italic bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                In Touch
              </span>
            </h1>

            <div className="flex items-center justify-center gap-2 text-white/60 mb-6">
              <Mail size={16} />
              <a
                href="mailto:aadarshreddydepa@gmail.com"
                className="hover:text-white transition-colors"
              >
                aadarshreddydepa@gmail.com
              </a>
            </div>

            <div className="flex justify-center gap-6 text-white/40">
              <Link
                href="https://www.linkedin.com/in/aadarsh-reddy-depa-19b88722b/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </Link>
              <Link
                href="https://github.com/aadarshreddydepa"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Github size={20} />
              </Link>
              <Link
                href="https://x.com/aadarshdepa"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </Link>
            </div>
          </motion.div>
        )}

        {/* Toggle Switch - Only show on initial step */}
        {bookingStep === "date-time" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex bg-white/5 p-1 rounded-full border border-white/10 mb-8 w-fit relative"
          >
            <button
              onClick={() => setActiveTab("calendar")}
              className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 z-10 ${
                activeTab === "calendar"
                  ? "text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Book a Call
            </button>
            <button
              onClick={() => setActiveTab("message")}
              className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 z-10 ${
                activeTab === "message"
                  ? "text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Send Message
            </button>

            {/* Sliding Background */}
            <motion.div
              className="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full z-0"
              animate={{
                x: activeTab === "calendar" ? 0 : "100%",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </motion.div>
        )}

        {/* Content Area */}
        <div
          className={`w-full max-w-5xl transition-all duration-500 ease-in-out ${
            activeTab === "message" ? "max-w-3xl" : "max-w-5xl"
          } ${bookingStep === "form" ? "mt-8" : ""}`}
        >
          <div
            className={`w-full rounded-3xl overflow-hidden border border-white/10 bg-[#0e0e0e] shadow-2xl relative flex flex-col md:flex-row transition-all duration-500 ease-in-out ${
              activeTab === "calendar" ? "min-h-[600px]" : ""
            }`}
          >
            {activeTab === "calendar" ? (
              <>
                {/* Left Sidebar */}
                <div className="w-full md:w-1/3 bg-[#111] p-8 border-b md:border-b-0 md:border-r border-white/10 flex flex-col">
                  <div className="flex flex-col gap-6">
                    {/* Avatar & Name */}
                    <div className="">
                      {bookingStep === "form" ? (
                        <button
                          onClick={() => setBookingStep("date-time")}
                          className="p-2 -ml-2 mb-4 hover:bg-white/5 rounded-full transition-colors"
                        >
                          <ChevronLeft className="text-white/60" />
                        </button>
                      ) : null}
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 mb-4 relative">
                        <Image
                          src="/Logo/AR.png"
                          alt="Profile"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h4 className="text-sm font-medium text-white/40">
                        Aadarsh Reddy
                      </h4>
                      <h2 className="text-2xl font-bold text-white mt-1">
                        30 Min Meeting
                      </h2>
                    </div>

                    {/* Meeting Features */}
                    {bookingStep === "form" && selectedDate && selectedTime && (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-white/60 text-sm">
                          <CalendarIcon size={16} />
                          <span className="text-white font-medium">
                            {format(selectedDate, "EEEE, MMMM d, yyyy")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-white/60 text-sm pl-6">
                          <span className="text-white font-medium">
                            {formatTime(selectedTime)} -{" "}
                            {formatTime(addMinutesRaw(selectedTime, 30))}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-white/60 text-sm mt-2">
                      <CheckSquare size={16} />
                      <span>Requires confirmation</span>
                    </div>

                    {/* Details List */}
                    <div className="flex flex-col gap-4 mt-2">
                      <div className="flex items-center gap-3 text-white/60">
                        <Clock size={18} />
                        <span className="text-sm">30m</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/60">
                        <GoogleMeetLogo />
                        <span className="text-sm">Google Meet</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/60">
                        <Globe size={18} />
                        <span className="text-sm">Asia/Kolkata</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col md:flex-row bg-black/50 overflow-hidden relative">
                  <AnimatePresence mode="wait" initial={false}>
                    {bookingStep === "date-time" ? (
                      <motion.div
                        key="date-time"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="flex-1 flex flex-col md:flex-row w-full h-full"
                      >
                        {/* Middle: Calendar Grid */}
                        <div className="flex-1 p-8 border-b md:border-b-0 md:border-r border-white/10">
                          <div className="flex items-center justify-between mb-8">
                            <h3 className="text-lg font-medium text-white">
                              {format(currentDate, "MMMM yyyy")}
                            </h3>
                            <div className="flex gap-2">
                              <button
                                onClick={prevMonth}
                                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                              >
                                <ChevronLeft
                                  size={20}
                                  className="text-white/60"
                                />
                              </button>
                              <button
                                onClick={nextMonth}
                                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                              >
                                <ChevronRight
                                  size={20}
                                  className="text-white/60"
                                />
                              </button>
                            </div>
                          </div>

                          {/* Week Days Header */}
                          <div className="grid grid-cols-7 mb-4">
                            {weekDays.map((day) => (
                              <div
                                key={day}
                                className="text-center text-[10px] font-medium text-white/30 tracking-wider"
                              >
                                {day}
                              </div>
                            ))}
                          </div>

                          {/* Days Grid */}
                          <div className="grid grid-cols-7 gap-y-4">
                            {calendarDays.map((day, i) => {
                              const isSelected =
                                selectedDate && isSameDay(day, selectedDate);
                              const isCurrentMonth = isSameMonth(
                                day,
                                currentDate
                              );
                              const isCurrentDay = isToday(day);
                              // Disable past dates
                              const isPastDate = isBefore(day, today);

                              return (
                                <div key={i} className="flex justify-center">
                                  <button
                                    onClick={() => setSelectedDate(day)}
                                    disabled={!isCurrentMonth || isPastDate}
                                    className={`
                                                      w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all
                                                      ${
                                                        !isCurrentMonth
                                                          ? "invisible"
                                                          : ""
                                                      }
                                                      ${
                                                        isPastDate
                                                          ? "text-white/10 cursor-not-allowed decoration-white/10 opacity-50"
                                                          : "hover:bg-white/10"
                                                      }
                                                      ${
                                                        !isPastDate &&
                                                        isSelected
                                                          ? "bg-white text-black hover:bg-white"
                                                          : "text-white/80"
                                                      }
                                                      ${
                                                        isCurrentDay &&
                                                        !isSelected &&
                                                        !isPastDate
                                                          ? "text-pink-500 font-bold"
                                                          : ""
                                                      }
                                                  `}
                                  >
                                    {format(day, "d")}
                                    {isCurrentDay &&
                                      !isSelected &&
                                      !isPastDate && (
                                        <div className="absolute -bottom-1 w-1 h-1 bg-pink-500 rounded-full" />
                                      )}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Right: Time Slots */}
                        <div className="w-full md:w-64 p-8 bg-[#111]/30 flex flex-col max-h-[600px] overflow-y-auto custom-scrollbar">
                          <div className="flex items-center justify-between mb-6">
                            <span className="text-white/80 font-medium">
                              {selectedDate
                                ? format(selectedDate, "EEE d")
                                : "Select date"}
                            </span>
                            <div className="flex bg-white/5 rounded p-0.5 border border-white/10">
                              <button
                                onClick={() => setUse24Hour(false)}
                                className={`px-2 py-0.5 text-[10px] rounded transition-colors ${
                                  !use24Hour
                                    ? "bg-white/10 text-white"
                                    : "text-white/40 hover:text-white"
                                }`}
                              >
                                12h
                              </button>
                              <button
                                onClick={() => setUse24Hour(true)}
                                className={`px-2 py-0.5 text-[10px] rounded transition-colors ${
                                  use24Hour
                                    ? "bg-white/10 text-white"
                                    : "text-white/40 hover:text-white"
                                }`}
                              >
                                24h
                              </button>
                            </div>
                          </div>

                          <div className="space-y-3">
                            {timeSlots.map((time) => {
                              // Check if time is in the past (only if selected date is today)
                              const isPastTime = (() => {
                                if (!selectedDate || !isToday(selectedDate))
                                  return false;
                                const [h, m] = time.split(":").map(Number);
                                const now = new Date();
                                const slotDate = new Date();
                                slotDate.setHours(h, m, 0, 0);
                                return isBefore(slotDate, now);
                              })();

                              return (
                                <button
                                  key={time}
                                  onClick={() => handleTimeSelect(time)}
                                  disabled={isPastTime}
                                  className={`w-full py-3 px-4 rounded-xl border font-medium transition-all ${
                                    isPastTime
                                      ? "border-white/5 text-white/10 cursor-not-allowed opacity-50"
                                      : "border-white/10 hover:border-white/40 text-white/60 hover:text-white hover:bg-white/5 active:scale-[0.98]"
                                  }`}
                                >
                                  {formatTime(time)}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      /* Booking Form */
                      <motion.div
                        key="form"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="flex-1 w-full h-full"
                      >
                        <div className="flex-1 p-8 md:p-12 overflow-y-auto max-h-[600px] w-full">
                          <form
                            className="flex flex-col gap-6 max-w-md"
                            onSubmit={(e) => handleSubmit(e, "booking")}
                          >
                            <div>
                              <label className="block text-sm font-medium text-white/70 mb-2">
                                Your name *
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    name: e.target.value,
                                  })
                                }
                                className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-white/70 mb-2">
                                Email address *
                              </label>
                              <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    email: e.target.value,
                                  })
                                }
                                className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                              />
                            </div>
                            <div>
                              <button
                                type="button"
                                className="text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center gap-2 border border-blue-500/30 rounded-full px-4 py-2 hover:bg-blue-500/10 transition-colors w-fit"
                              >
                                <UserPlus size={16} />
                                Add guests
                              </button>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-white/70 mb-2">
                                What is this meeting about? *
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.subject}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    subject: e.target.value,
                                  })
                                }
                                className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-white/70 mb-2">
                                Additional notes
                              </label>
                              <textarea
                                value={formData.message}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    message: e.target.value,
                                  })
                                }
                                className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all min-h-[100px]"
                                placeholder="Please share anything that will help prepare for our meeting."
                              ></textarea>
                            </div>

                            <p className="text-xs text-white/40 mt-4 leading-relaxed">
                              By proceeding, you agree to our{" "}
                              <span className="text-white/60">Terms</span> and{" "}
                              <span className="text-white/60">
                                Privacy Policy
                              </span>
                              .
                            </p>

                            <div className="flex items-center justify-end gap-4 mt-2">
                              <button
                                type="button"
                                onClick={() => setBookingStep("date-time")}
                                className="text-sm font-medium text-white/60 hover:text-white transition-colors"
                              >
                                Back
                              </button>
                              <button
                                disabled={isSubmitting}
                                className="bg-white text-black px-6 py-2.5 rounded-full font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {isSubmitting ? "Confirming..." : "Confirm"}
                              </button>
                            </div>
                          </form>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="w-full p-8 md:p-12">
                <form
                  className="flex flex-col gap-6"
                  onSubmit={(e) => handleSubmit(e, "message")}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-white/40 uppercase mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={messageData.name}
                        onChange={(e) =>
                          setMessageData({
                            ...messageData,
                            name: e.target.value,
                          })
                        }
                        className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-white/40 uppercase mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={messageData.email}
                        onChange={(e) =>
                          setMessageData({
                            ...messageData,
                            email: e.target.value,
                          })
                        }
                        className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-medium text-white/40 uppercase">
                        Message
                      </label>
                      <span className="text-xs text-white/20">
                        {messageData.message.length}/1000
                      </span>
                    </div>
                    <textarea
                      required
                      placeholder="How can I help you?"
                      value={messageData.message}
                      onChange={(e) =>
                        setMessageData({
                          ...messageData,
                          message: e.target.value,
                        })
                      }
                      maxLength={1000}
                      className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all min-h-[200px] resize-none"
                    ></textarea>
                  </div>

                  <button
                    disabled={isSubmitting}
                    className="w-full bg-white text-black font-medium py-4 rounded-full flex items-center justify-center gap-2 hover:bg-gray-200 transition-all mt-4 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {!isSubmitting && (
                      <Send
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    )}
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Helper to add minutes to time string "HH:MM"
function addMinutesRaw(time: string, minutes: number) {
  const [h, m] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(h, m + minutes);
  return format(date, "HH:mm");
}

export default function BookACall() {
  return (
    <Suspense>
      <BookACallContent />
    </Suspense>
  );
}
