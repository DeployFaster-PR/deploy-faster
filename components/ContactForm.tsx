import { useState } from 'react';
import { X, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { ContactFormData } from '@/lib/types';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  templateId?: string;
  templateTitle?: string;
  templatePrice?: string;
  templateUrl?: string;
  templateFeatured?: boolean;
}

export default function ContactForm({
  isOpen,
  onClose,
  templateId,
  templateTitle,
  templatePrice,
  templateUrl,
  templateFeatured,
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    launchTimeline: '',
    message: '',
    templateId: templateId || '',
    templateTitle: templateTitle || '',
    templatePrice: templatePrice || '',
    templateUrl: templateUrl || '',
    templateFeatured: templateFeatured || false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.name.trim()) {
      errors.push('Full Name is required');
    }

    if (!formData.email.trim()) {
      errors.push('Email Address is required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }

    if (!formData.phone.trim()) {
      errors.push('Phone Number is required');
    }

    if (!formData.serviceType) {
      errors.push('Please select a service type');
    }

    if (!formData.launchTimeline) {
      errors.push('Please select your expected launch timeline');
    }

    if (!formData.message.trim()) {
      errors.push('Please tell us about your project');
    } else if (formData.message.trim().length < 10) {
      errors.push('Project description should be at least 10 characters long');
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setValidationErrors([]);

    // Client-side validation
    const errors = validateForm();
    if (errors.length > 0) {
      setValidationErrors(errors);
      // Scroll to top to show errors
      const formElement = document.getElementById('contact-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Include the current URL in the form data
      const submitData = {
        ...formData,
        templateUrl:
          typeof window !== 'undefined' ? window.location.href : templateUrl,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400 && data.error) {
          // Server validation error
          setError(data.error);
        } else {
          throw new Error('Failed to send message');
        }
        return;
      }

      setIsSuccess(true);
    } catch (error) {
      setError(
        'Failed to send request. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
    if (error) {
      setError('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-apple-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header - Sticky with scroll-responsive sizing */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-all duration-300">
          <div className="flex items-center justify-between p-6 group">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-lg transition-all duration-300">
                Get Your Template
              </h2>
              <p className="text-sm text-orange-600 mt-1 group-hover:text-xs transition-all duration-300">
                We'll get back to you ASAP with next steps
              </p>
              {templateTitle && (
                <p className="text-sm text-blue-600 mt-1 font-medium group-hover:text-xs transition-all duration-300 truncate">
                  Template: {templateTitle}{' '}
                  {templatePrice && `(${templatePrice})`}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0 ml-4"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Success State */}
        {isSuccess && (
          <div className="p-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Request Submitted Successfully!
            </h3>
            <p className="text-gray-600 mb-2">
              We'll contact you ASAP with payment details and next steps.
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Check your email for confirmation details.
            </p>
            <button
              onClick={() => {
                onClose();
                setIsSuccess(false);
                setValidationErrors([]);
                setError('');
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  serviceType: '',
                  launchTimeline: '',
                  message: '',
                  templateId: templateId || '',
                  templateTitle: templateTitle || '',
                  templatePrice: templatePrice || '',
                  templateUrl: templateUrl || '',
                  templateFeatured: templateFeatured || false,
                });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-apple-lg font-medium transition-colors"
            >
              Close
            </button>
          </div>
        )}

        {/* Form */}
        {!isSuccess && (
          <div className="relative">
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="p-6 space-y-5 pb-24"
            >
              {/* Validation Errors - Now at the top */}
              {validationErrors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-apple-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-red-800 mb-2">
                        Please fix the following{' '}
                        {validationErrors.length === 1 ? 'issue' : 'issues'}:
                      </h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        {validationErrors.map((error, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-red-500 mt-1">•</span>
                            <span>{error}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => setValidationErrors([])}
                      className="p-1 hover:bg-red-100 rounded-full transition-colors flex-shrink-0"
                      type="button"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              )}

              {/* Server Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-apple-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                    <button
                      onClick={() => setError('')}
                      className="p-1 hover:bg-red-100 rounded-full transition-colors flex-shrink-0"
                      type="button"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-apple-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-apple-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-apple-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Service Required *
                </label>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-apple-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="serviceType"
                      value="template-only"
                      checked={formData.serviceType === 'template-only'}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        Template Files Only
                      </div>
                      <div className="text-sm text-gray-600">
                        I'll handle the setup myself
                      </div>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-apple-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="serviceType"
                      value="full-setup"
                      checked={formData.serviceType === 'full-setup'}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        Complete Setup Service
                      </div>
                      <div className="text-sm text-gray-600">
                        Full deployment + content customization
                      </div>
                      <div className="text-xs text-orange-600 font-medium mt-1">
                        Additional fee applies
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label
                  htmlFor="launchTimeline"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Expected Launch Timeline *
                </label>
                <select
                  id="launchTimeline"
                  name="launchTimeline"
                  value={formData.launchTimeline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-apple-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                  <option value="">Select timeline</option>
                  <option value="3-6-days">3-6 days</option>
                  <option value="1-2-weeks">1-2 weeks</option>
                  <option value="2-3-weeks">2-3 weeks</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  About Your Project *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-apple-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                  placeholder="Tell us about your business, company, or project..."
                />
              </div>
            </form>

            {/* Sticky Submit Button */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-deep-glass p-6">
              <button
                type="submit"
                form="contact-form"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-3 rounded-apple-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing Request...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Request Template
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
