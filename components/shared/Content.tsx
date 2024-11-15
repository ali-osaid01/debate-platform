import { Badge } from "../ui/badge";
import { debateTopic } from "@/utils/data";
import Image from "next/image";

const Content = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col justify-center md:pr-8 xl:pr-0 lg:max-w-lg">
          <div className="max-w-xl mb-6">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              Explore Hundreds {' '}
              <br className="hidden md:block" />
              of Debate{' '}
              <span className="inline-block text-deep-purple-accent-400">
                Topics
              </span>
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              Dive into our extensive library of debate topics spanning various fields—politics, science, technology, culture, and more. With new topics added regularly, there&apos;s always a fresh discussion waiting for you to join or challenge!
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
           {debateTopic.map((topic)=>{
            return(
              <Badge key={topic}>{topic}</Badge>
            )
           })}
          </div>
        </div>
        <div className="flex items-center justify-center -mx-4 lg:pl-8">
          <div className="flex flex-col items-end px-3">
            <Image
              className="mb-6 rounded shadow-lg"
              alt=""
              src={'/assets/debate2.jpg'}
              width={400}
              height={200}
              />
            <Image
              className="  rounded shadow-lg "
              alt=""
              src={'/assets/debate3.jpg'}
              width={300}
              height={200}
            />
          </div>
          <div className="px-3">
            <Image
              className="rounded shadow-lg "
              alt=""
              src={'/assets/debate4.jpg'}
              width={400}
              height={220}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content