"use client";

import { useReducer, useCallback } from "react";
import { StartSidebar } from "@/components/layout/start-sidebar";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StepCategory } from "./step-category";
import { StepBeneficiary } from "./step-beneficiary";
import { StepGoal } from "./step-goal";
import { StepMedia } from "./step-media";
import { StepStory } from "./step-story";
import { StepReview } from "./step-review";
import { StepShare } from "./step-share";
import Link from "next/link";

interface WizardState {
  currentStep: number;
  country: string;
  postcode: string;
  category: string;
  beneficiary: "yourself" | "someone" | "charity" | "";
  goalAmount: string;
  autoGoal: boolean;
  coverImage: string | null;
  title: string;
  story: string;
  email: string;
  phone: string;
}

type WizardAction =
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "GO_TO"; payload: number }
  | { type: "SET_COUNTRY"; payload: string }
  | { type: "SET_POSTCODE"; payload: string }
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_BENEFICIARY"; payload: WizardState["beneficiary"] }
  | { type: "SET_GOAL"; payload: string }
  | { type: "TOGGLE_AUTO_GOAL" }
  | { type: "SET_COVER"; payload: string | null }
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_STORY"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PHONE"; payload: string };

function reducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case "NEXT":
      return { ...state, currentStep: Math.min(6, state.currentStep + 1) };
    case "PREV":
      return { ...state, currentStep: Math.max(0, state.currentStep - 1) };
    case "GO_TO":
      return { ...state, currentStep: action.payload };
    case "SET_COUNTRY":
      return { ...state, country: action.payload };
    case "SET_POSTCODE":
      return { ...state, postcode: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: state.category === action.payload ? "" : action.payload };
    case "SET_BENEFICIARY":
      return { ...state, beneficiary: action.payload };
    case "SET_GOAL":
      return { ...state, goalAmount: action.payload };
    case "TOGGLE_AUTO_GOAL":
      return { ...state, autoGoal: !state.autoGoal };
    case "SET_COVER":
      return { ...state, coverImage: action.payload };
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_STORY":
      return { ...state, story: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PHONE":
      return { ...state, phone: action.payload };
  }
}

const initialState: WizardState = {
  currentStep: 0,
  country: "UK",
  postcode: "",
  category: "",
  beneficiary: "",
  goalAmount: "",
  autoGoal: true,
  coverImage: null,
  title: "",
  story: "",
  email: "",
  phone: "",
};

const stepTitles = [
  "Let's begin your fundraising journey",
  "Who will benefit from the funds?",
  "Set your fundraising goal",
  "Make your fundraiser stand out",
  "Tell potential donors your story",
  "Submit for review",
  "Your project is being reviewed!",
];

const stepSubtitles = [
  "We're here to guide you every step of the way.",
  "Let us know who the funds are intended for.",
  "You can always change this later. We'll help you along the way.",
  "A great photo or video can make all the difference.",
  "A compelling story will help you connect with donors.",
  "Enter your contact details and submit for approval.",
  "",
];

function canContinue(state: WizardState): boolean {
  switch (state.currentStep) {
    case 0: return state.category !== "";
    case 1: return state.beneficiary !== "";
    case 2: return state.goalAmount !== "";
    case 3: return true; // media is optional
    case 4: return state.title !== "" && state.story !== "";
    case 5: return state.email !== "" && state.phone !== "";
    default: return true;
  }
}

export function CampaignWizard() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const next = useCallback(() => dispatch({ type: "NEXT" }), []);
  const prev = useCallback(() => dispatch({ type: "PREV" }), []);
  const goTo = useCallback((step: number) => dispatch({ type: "GO_TO", payload: step }), []);

  const progress = state.currentStep <= 5
    ? ((state.currentStep + 1) / 6) * 100
    : 100;

  return (
    <>
      {/* Left sidebar */}
      <StartSidebar
        currentStep={state.currentStep}
        totalSteps={5}
        title={stepTitles[state.currentStep]}
        subtitle={stepSubtitles[state.currentStep]}
      />

      {/* Right content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <div className="flex justify-end p-5">
          <Link href="/signin" className="text-sm text-text-gray hover:text-text-dark transition-colors min-h-[44px] flex items-center">
            Sign in
          </Link>
        </div>

        {/* Step content */}
        <div className="flex-1 flex items-start justify-center px-5 pb-24">
          <div className="w-full max-w-[560px]">
            {/* Mobile title (visible on smaller screens) */}
            <div className="lg:hidden mb-6">
              <h1 className="text-xl font-bold text-primary-navy">
                {stepTitles[state.currentStep]}
              </h1>
              <p className="text-sm text-text-gray mt-1">
                {stepSubtitles[state.currentStep]}
              </p>
            </div>

            {state.currentStep === 0 && (
              <StepCategory
                country={state.country}
                postcode={state.postcode}
                category={state.category}
                onCountryChange={(v) => dispatch({ type: "SET_COUNTRY", payload: v })}
                onPostcodeChange={(v) => dispatch({ type: "SET_POSTCODE", payload: v })}
                onCategoryChange={(v) => dispatch({ type: "SET_CATEGORY", payload: v })}
              />
            )}
            {state.currentStep === 1 && (
              <StepBeneficiary
                selected={state.beneficiary}
                onSelect={(v) => dispatch({ type: "SET_BENEFICIARY", payload: v })}
              />
            )}
            {state.currentStep === 2 && (
              <StepGoal
                amount={state.goalAmount}
                autoGoal={state.autoGoal}
                onAmountChange={(v) => dispatch({ type: "SET_GOAL", payload: v })}
                onAutoGoalToggle={() => dispatch({ type: "TOGGLE_AUTO_GOAL" })}
              />
            )}
            {state.currentStep === 3 && (
              <StepMedia
                coverImage={state.coverImage}
                onImageChange={(v) => dispatch({ type: "SET_COVER", payload: v })}
              />
            )}
            {state.currentStep === 4 && (
              <StepStory
                title={state.title}
                story={state.story}
                onTitleChange={(v) => dispatch({ type: "SET_TITLE", payload: v })}
                onStoryChange={(v) => dispatch({ type: "SET_STORY", payload: v })}
              />
            )}
            {state.currentStep === 5 && (
              <StepReview
                state={state}
                onEdit={goTo}
                onLaunch={next}
                onEmailChange={(v) => dispatch({ type: "SET_EMAIL", payload: v })}
                onPhoneChange={(v) => dispatch({ type: "SET_PHONE", payload: v })}
              />
            )}
            {state.currentStep === 6 && <StepShare />}
          </div>
        </div>

        {/* Bottom bar */}
        {state.currentStep < 6 && (
          <div className="fixed bottom-0 left-0 right-0 lg:left-[38%] bg-white border-t border-gray-200 px-5 py-3 z-40">
            <ProgressBar percent={progress} className="mb-3" />
            <div className="flex items-center justify-between max-w-[560px] mx-auto">
              {state.currentStep > 0 ? (
                <button
                  onClick={prev}
                  className="text-sm font-medium text-text-dark hover:text-primary-navy min-h-[44px]"
                >
                  &larr;
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-3">
                {state.currentStep === 3 && (
                  <button
                    onClick={next}
                    className="text-sm font-medium text-text-gray hover:text-text-dark min-h-[44px]"
                  >
                    Skip for now
                  </button>
                )}
                <button
                  onClick={next}
                  disabled={!canContinue(state)}
                  className="h-11 px-6 rounded-btn font-bold text-sm bg-primary-yellow text-primary-navy disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition-all min-w-[44px]"
                >
                  {state.currentStep === 4 ? "Review" : state.currentStep === 5 ? "Submit to Review" : "Continue"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
