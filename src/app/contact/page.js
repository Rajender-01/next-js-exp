"use client";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Page = () => {
  const [isToken, setIsToken] = useState(null);
  const [formData, setFormData] = useState({ text: "", email: "" });
  const recaptchaRef = useRef();

  const onChange = (token) => {
    setIsToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = recaptchaRef.current.getValue();
    await fetch("/api/v2captcha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
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
          className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="Your Email"
          className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY}
          onChange={onChange}
        />
        <button
          type="submit"
          className="px-4 py-3 bg-blue-600 disabled:bg-gray-400 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          disabled={!isToken}
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default Page;
