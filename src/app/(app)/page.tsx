'use client'
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Messages from '@/messages.json'
import Autoplay from 'embla-carousel-autoplay'
import React from "react";

export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )
    
  return (
    <>
    <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
      <section className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-bold">
          Dive into the World of Anonymous Feedback
        </h1>
        <p className="mt-3 md:mt-4 text-base md:text-lg">
          True Feedback - Where your identity remains a secret.
        </p>
      </section>

      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-4xl"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.play as any}
      >
        <CarouselContent className="w-full ">
          {Messages.map((message, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2 p-2">
              <Card className="h-full bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden">
                <CardContent className="flex flex-col p-4 md:p-12">
                  <h3 className="text-lg md:text-xl font-bold mb-2">{message.title}</h3>
                  <p className="text-sm md:text-base mb-4">{message.content}</p>
                  <span className="text-xs text-gray-500">{message.received}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-black"/>
        <CarouselNext className="text-black"/>
      </Carousel>
    </main>
          <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
          © 2023 True Feedback. All rights reserved.
        </footer>
        </>
  
  );
  
}
