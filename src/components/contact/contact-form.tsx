"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!subject.trim()) {
      setError("Please enter an enquiry subject.");
      return;
    }

    if (!message.trim()) {
      setError("Please enter your message.");
      return;
    }

    setError(
      "The enquiry form is ready. We will connect it to the Velmora database in the backend phase."
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name + Email */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-xs font-semibold tracking-[0.14em] text-[#14213D]"
          >
            FULL NAME *
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            className="h-12 w-full border border-[#D8CBB8] bg-white px-4 text-sm text-[#242424] outline-none transition placeholder:text-[#242424]/40 focus:border-[#C9A227]"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-xs font-semibold tracking-[0.14em] text-[#14213D]"
          >
            EMAIL ADDRESS *
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="h-12 w-full border border-[#D8CBB8] bg-white px-4 text-sm text-[#242424] outline-none transition placeholder:text-[#242424]/40 focus:border-[#C9A227]"
          />
        </div>
      </div>

      {/* Phone + Subject */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-xs font-semibold tracking-[0.14em] text-[#14213D]"
          >
            PHONE NUMBER
          </label>

          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="+94..."
            className="h-12 w-full border border-[#D8CBB8] bg-white px-4 text-sm text-[#242424] outline-none transition placeholder:text-[#242424]/40 focus:border-[#C9A227]"
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="mb-2 block text-xs font-semibold tracking-[0.14em] text-[#14213D]"
          >
            SUBJECT *
          </label>

          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            placeholder="How can we help?"
            className="h-12 w-full border border-[#D8CBB8] bg-white px-4 text-sm text-[#242424] outline-none transition placeholder:text-[#242424]/40 focus:border-[#C9A227]"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-xs font-semibold tracking-[0.14em] text-[#14213D]"
        >
          MESSAGE *
        </label>

        <textarea
          id="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Write your enquiry..."
          rows={7}
          className="w-full resize-none border border-[#D8CBB8] bg-white px-4 py-4 text-sm text-[#242424] outline-none transition placeholder:text-[#242424]/40 focus:border-[#C9A227]"
        />
      </div>

      {error && (
        <p
          role="status"
          className="border-l-2 border-[#C9A227] bg-[#F6F1E8] px-4 py-3 text-sm leading-6 text-[#242424]/70"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#14213D] px-8 text-xs font-bold tracking-[0.14em] text-white transition hover:bg-[#C9A227] hover:text-[#14213D]"
      >
        SEND ENQUIRY
        <Send size={16} />
      </button>
    </form>
  );
}