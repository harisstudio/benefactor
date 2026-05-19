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
import Image from "next/image";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";
import { authClient } from "@/lib/auth-client";

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
  const { t } = useLanguage();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data: session } = authClient.useSession();

  const stepTitles = [
    t("wizardStepTitle0"),
    t("wizardStepTitle1"),
    t("wizardStepTitle2"),
    t("wizardStepTitle3"),
    t("wizardStepTitle4"),
    t("wizardStepTitle5"),
    t("wizardStepTitle6"),
  ];
  const stepSubtitles = [
    t("wizardStepSubtitle0"),
    t("wizardStepSubtitle1"),
    t("wizardStepSubtitle2"),
    t("wizardStepSubtitle3"),
    t("wizardStepSubtitle4"),
    t("wizardStepSubtitle5"),
    t("wizardStepSubtitle6"),
  ];

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
      <div className="flex-1 flex flex-col min-h-screen bg-white">
        {/* Header */}
        <div className="flex justify-between items-center px-5 sm:px-8 py-5 border-b border-surface-muted lg:border-b-0">
          <Link href="/" className="lg:hidden flex items-center">
            <Image src="/assets/logo.svg" alt="Benefactor" width={120} height={24} className="h-auto w-[110px]" priority />
          </Link>
          <div className="hidden lg:block" />
          {session ? (
            <Link
              href="/profile"
              className="text-[13px] font-semibold text-text-gray hover:text-primary-navy transition-colors min-h-[44px] flex items-center"
            >
              {session.user.name || t("navProfile")}
            </Link>
          ) : (
            <Link
              href="/signin"
              className="text-[13px] font-semibold text-text-gray hover:text-primary-navy transition-colors min-h-[44px] flex items-center"
            >
              {t("signin")}
            </Link>
          )}
        </div>

        {/* Step content */}
        <div className="flex-1 flex items-start justify-center px-5 sm:px-8 pt-8 pb-28">
          <div className="w-full max-w-[560px]">
            {/* Mobile title */}
            <div className="lg:hidden mb-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-gray mb-2">
                {t("wizardStepOf", { current: Math.min(state.currentStep + 1, 6), total: 6 })}
              </p>
              <h1 className="font-heading text-[26px] font-extrabold text-primary-navy leading-tight tracking-[-0.01em]">
                {stepTitles[state.currentStep]}
              </h1>
              <p className="text-[14px] text-text-gray mt-2">
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
          <div className="fixed bottom-0 left-0 right-0 lg:left-[38%] bg-white/95 backdrop-blur border-t border-surface-muted px-5 sm:px-8 py-4 z-40">
            <div className="max-w-[560px] mx-auto">
              <div className="h-1 bg-surface-muted rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-primary-yellow rounded-full transition-[width] duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                {state.currentStep > 0 ? (
                  <button
                    onClick={prev}
                    className="inline-flex items-center gap-1.5 h-11 px-3 text-[14px] font-semibold text-text-gray hover:text-primary-navy transition-colors"
                  >
                    <IconArrowLeft size={16} />
                    {t("wizardBack")}
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-3">
                  {state.currentStep === 3 && (
                    <button
                      onClick={next}
                      className="h-11 px-3 text-[14px] font-semibold text-text-gray hover:text-primary-navy transition-colors"
                    >
                      {t("wizardSkip")}
                    </button>
                  )}
                  <button
                    onClick={next}
                    disabled={!canContinue(state)}
                    className="inline-flex items-center gap-1.5 h-11 px-6 rounded-[100px] font-bold text-[14px] bg-primary-yellow text-primary-navy shadow-md hover:bg-primary-yellow-hover hover:shadow-lg active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all"
                  >
                    {state.currentStep === 4 ? t("wizardReview") : state.currentStep === 5 ? t("wizardSubmit") : t("wizardContinue")}
                    <IconArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
