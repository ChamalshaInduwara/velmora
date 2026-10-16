"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  LoaderCircle,
  Send,
} from "lucide-react";

export default function ContactForm() {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [subject, setSubject] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError(
        "Please enter your name."
      );
      return;
    }

    if (!email.trim()) {
      setError(
        "Please enter your email address."
      );
      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(
        email.trim()
      )
    ) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }

    if (!subject.trim()) {
      setError(
        "Please enter an enquiry subject."
      );
      return;
    }

    if (!message.trim()) {
      setError(
        "Please enter your message."
      );
      return;
    }

    if (
      message.trim().length < 10
    ) {
      setError(
        "Please provide a little more detail in your message."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response =
        await fetch(
          "/api/contact",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name,
              email,
              phone,
              subject,
              message,
            }),
          }
        );

      const data =
        (await response.json()) as {
          success?: boolean;
          error?: string;
        };

      if (
        !response.ok ||
        !data.success
      ) {
        setError(
          data.error ??
            "We could not send your enquiry."
        );

        return;
      }

      setSuccess(
        "Thank you. Your enquiry has been sent successfully. Our team will get back to you soon."
      );

      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    } catch {
      setError(
        "Unable to connect to the enquiry service. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
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
            disabled={
              isSubmitting
            }
            onChange={(event) =>
              setName(
                event.target.value
              )
            }
            placeholder="Your name"
            className="h-12 w-full border border-[#D8CBB8] bg-white px-4 text-sm text-[#242424] outline-none transition placeholder:text-[#242424]/40 focus:border-[#C9A227] disabled:cursor-not-allowed disabled:opacity-60"
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
            disabled={
              isSubmitting
            }
            onChange={(event) =>
              setEmail(
                event.target.value
              )
            }
            placeholder="you@example.com"
            className="h-12 w-full border border-[#D8CBB8] bg-white px-4 text-sm text-[#242424] outline-none transition placeholder:text-[#242424]/40 focus:border-[#C9A227] disabled:cursor-not-allowed disabled:opacity-60"
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
            disabled={
              isSubmitting
            }
            onChange={(event) =>
              setPhone(
                event.target.value
              )
            }
            placeholder="+94..."
            className="h-12 w-full border border-[#D8CBB8] bg-white px-4 text-sm text-[#242424] outline-none transition placeholder:text-[#242424]/40 focus:border-[#C9A227] disabled:cursor-not-allowed disabled:opacity-60"
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
            disabled={
              isSubmitting
            }
            onChange={(event) =>
              setSubject(
                event.target.value
              )
            }
            placeholder="How can we help?"
            className="h-12 w-full border border-[#D8CBB8] bg-white px-4 text-sm text-[#242424] outline-none transition placeholder:text-[#242424]/40 focus:border-[#C9A227] disabled:cursor-not-allowed disabled:opacity-60"
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
          disabled={
            isSubmitting
          }
          onChange={(event) =>
            setMessage(
              event.target.value
            )
          }
          placeholder="Write your enquiry..."
          rows={7}
          className="w-full resize-none border border-[#D8CBB8] bg-white px-4 py-4 text-sm text-[#242424] outline-none transition placeholder:text-[#242424]/40 focus:border-[#C9A227] disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      {error && (
        <p
          role="alert"
          className="border-l-2 border-red-700 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
        >
          {error}
        </p>
      )}

      {success && (
        <p
          role="status"
          className="border-l-2 border-[#C9A227] bg-[#F6F1E8] px-4 py-3 text-sm leading-6 text-[#14213D]"
        >
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#14213D] px-8 text-xs font-bold tracking-[0.14em] text-white transition hover:bg-[#C9A227] hover:text-[#14213D] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            SENDING...

            <LoaderCircle
              size={16}
              className="animate-spin"
            />
          </>
        ) : (
          <>
            SEND ENQUIRY
            <Send size={16} />
          </>
        )}
      </button>
    </form>
  );
}