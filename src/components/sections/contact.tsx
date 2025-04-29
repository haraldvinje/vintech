"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const t = useTranslations("Contact");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      await response.json();

      if (response.ok) {
        toast.success(t("form.successMessage"));

        (e.target as HTMLFormElement).reset();
      } else {
        toast.error(t("form.errorMessage"))
      }
    } catch {
      toast.error(t("form.networkError"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      className="w-full py-12 md:py-24 lg:py-32 scroll-mt-16"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-verdana">
              {t("title")}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("description")}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 mt-12">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 mt-1 text-primary" />
              <div>
                <h3 className="font-bold">{t("email.label")}</h3>
                <p className="text-muted-foreground">{t("email.value")}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 mt-1 text-primary" />
              <div>
                <h3 className="font-bold">{t("phone.label")}</h3>
                <p className="text-muted-foreground">{t("phone.value")}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 mt-1 text-primary" />
              <div>
                <h3 className="font-bold">{t("location.label")}</h3>
                <p className="text-muted-foreground">{t("location.value")}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Input
                    name="name"
                    id="name"
                    placeholder={t("form.name")}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    name="email"
                    id="email"
                    type="email"
                    placeholder={t("form.email")}
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Input
                  name="subject"
                  id="subject"
                  placeholder={t("form.subject")}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Textarea
                  name="message"
                  className="min-h-[150px]"
                  id="message"
                  placeholder={t("form.message")}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t("form.sending") : t("form.submit")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
