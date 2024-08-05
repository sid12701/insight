import { Button } from "@/components/ui/button";
import { TypewriterEffect } from "../components/ui/typewritter-effect";
import {useNavigate} from "react-router-dom";
import { HammerIcon, LightbulbIcon, PenToolIcon } from "lucide-react";
import AnimatedDiv from "@/components/animated-div";


const Home = () => {
    const navigate = useNavigate();
  const words = [
    {
      text: "Insight",
    },
    {
      text: "Journal",
    },
  ];
  
  const handleGetStartedClick = ()=>{
    navigate('/journal')
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-100% bg-gray-50 dark:bg-gray-950 px-4 md:px-6 py-12 md:py-24">
      <div className="max-w-3xl text-center space-y-4">
        <TypewriterEffect words={words} />
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
          Unlock the power of AI-driven journaling to enhance your
          self-reflection and personal growth.
        </p>
        <Button className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 text-sm font-mediu text-gray-50" onClick={handleGetStartedClick}>Start Journalling</Button>
      </div>
      <div className="mt-12 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        <AnimatedDiv>
          <PenToolIcon className="w-10 h-10 text-gray-500 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            Effortless Journaling
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Seamlessly capture your thoughts and experiences with our intuitive
            interface.
          </p>
        </AnimatedDiv>
        <AnimatedDiv> 
        <LightbulbIcon className="w-10 h-10 text-gray-500 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            Insightful Analytics
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Discover patterns and trends in your journaling with our powerful
            AI-driven analytics.
          </p>
        </AnimatedDiv>
        <AnimatedDiv
        >
          <HammerIcon className="w-10 h-10 text-gray-500 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            Build Healthy Habits
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Establish and maintain healthy habits for long-term well-being.
          </p>
        </AnimatedDiv>
      </div>
     </main>
  );

};

export default Home;
