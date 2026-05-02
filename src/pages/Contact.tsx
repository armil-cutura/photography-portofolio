import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { SiInstagram, SiPinterest, SiFacebook } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { submitContact } from "@/api/contact";

export function Contact() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().min(2, t("contact.form.errors.nameMin")),
    email: z.string().email(t("contact.form.errors.emailInvalid")),
    type: z.string().min(1, t("contact.form.errors.typeRequired")),
    message: z.string().min(10, t("contact.form.errors.messageMin")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", type: "", message: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await submitContact(values);
      toast({ title: t("contact.form.successTitle"), description: t("contact.form.successDesc") });
      form.reset();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Please try again or email me directly.";
      toast({ title: "Something went wrong", description: msg, variant: "destructive" });
    }
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-2"
        >
          <h1 className="font-serif text-5xl md:text-6xl mb-6">{t("contact.title")}</h1>
          <p className="text-muted-foreground font-light leading-relaxed mb-12">{t("contact.subtitle")}</p>

          <div className="space-y-8">
            <div>
              <h3 className="font-sans uppercase tracking-widest text-xs mb-2">{t("contact.email")}</h3>
              <a href="mailto:hello@elaravance.com" className="text-foreground hover:opacity-70 transition-opacity font-serif text-xl">
                hello@elaravance.com
              </a>
            </div>
            <div>
              <h3 className="font-sans uppercase tracking-widest text-xs mb-2">{t("contact.location")}</h3>
              <p className="text-muted-foreground font-light">{t("contact.locationValue")}</p>
            </div>
            <div>
              <h3 className="font-sans uppercase tracking-widest text-xs mb-4">{t("contact.follow")}</h3>
              <div className="flex gap-6">
                <a href="#" className="text-foreground hover:opacity-70 transition-opacity"><SiInstagram className="w-5 h-5" /></a>
                <a href="#" className="text-foreground hover:opacity-70 transition-opacity"><SiPinterest className="w-5 h-5" /></a>
                <a href="#" className="text-foreground hover:opacity-70 transition-opacity"><SiFacebook className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-3 bg-card p-8 md:p-12 border border-border"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-widest text-xs text-muted-foreground">{t("contact.form.name")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("contact.form.namePlaceholder")} {...field} className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground" />
                      </FormControl>
                      <FormMessage className="font-light text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-widest text-xs text-muted-foreground">{t("contact.form.email")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("contact.form.emailPlaceholder")} {...field} className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground" />
                      </FormControl>
                      <FormMessage className="font-light text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase tracking-widest text-xs text-muted-foreground">{t("contact.form.shootType")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-transparent border-0 border-b border-border rounded-none px-0 focus:ring-0 shadow-none">
                          <SelectValue placeholder={t("contact.form.shootTypePlaceholder")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="portrait">{t("contact.form.options.portrait")}</SelectItem>
                        <SelectItem value="wedding">{t("contact.form.options.wedding")}</SelectItem>
                        <SelectItem value="lifestyle">{t("contact.form.options.lifestyle")}</SelectItem>
                        <SelectItem value="commercial">{t("contact.form.options.commercial")}</SelectItem>
                        <SelectItem value="other">{t("contact.form.options.other")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="font-light text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase tracking-widest text-xs text-muted-foreground">{t("contact.form.vision")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("contact.form.visionPlaceholder")}
                        className="min-h-[150px] bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-light text-xs" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                disabled={form.formState.isSubmitting}
                className="w-full h-14 tracking-widest uppercase text-xs bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50"
              >
                {form.formState.isSubmitting ? "..." : t("contact.form.send")}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
}
