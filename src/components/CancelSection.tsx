import React from 'react';
import {
  Clock,
  DollarSign,
  AlertTriangle,
  MessageCircle
} from 'lucide-react';

interface CancelSectionProps {
  id?: string;
  isVisible?: boolean;
}

const CancelSection = React.forwardRef<HTMLDivElement, CancelSectionProps>(
  ({ id, isVisible }, ref) => {
    return (
      <section id={id} ref={ref} className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div
            className={`text-center mb-16 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span style={{ color: '#0F0F0F', fontWeight: 'bold' }}>Cancellation </span>
              <span style={{ color: '#EF4B4B', fontWeight: 'bold' }}>Policy</span>
            </h2>
            <p className="text-xl text-gray-600">Easy, Clear, and Transparent</p>
          </div>

          {/* Cards Grid */}
          <div
            className={`grid gap-6 md:grid-cols-2 transform transition-all duration-700 delay-200 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            {[
              {
                icon: Clock,
                title: '24-Hour Full Refund',
                description:
                  'Cancel certificate applications within 24 hours for a complete refund.'
              },
              {
                icon: DollarSign,
                title: 'Partial Refunds',
                description:
                  'After 24 hours, partial refunds may be processed (excluding processing charges).'
              },
              {
                icon: AlertTriangle,
                title: 'No Refund After Approval',
                description:
                  'Once certificates are approved and published, no refund is applicable.'
              },
              {
                icon: MessageCircle,
                title: 'Contact for Refunds',
                description:
                  'All refund requests must be sent via our official Contact Us page or WhatsApp.'
              }
            ].map((policy, index) => {
              return (
                <div
                  key={index}
                  className={`
                    group p-5 rounded-lg border-2 transition-all duration-300 hover:shadow-lg hover:scale-105
                    bg-gray-50 border-gray-200
                    hover:bg-red-50 hover:border-red-200
                  `}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`
                        flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
                        bg-red-100 transition-transform duration-500
                        group-hover:rotate-12
                      `}
                    >
                      <policy.icon
                        className="w-5 h-5 text-red-500 transition-transform duration-500 group-hover:rotate-45"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-500 mb-1">
                        {policy.title}
                      </h4>
                      <p className="text-sm text-gray-600">{policy.description}</p>
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

CancelSection.displayName = 'CancelSection';
export default CancelSection;