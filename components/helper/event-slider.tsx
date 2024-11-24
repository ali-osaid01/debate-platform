'use client'
import Autoplay from "embla-carousel-autoplay"
import debate from '@/public/assets/debate4.jpg'
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import React from "react"
import Image from "next/image"

export default function EventSlider() {
    const plugin = React.useRef(
        Autoplay({ delay: 1000 })
    )

    return (
        <div className="flex justify-center my-6">
            <Carousel
                plugins={[plugin.current]}
                className="max-w-full lg:max-w-6xl"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    <CarouselItem className="w-[300px] lg:w-[500px]">
                        <Card className="h-[200px] lg:h-[400px]">
                            <CardContent className="relative flex h-full items-center justify-center p-4 lg:p-6">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={debate}
                                        alt="Event-Picture"
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white rounded-lg">
                                        <h1 className="text-4xl font-bold tracking-wide">
                                            E V E N T
                                        </h1>
                                        <p className="mt-2 text-lg font-medium">
                                            NASA EVENT ON SPACE
                                        </p>
                                        <p className="text-sm">Time: 5:00 PM</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                    <CarouselItem className="w-[300px] lg:w-[500px]">
                        <Card className="h-[200px] lg:h-[400px]">
                            <CardContent className="relative flex h-full items-center justify-center p-4 lg:p-6">

                                <div className="relative w-full h-full">
                                    <Image
                                        src={debate}
                                        alt="Event-Picture"
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white rounded-lg">
                                        <h1 className="text-4xl font-bold tracking-wide">
                                            E V E N T
                                        </h1>
                                        <p className="mt-2 text-lg font-medium">
                                            NASA EVENT ON SPACE
                                        </p>
                                        <p className="text-sm">Time: 5:00 PM</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                    <CarouselItem className="w-[300px] lg:w-[500px]">
                        <Card className="h-[200px] lg:h-[400px]">
                            <CardContent className="relative flex h-full items-center justify-center p-4 lg:p-6">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={debate}
                                        alt="Event-Picture"
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white rounded-lg">
                                        <h1 className="text-4xl font-bold tracking-wide">
                                            E V E N T
                                        </h1>
                                        <p className="mt-2 text-lg font-medium">
                                            NASA EVENT ON SPACE
                                        </p>
                                        <p className="text-sm">Time: 5:00 PM</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}
