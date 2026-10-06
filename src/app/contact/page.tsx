import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = { title: "Contact · PortofoliYou" };

// Contact screen: name / email / message required, project type optional.
export default function ContactPage() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-8 px-4 py-12 sm:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Get in touch</h1>
        <p className="text-stone-600 dark:text-stone-400">
          Have a project in mind or a question about my work? Send me a message.
        </p>
      </div>
      <ContactForm />
    </main>
  );
}
