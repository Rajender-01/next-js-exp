"use client";
import { useEffect, useRef, useState } from "react";

const Page = () => {
  const [isToken, setIsToken] = useState(null);
  const [formData, setFormData] = useState({ text: "", email: "" });
  const [captchaReady, setCaptchaReady] = useState(false);
  const recaptchaRef = useRef(null);

  useEffect(() => {
    // 1️⃣ Create the callback before loading script
    window.onloadCallback = () => {
      // 2️⃣ Ensure container exists
      if (!recaptchaRef.current) return;

      // 3️⃣ Render captcha widget
      window.grecaptcha.render(recaptchaRef.current, {
        sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY,
        callback: (token) => setIsToken(token),
      });

      setCaptchaReady(true);
    };

    // Load Google reCAPTCHA script
    const script = document.createElement("script");
    script.src =
      "https://www.google.com/recaptcha/api.js?render=explicit&onload=onloadCallback";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isToken) {
      alert("Please complete captcha");
      return;
    }

    await fetch("/api/v2captcha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: isToken }),
    });

    alert("Form submit");
  };

  return (
    <section className="w-full h-dvh flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl flex flex-col space-y-5"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Contact Form
        </h2>

        <input
          type="text"
          placeholder="Your Name"
          value={formData.text}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, text: e.target.value }))
          }
          className="border p-3 rounded-lg"
        />

        <input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          className="border p-3 rounded-lg"
        />

        {!captchaReady && (
          <p className="text-sm text-gray-500">Captcha loading...</p>
        )}

        <div ref={recaptchaRef} />

        <button
          type="submit"
          disabled={!isToken}
          className="px-4 py-3 bg-blue-600 disabled:bg-gray-400 text-white rounded-lg"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default Page;
