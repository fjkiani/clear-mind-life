import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Get Access - Clear Mind Life",
  description: "Create your Clear Mind Life account and start recovering revenue.",
};

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
          Get started
        </h1>
        <p className="text-gray-500 font-medium">
          Create your Clear Mind Life account
        </p>
      </div>

      <SignUp
        appearance={{
          elements: {
            // Hide Clerk branding
            footer: "hidden",
            // Card styling
            card: "shadow-none border-0 p-0 bg-transparent",
            // Header — hide Clerk's own header since we have ours above
            headerTitle: "hidden",
            headerSubtitle: "hidden",
            // Form inputs
            formFieldInput:
              "form-input w-full rounded-xl border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 py-3 px-4 text-base font-medium",
            formFieldLabel: "text-sm font-semibold text-gray-700 mb-1",
            // Primary button
            formButtonPrimary:
              "btn w-full bg-gray-900 hover:bg-black text-white font-bold rounded-xl py-3 text-base shadow-lg transition-all",
            // Social buttons
            socialButtonsBlockButton:
              "w-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl py-3 text-sm transition-all shadow-sm",
            socialButtonsBlockButtonText: "font-semibold text-gray-700",
            // Divider
            dividerLine: "bg-gray-200",
            dividerText: "text-gray-400 text-sm font-medium",
            // Links
            footerActionLink: "text-blue-600 font-semibold hover:text-blue-700",
            identityPreviewEditButton: "text-blue-600 font-semibold",
            // Error
            formFieldErrorText: "text-rose-600 text-sm font-medium mt-1",
            // Internal card
            rootBox: "w-full",
          },
          layout: {
            socialButtonsPlacement: "top",
            showOptionalFields: false,
          },
          variables: {
            colorPrimary: "#111827",
            colorText: "#111827",
            colorTextSecondary: "#6b7280",
            colorBackground: "#ffffff",
            colorInputBackground: "#ffffff",
            colorInputText: "#111827",
            borderRadius: "0.75rem",
            fontFamily: "Inter, sans-serif",
          },
        }}
        fallbackRedirectUrl="/dashboard"
        signInUrl="/signin"
      />

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <a href="/signin" className="font-semibold text-blue-600 hover:text-blue-700">
          Sign in
        </a>
      </p>
    </div>
  );
}
