import  { useState, useEffect } from 'react';
import useAuth from "../../Hook/UseAuth";
import TextTransition, { presets } from "react-text-transition";

const Shared = () => {
  const { user } = useAuth();
  const [index, setIndex] = useState(0);
  const [greeting, setGreeting] = useState("Welcome");

  useEffect(() => {
    const intervalId = setInterval(() => 
      setIndex(index => index + 1),
      3000 // Change every 3 seconds
    );
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const currentHour = new Date().getHours();
    
    if (currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon");
    } else if (currentHour < 21) {
      setGreeting("Good Evening");
    } else {
      setGreeting("Good Night");
    }
  }, []); // This effect runs once on component mount

  const texts = [
    `${greeting}, ${user?.displayName || 'User'}!`,
    "Welcome to your Dashboard",
    "Let's get started!",
    "Explore your options",
    "Have a great day!"
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-red-500 mb-4">
        <TextTransition springConfig={presets.wobbly}>
          {texts[index % texts.length]}
        </TextTransition>
      </h1>
      <p className="text-2xl text-black">
        {user?.displayName ? `Logged in as ${user.displayName}` : 'Welcome, Guest!'}
      </p>
    </div>
  );
};

export default Shared;
