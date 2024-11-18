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
    description: 'Schedule your service online or by phone at a time that suits you best.',
    Icon: FaCalendarCheck,
  },
  {
    stepNumber: 2,
    title: 'WE COLLECT',
    description: 'Choose a time that works for you, and our friendly team will pick up your items.',
    Icon: FaBoxOpen,
  },
  {
    stepNumber: 3,
    title: 'WE GET TO WORK',
    description: 'Our skilled experts will handle your repairs or fittings with care.',
    Icon: FaTools,
  },
  {
    stepNumber: 4,
    title: 'WE DELIVER',
    description: 'We’ll return your items, perfectly repaired or adjusted, at your convenience.',
    Icon: FaTruck,
  },
];

const ServiceSteps: React.FC = () => {
  return (
    <div className="flex justify-center gap-6 mt-8 flex-wrap">
      {steps.map(({ stepNumber, title, description, Icon }) => (
        <div
          key={stepNumber}
          className="w-72 h-80 bg-orange-500 text-white rounded-lg shadow-lg flex flex-col justify-center items-center p-6 transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
        >
          <Icon className="text-5xl mb-4" />
          <div className="text-xl font-bold mb-2">{stepNumber}. {title}</div>
          <p className="text-center">{description}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceSteps;
