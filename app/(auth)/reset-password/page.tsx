import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Reset Password - Clear Mind Life",
  description: "Reset your Clear Mind Life account password.",
};

/**
 * Clerk's <SignIn> component includes a built-in "Forgot password?" flow.
 * We render it here so users who land on /reset-password get the full
 * Clerk-hosted reset experience, styled to match the rest of the auth pages.
 */
export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
          Reset your password
        </h1>
        <p className="text-gray-500 font-medium">
          Enter your email and we&apos;ll send a reset link.
        </p>
      </div>

      <SignIn
        appearance={{
          elements: {
            footer: "hidden",
            card: "shadow-none border-0 p-0 bg-transparent",
            headerTitle: "hidden",
            headerSubtitle: "hidden",
            formFieldInput:
              "form-input w-full rounded-xl border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 py-3 px-4 text-base font-medium",
            formFieldLabel: "text-sm font-semibold text-gray-700 mb-1",
            formButtonPrimary:
              "btn w-full bg-gray-900 hover:bg-black text-white font-bold rounded-xl py-3 text-base shadow-lg transition-all",
            socialButtonsBlockButton: "hidden",
            dividerRow: "hidden",
            footerActionLink: "text-blue-600 font-semibold hover:text-blue-700",
            formFieldErrorText: "text-rose-600 text-sm font-medium mt-1",
            rootBox: "w-full",
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
        signUpUrl="/signup"
      />

      <p className="mt-6 text-center text-sm text-gray-500">
        Remember your password?{" "}
        <a href="/signin" className="font-semibold text-blue-600 hover:text-blue-700">
          Sign in
        </a>
      </p>
    </div>
  );
}
