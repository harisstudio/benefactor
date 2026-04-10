import Link from "next/link";

export function StepShare() {
  return (
    <div className="text-center space-y-8 py-8 md:py-12">
      <div className="text-6xl animate-bounce">&#128233;</div>
      
      <div className="space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-navy">
          Submission Received!
        </h2>
        <p className="text-sm md:text-base text-text-gray max-w-md mx-auto leading-relaxed">
          Your fundraiser has been submitted to our team for review. 
          We manually verify every campaign to ensure the highest level of trust on our platform.
        </p>
      </div>

      <div className="bg-bg-off-white rounded-xl p-6 text-left max-w-md mx-auto border border-gray-100 space-y-4">
        <h3 className="text-sm font-bold text-primary-navy uppercase tracking-wider">What happens next?</h3>
        
        <ul className="space-y-4">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-yellow text-primary-navy flex items-center justify-center text-xs font-bold">1</span>
            <p className="text-sm text-text-dark">
              <strong>Team Review:</strong> Our experts will review your campaign details within 24-48 hours.
            </p>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-yellow text-primary-navy flex items-center justify-center text-xs font-bold">2</span>
            <p className="text-sm text-text-dark">
              <strong>Meeting Request:</strong> We will contact you via **email or phone** to schedule a brief introductory meeting.
            </p>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-yellow text-primary-navy flex items-center justify-center text-xs font-bold">3</span>
            <p className="text-sm text-text-dark">
              <strong>Launch:</strong> After a successful meeting, our team will officially launch your project on the platform!
            </p>
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <p className="text-xs text-text-gray leading-relaxed max-w-xs mx-auto">
          You can track your submission status, review feedback, and view donations (once launched) in your profile.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-8 rounded-btn font-bold bg-primary-yellow text-primary-navy hover:brightness-110 shadow-sm transition-all text-sm"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-8 rounded-btn font-bold border border-gray-200 text-text-dark hover:bg-white transition-all text-sm"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
