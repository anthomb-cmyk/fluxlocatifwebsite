"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2, Send } from "lucide-react";
import { aiLeadQualificationAndRouting } from "@/ai/flows/ai-lead-qualification-and-routing";

const formSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  company: z.string().optional(),
  phone: z.string().optional(),
  propertyCount: z.string().min(1, "Veuillez sélectionner le nombre de logements"),
  message: z.string().min(10, "Veuillez préciser votre demande (min. 10 caractères)"),
});

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      propertyCount: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const analysis = await aiLeadQualificationAndRouting(values);
      console.log("Analyse du prospect:", analysis);
      
      setIsSuccess(true);
      toast({
        title: "Demande envoyée !",
        description: "Nous reviendrons vers vous très prochainement.",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erreur lors de l'envoi",
        description: "Une erreur est survenue, veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="glass-card p-8 md:p-24 rounded-[2rem] md:rounded-[4rem] border shadow-xl text-center bg-white/60">
        <div className="w-16 h-16 md:w-24 md:h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6 md:mb-10 shadow-inner">
          <CheckCircle2 className="h-8 w-8 md:h-12 md:h-12" />
        </div>
        <h3 className="text-2xl md:text-4xl font-medium font-headline mb-4 md:mb-6 tracking-tight text-slate-900">C'est en route !</h3>
        <p className="text-base md:text-xl text-muted-foreground mb-8 md:mb-12 font-normal max-w-md mx-auto leading-relaxed font-body">
          Merci pour votre confiance. Notre équipe analyse vos besoins et nous vous contacterons sous peu.
        </p>
        <Button onClick={() => setIsSuccess(false)} variant="outline" size="lg" className="w-full sm:w-auto h-14 md:h-16 rounded-full px-12 text-lg font-medium border-2 font-body">
          Envoyer un autre message
        </Button>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 sm:p-10 md:p-20 rounded-[2rem] md:rounded-[4rem] shadow-xl bg-white/60">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2 md:space-y-4">
                  <FormLabel className="font-medium text-slate-900 text-xs md:text-sm uppercase tracking-widest pl-1 font-body">Nom complet</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre nom" {...field} className="h-12 md:h-16 rounded-xl md:rounded-2xl border-white/40 bg-white/40 text-base md:text-lg px-6 font-body" />
                  </FormControl>
                  <FormMessage className="text-[10px] font-medium font-body" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2 md:space-y-4">
                  <FormLabel className="font-medium text-slate-900 text-xs md:text-sm uppercase tracking-widest pl-1 font-body">Email pro</FormLabel>
                  <FormControl>
                    <Input placeholder="votre@email.com" {...field} className="h-12 md:h-16 rounded-xl md:rounded-2xl border-white/40 bg-white/40 text-base md:text-lg px-6 font-body" />
                  </FormControl>
                  <FormMessage className="text-[10px] font-medium font-body" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem className="space-y-2 md:space-y-4">
                  <FormLabel className="font-medium text-slate-900 text-xs md:text-sm uppercase tracking-widest pl-1 font-body">Entreprise</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre entreprise" {...field} className="h-12 md:h-16 rounded-xl md:rounded-2xl border-white/40 bg-white/40 text-base md:text-lg px-6 font-body" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="space-y-2 md:space-y-4">
                  <FormLabel className="font-medium text-slate-900 text-xs md:text-sm uppercase tracking-widest pl-1 font-body">Téléphone</FormLabel>
                  <FormControl>
                    <Input placeholder="(000) 000-0000" {...field} className="h-12 md:h-16 rounded-xl md:rounded-2xl border-white/40 bg-white/40 text-base md:text-lg px-6 font-body" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="propertyCount"
            render={({ field }) => (
              <FormItem className="space-y-2 md:space-y-4">
                <FormLabel className="font-medium text-slate-900 text-xs md:text-sm uppercase tracking-widest pl-1 font-body">Logements en gestion</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 md:h-16 rounded-xl md:rounded-2xl border-white/40 bg-white/40 text-base md:text-lg px-6 font-body">
                      <SelectValue placeholder="Volume" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="1-5" className="font-body">1 à 5 logements</SelectItem>
                    <SelectItem value="5-10" className="font-body">5 à 10 logements</SelectItem>
                    <SelectItem value="10-20" className="font-body">10 à 20 logements</SelectItem>
                    <SelectItem value="20-50" className="font-body">20 à 50 logements</SelectItem>
                    <SelectItem value="50+" className="font-body">Plus de 50 logements</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-[10px] font-medium font-body" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="space-y-2 md:space-y-4">
                <FormLabel className="font-medium text-slate-900 text-xs md:text-sm uppercase tracking-widest pl-1 font-body">Besoins locatifs</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Détails de votre projet..."
                    className="min-h-[150px] md:min-h-[200px] rounded-xl md:rounded-[2rem] border-white/40 bg-white/40 p-6 md:p-8 text-base md:text-lg font-body"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[10px] font-medium font-body" />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-16 md:h-20 text-lg md:text-xl font-medium rounded-full shadow-lg py-6 md:py-8 gap-3 md:gap-4 font-body" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 md:h-6 md:h-6 animate-spin" />
                Analyse...
              </>
            ) : (
              <>
                Démarrer le service
                <Send className="h-4 w-4 md:h-5 md:h-5" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}