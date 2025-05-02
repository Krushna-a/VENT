import React, { useState, useContext } from "react";
import Hack1 from "./hackathonComp/Hack1";
import Hack2 from "./hackathonComp/Hack2";
import Hack3 from "./hackathonComp/Hack3";
import Hack4 from "./hackathonComp/Hack4";
import { HackContext } from "../../context/HackContext";
import axios from "axios";

const HostHack = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);

 
 const {
    title,
    description,
    location,
    organisedBy,
    customLocation,
    startDate,
    endDate,
    registrationDeadline,
    eligibility,
    teamSize,
    maxTeamSize,
    bannerImage,
    prizes,
    timeline,
    website,
    contactEmail,
    rules,
  } = useContext(HackContext);

  const dataToSend = {
    title,
    description,
    location,
    organisedBy,
    customLocation,
    startDate,
    endDate,
    registrationDeadline,
    eligibility,
    teamSize,
    maxTeamSize,
    bannerImage,
    prizes,
    timeline,
    website,
    contactEmail,
    rules,
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/hack/new",
        dataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Hackathon added:", res.data);
    } catch (error) {
      console.error("Error submitting hackathon:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Host Your Hackathon
          </h1>
          <p className="mt-2 text-gray-600">
            Fill out the form below to create your hackathon event
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                <span className="mt-2 text-sm text-gray-600">
                  {step === 1 && "Basic Info"}
                  {step === 2 && "Details"}
                  {step === 3 && "Prizes"}
                  {step === 4 && "Review"}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
              <div
                className="h-1 bg-blue-600 transition-all duration-300"
                style={{ width: `${(currentStep - 1) * 33.33}%` }}
              ></div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {currentStep === 1 && <Hack1 />}
          {currentStep === 2 && <Hack2 />}
          {currentStep === 3 && <Hack3 />}
          {currentStep === 4 && <Hack4 />}

          <div className="mt-8 flex justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 border border-transparent shadow-sm text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 border border-transparent shadow-sm text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Hackathon"
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default HostHack;
