"use client";

import React, { SetStateAction, useState } from "react";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import * as z from "zod";
import { ApiResponse } from "@/types/ApiResponse";
import Link from "next/link";
import { useParams } from "next/navigation";
import { messageSchema } from "@/schemas/messageSchema";
import { useCompletion } from "ai/react";

const specialChar = "||";

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;
  const [customErr, setCustomErr] = useState<string | null>(null);

  const {
    complete,
    completion,
    setCompletion,
    isLoading: isSuggestLoading,
    error,
  } = useCompletion({
    api: "/api/suggest-messages",
    initialCompletion: initialMessageString,
  });

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch("content");

  const handleMessageClick = (message: string) => {
    form.setValue("content", message);
  };

  const [isLoading, setIsLoading]: any = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    // const isAcceptingMessages = await fetchAcceptMessages();
    // if (!isAcceptingMessages) {
    //   toast({
    //     title: "Error",
    //     description: "User is not accepting messages.",
    //     variant: "destructive",
    //   });
    //   console.log({
    //     ...data,
    //     username,
    //   });
    //   return;
    // }

    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>("/api/send-messages", {
        ...data,
        username,
      });

      toast({
        title: response.data.message,
        variant: "default",
      });
      form.reset({ ...form.getValues(), content: "" });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ?? "Failed to sent message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestedMessages = async () => {
    try {
      await complete("");

      const isError = JSON.parse(error?.message || "");
      setCustomErr(error?.message || "");
      if (isError.status === 401) {
        toast({
          title: "Error",
          description: "Error occurred while fetching AI generative messages",
          variant: "destructive",
        });
        setCompletion(initialMessageString as string);
      }
      setCustomErr((prevErr: string | null) => (prevErr = ""));
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.error(
        "Error occurred while fetching AI generative messages",
        axiosError
      );
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ??
          "Error occurred while fetching AI generative messages",
        variant: "destructive",
      });
      setCompletion(initialMessageString as string);
    }
  };

  // const fetchAcceptMessages = async () => {
  //   try {
  //     console.log('aaraha he')
  //     const response = await axios.get("/api/accept-messages");
  //     console.log('aaraha  ya he')

  //     return response.data.isAcceptingMessages;
  //   } catch (error) {
  //     const axiosError = error as AxiosError<ApiResponse>;
  //     console.error(
      
  //       "Error occurred while fetching if user is accepting messages",error
  //     );
  //     toast({
  //       title: "Error",
  //       description:
  //         axiosError.response?.data.message ??
  //         "Failed to get accepting message status",
  //       variant: "destructive",
  //     });
  //   }
  // };

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Public Profile Link
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Send Anonymous Message to @{username}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            {isLoading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading || !messageContent}>
                Send It
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className="space-y-4 my-8">
        <div className="space-y-2">
          <Button
            onClick={fetchSuggestedMessages}
            className="my-4"
            disabled={isSuggestLoading}
          >
            Suggest Messages
          </Button>
          <p>Click on any message below to select it.</p>
        </div>
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Messages</h3>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            {customErr ? (
              <p className="text-red-500">
                {customErr /*JSON.parse(error.message).message*/}
              </p>
            ) : (
              parseStringMessages(completion).map((message, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="mb-2"
                  onClick={() => handleMessageClick(message)}
                >
                  {message}
                </Button>
              ))
            )}
          </CardContent>
        </Card>
      </div>
      <Separator className="my-6" />
      <div className="text-center">
        <div className="mb-4">Get Your Message Board</div>
        <Link href={"/sign-up"}>
          <Button>Create Your Account</Button>
        </Link>
      </div>
    </div>
  );
}
