import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TermsSectionProps {
  id?: string;
  isVisible?: boolean;
  openAccordion?: number | null;
  setOpenAccordion?: (idx: number | null) => void;
}

const TermsSection = React.forwardRef<HTMLDivElement, TermsSectionProps>(
  ({ id, isVisible, openAccordion, setOpenAccordion }, ref) => {
    const terms = [
      {
        title: 'Information Accuracy',
        content:
          'You agree to provide true and accurate information when submitting a listing. False or misleading information may result in immediate removal.',
      },
      {
        title: 'Listing Approval & Removal',
        content:
          'We reserve the right to approve, reject, or remove listings without notice if found misleading or inappropriate. Our decision is final.',
      },
      {
        title: 'Liability & Responsibility',
        content:
          'TravelTop10 is not responsible for the actions of listed agencies or third-party providers. Users engage with listed services at their own discretion.',
      },
      {
        title: 'Paid Certifications',
        content:
          'Paid certifications do not guarantee permanent listing or visibility. Rankings may change based on performance and feedback.',
      },
      {
        title: 'Data & Privacy',
        content:
          'By using our site, you agree to our data policies and privacy practices. We protect your information according to industry standards.',
      },
    ];

    return (
      <section id={id} ref={ref} className="py-20 px-6 bg-red-50">
        <div className="max-w-4xl mx-auto">
          {/* Section Header with red background behind part of title */}
          <div
            className={`text-center mb-16 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative inline-block">
              <span className="relative z-10">
              <span style={{ color: '#0F0F0F', fontWeight: 'bold' }}>Terms & </span>
              <span style={{ color: '#EF4B4B', fontWeight: 'bold' }}>Conditions </span>
              </span>
              {/* <span className="absolute inset-x-0 bottom-1 h-3 bg-[#EF4B4B]/10 z-0"></span> */}
            </h2>
            <p className="text-xl text-gray-600">Our Service Policy and Rules</p>
          </div>

          {/* Accordion */}
          <div
            className={`space-y-3 transform transition-all duration-700 delay-200 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            {terms.map((item, index) => {
              const isOpen = openAccordion === index;
              return (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm transition"
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() =>
                      setOpenAccordion?.(isOpen ? null : index)
                    }
                    className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                  >
                    <span className="font-semibold text-BLACK">{item.title}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-red-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  {/* Accordion Content */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className="px-6 pb-5 pt-2">
                      <p className="text-gray-600 leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
);

TermsSection.displayName = 'TermsSection';
export default TermsSection;