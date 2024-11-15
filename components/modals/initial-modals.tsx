// components/initial-modal.tsx

"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload"; // Poprawny import komponentu

// Zdefiniowanie schematu walidacji formularza
const formSchema = z.object({
  name: z.string().min(1, { message: "Server name is required" }),
  imageUrl: z.string().min(1, { message: "Server image is required" }),
});

export const InitialModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        await axios.post("/api/servers", values); // Przesyłanie danych na serwer
        form.reset();
        router.refresh();
        window.location.reload();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    [form, router]
  );

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Customize your server</DialogTitle>
          <DialogDescription>
            Give your server a personality with a name and an image.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Pole do przesyłania obrazu */}
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileUpload
                      endpoint="imageUploader" // Endpoint do przesyłania obrazów
                      value={field.value}
                      onChange={field.onChange} // Aktualizowanie wartości w formularzu
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Pole do wpisania nazwy serwera */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Enter server name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
