import React, { useState, useEffect } from 'react';
import { useUI } from '../../context/useUI';
import TopNavProgress from './TopNavProgress';
import Step1Taxonomy from './Step1Taxonomy';
import StepTwoCore from './StepTwoCore';
import StepThreeDynamic from './StepThreeDynamic';
import StepFourTerms from './StepFourTerms';
import StepFiveCommission from './StepFiveCommission';
import StepSixPreview, { SuccessScreen } from './StepSixPreview';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const TOTAL_STEPS = 6;
const DEFAULT_FORM_DATA = {
  // Step 1
  category: '',
  subCategory: '',
  subSubCategory: '',
  // Step 2
  title: '',
  shortDescription: '',
  detailedDescription: '',
  images: [],
  coverImageIndex: 0,
  pricingType: 'fixed',
  singlePrice: '',
  packages: [
    { tier: 'Basic', price: '', features: '' },
    { tier: 'Standard', price: '', features: '' },
    { tier: 'Premium', price: '', features: '' },
  ],
  // Step 3 (Dynamic)
  allowNegotiation: false,
  condition: 'New',
  assetCredentials: '',
  requiredDocuments: [],
  requireBooking: false,
  eventDate: '',
  eventTime: '',
  venue: '',
  totalPasses: '',
  // Step 4 (Terms)
  customTerms: [],
  // Step 5 (Commission)
  allowAgents: false,
  commissionPct: '',
};

const getInitialFormData = () => {
  const draft = localStorage.getItem('listingDraft');
  if (!draft) return DEFAULT_FORM_DATA;
  try {
    return { ...DEFAULT_FORM_DATA, ...JSON.parse(draft) };
  } catch {
    return DEFAULT_FORM_DATA;
  }
};

const CreateListingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState({});
  const [isPublished, setIsPublished] = useState(false);
  const { addToast } = useUI();

  const [formData, setFormData] = useState(() => getInitialFormData());

  // Scroll to top when opening wizard.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSaveDraft = () => {
    // Omit blob images from draft
    const draftData = { ...formData, images: [] };
    localStorage.setItem('listingDraft', JSON.stringify(draftData));
    addToast('Draft saved successfully', 'success');
  };

  const validateStep = (step) => {
    const errors = {};
    if (step === 1) {
      if (!formData.category) errors.category = 'Category is required';
      if (!formData.subCategory) errors.subCategory = 'Subcategory is required';
    } else if (step === 2) {
      if (!formData.title.trim()) errors.title = 'Title is required';
      if (!formData.shortDescription.trim()) errors.shortDescription = 'Short description is required';
      if (!formData.detailedDescription.trim()) errors.detailedDescription = 'Detailed description is required';
      if (formData.category === 'services') {
        if (!formData.packages[0].price && !formData.packages[1].price && !formData.packages[2].price) {
          errors.packages = 'At least one package price is required';
        }
      } else {
        if (!formData.singlePrice) errors.singlePrice = 'Price is required';
      }
    } else if (step === 3) {
      if (formData.category === 'digital-assets' && !formData.assetCredentials.trim()) {
        errors.assetCredentials = 'Asset credentials are required';
      }
      if (formData.category === 'events') {
        if (!formData.eventDate) errors.eventDate = 'Event date is required';
        if (!formData.eventTime) errors.eventTime = 'Event time is required';
        if (!formData.venue.trim()) errors.venue = 'Venue is required';
        if (!formData.totalPasses) errors.totalPasses = 'Total passes is required';
      }
    }
    return errors;
  };

  const handleNext = () => {
    const errors = validateStep(currentStep);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      addToast('Please fill all required fields', 'error');
    } else {
      setValidationErrors({});
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePublish = () => {
    localStorage.removeItem('listingDraft');
    setIsPublished(true);
  };

  const isNextDisabled = () => {
    if (currentStep === 1) return !formData.category || !formData.subCategory;
    return false;
  };

  // Show success screen upon publish
  if (isPublished) return <SuccessScreen />;

  const isLastStep = currentStep === TOTAL_STEPS;

  return (
    <div className="min-h-screen bg-[#fcfdfa] font-body flex flex-col z-[100] fixed inset-0 overflow-y-auto">
      <TopNavProgress currentStep={currentStep} setCurrentStep={setCurrentStep} />

      <div className="flex-1 max-w-5xl mx-auto w-full p-4 md:p-6 pb-32">
        {currentStep === 1 && (
          <Step1Taxonomy
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {currentStep === 2 && (
          <StepTwoCore
            formData={formData}
            setFormData={setFormData}
            errors={validationErrors}
            setErrors={setValidationErrors}
          />
        )}
        {currentStep === 3 && (
          <StepThreeDynamic
            formData={formData}
            setFormData={setFormData}
            errors={validationErrors}
            setErrors={setValidationErrors}
          />
        )}
        {currentStep === 4 && (
          <StepFourTerms
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {currentStep === 5 && (
          <StepFiveCommission
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {currentStep === 6 && (
          <StepSixPreview
            formData={formData}
            onPublish={handlePublish}
          />
        )}
      </div>

      {/* Fixed Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-surface-container py-4 flex justify-center shadow-[0_-10px_20px_rgba(48,51,49,0.02)]">
        <div className="w-full max-w-5xl px-6 flex justify-between items-center relative">
          <Link
            to="/"
            className="text-on-surface hover:text-primary transition-colors text-sm font-bold flex items-center gap-1 absolute left-6 border border-outline-variant/20 px-3 py-1.5 rounded-lg bg-surface"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
            Exit
          </Link>

          <Button
            variant="outline"
            onClick={handleSaveDraft}
            className="mx-auto hidden md:inline-flex bg-surface"
          >
            Save as Draft
          </Button>

          <div className="flex gap-4 ml-auto lg:absolute lg:right-6">
            {currentStep > 1 && (
              <Button variant="ghost" onClick={() => setCurrentStep(prev => prev - 1)}>
                Back
              </Button>
            )}
            {isLastStep ? (
              <Button
                variant="primary"
                size="lg"
                onClick={handlePublish}
                className="gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                Publish Listing
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                disabled={isNextDisabled()}
                onClick={handleNext}
              >
                Continue to Step {currentStep + 1}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListingWizard;

