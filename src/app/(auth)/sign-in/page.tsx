"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from 'axios'
import { ApiResponse } from "@/types/ApiResponse";
import { Form } from "@/components/ui/form";

function Page() {
  const [username, setUsername] = useState("");
  const [usernameMsg, setUsernameMsg] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const debouncedUsername = useDebounceValue(username, 300);

  //zod implementation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      setIsCheckingUsername(true)
      setUsernameMsg('')
      try {
        const response = await axios.get(`/api/check-username-unique?username=${debouncedUsername}`)
        console.log(response , 'response')
        setUsernameMsg(response.data.message)
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>
        setUsernameMsg(axiosError.response?.data.message ?? 'Error while checking username')
      }finally{
        setIsCheckingUsername(false)
      }
    };
    checkUsernameUnique()
  }, [debouncedUsername]);
  
  const onSubmit = async (data:z.infer<typeof signUpSchema>) =>{
    setIsSubmitting(true)
    try {
      console.log(data)
      const response = await axios.post<ApiResponse>('/api/sign-up',data)
      toast({
        title:'Success',
        description:response.data.message
      })
      
      router.replace(`/verify/${username}`)
      setIsSubmitting(false)
    } catch (error) {
      console.error("Error in signup of user" ,error)
      const axiosError = error as AxiosError<ApiResponse>
      console.log(axiosError , 'axios error')
      let errorMsg = axiosError.response?.data.message 
      toast({
        title:"Signup Failed",
        description:errorMsg,
        variant:'destructive'
      })
      setIsSubmitting(false)
    }
  }
  return <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Join Mystery Message</h1>
        <p className="mb-4">Sign up to start your anonymous adventure</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6"></form>
      </Form>
    </div>
  </div>;
}

export default Page;
