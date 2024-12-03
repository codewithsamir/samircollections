import React from 'react';
import { FaCalendarCheck, FaBoxOpen, FaTools, FaTruck } from 'react-icons/fa';

interface ServiceStep {
  stepNumber: number;
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>; // Type Icon with className prop
}

const steps: ServiceStep[] = [
  {
    stepNumber: 1,
    title: 'BOOK YOUR SERVICE',
    description: 'Select a convenient time for us to collect your items, either online or by phone.',
    Icon: FaCalendarCheck,
  },
  {
    stepNumber: 2,
    title: 'WE COME TO COLLECT',
    description: 'Our team will arrive at the scheduled time to pick up your items with care.',
    Icon: FaBoxOpen,
  },
  {
    stepNumber: 3,
    title: 'WE GET TO WORK',
    description: 'Our skilled experts will handle your repairs or fittings with precision.',
    Icon: FaTools,
  },
  {
    stepNumber: 4,
    title: 'WE DELIVER BACK',
    description: 'Once complete, we’ll return your items at a time convenient for you.',
    Icon: FaTruck,
  },
];

const ServiceSteps: React.FC = () => {
  return (
    <div className="flex justify-center gap-6 mt-8 flex-wrap py-10">
      {steps.map(({ stepNumber, title, description, Icon }) => (
    <div
    key={stepNumber}
    className="group w-[300px]  h-[200px] bg-white hover:bg-red-500 text-black hover:text-white transition-all rounded-lg shadow-lg flex flex-col justify-center items-center p-4 transform  hover:shadow-xl cursor-pointer"
  >
    <Icon className="text-5xl mb-4 text-red-500 group-hover:text-white" />
    <div className="text-xl font-bold mb-2 transition-al">{stepNumber}. {title}</div>
    <p className="text-center hidden group-hover:block transition-all">{description}</p>
  </div>
  
      ))}
    </div>
  );
};

export default ServiceSteps;
