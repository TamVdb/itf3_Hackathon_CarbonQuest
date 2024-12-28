import { useState } from "react";
import { cloneElement } from 'react';
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa6";

export const Accordion = ({ children }) => {
   const [accordionOpen, setAccordionOpen] = useState(false);
   const toggleAccordion = () => {
      setAccordionOpen(!accordionOpen);
   };

   return (
      <div className="accordion py-3 border-b last:border-b-0 border-slate-300">
         {children.map((child, index) => {
            if (index === 0) {
               return cloneElement(child, {
                  key: index,
                  accordionOpen,
                  toggleAccordion,
               });
            } else if (index === 1) {
               return cloneElement(child, {
                  key: index,
                  accordionOpen,
               });
            } else {
               return child;
            }
         })}
      </div>
   );
};

export const AccordionHeader = ({ children, accordionOpen, toggleAccordion, iconOpen = <FaChevronUp />, iconClose = <FaChevronDown /> }) => {
   const icon = accordionOpen ? iconOpen : iconClose;

   return (
      <div className='accordion-header'>
         <button className="accordion-btn flex justify-between w-full text-left font-semibold text-title font-title text-lg" onClick={toggleAccordion}>
            {children} <span>{icon}</span>
         </button>
      </div>
   );
};

export const AccordionPanel = ({ children, accordionOpen }) => {
   const className = accordionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0';

   return (
      <div className={`grid overflow-hidden transition-200 text-text ${className}`}>
         <div className='overflow-hidden'>
            <div className='accordion-panel-content pt-3 pr-3'>{children}</div>
         </div>
      </div>
   );
};