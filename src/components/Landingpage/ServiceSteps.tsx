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
    <div className="flex justify-center gap-6 mt-8 flex-wrap">
      {steps.map(({ stepNumber, title, description, Icon }) => (
        <div
          key={stepNumber}
          className="w-70 h-72 bg-white hover:bg-slate-700 text-black hover:text-white transition-all rounded-lg shadow-lg flex flex-col justify-center items-center p-6 transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
        >
          <Icon className="text-5xl mb-4" />
          <div className="text-xl font-bold mb-2">{stepNumber}. {title}</div>
          <p className="text-center hidden group-hover:block">{description}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceSteps;
