import Link from "next/link";

export const metadata = {
  title: "Get a Demo - Clear Mind Life",
  description: "Request a custom demo of the Clear Mind Life platform.",
};

export default function SignUp() {
  return (
    <>
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-3">See it in action.</h1>
        <p className="text-gray-600 text-lg">
          Tell us a bit about your workflow, and we'll configure a tailored walkthrough of the Clear Mind Life engine.
        </p>
      </div>
      {/* Form */}
      <form>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="mb-1 block text-sm font-medium text-gray-700"
                htmlFor="firstName"
              >
                First name
              </label>
              <input
                id="firstName"
                className="form-input w-full py-2"
                type="text"
                placeholder="Corey"
                required
              />
            </div>
            <div>
              <label
                className="mb-1 block text-sm font-medium text-gray-700"
                htmlFor="lastName"
              >
                Last name
              </label>
              <input
                id="lastName"
                className="form-input w-full py-2"
                type="text"
                placeholder="Barker"
                required
              />
            </div>
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Work Email
            </label>
            <input
              id="email"
              className="form-input w-full py-2"
              type="email"
              placeholder="corey@clinic.com"
              required
            />
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="company"
            >
              Company / Clinic Name
            </label>
            <input
              id="company"
              className="form-input w-full py-2"
              type="text"
              placeholder="Clear Mind Clinic"
              required
            />
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="context"
            >
              What is your biggest administrative bottleneck?
            </label>
            <textarea
              id="context"
              className="form-input w-full py-2 h-24 resize-none"
              placeholder="E.g., We spend 20 hours a week chasing down prior authorizations..."
              required
            ></textarea>
          </div>
        </div>
        <div className="mt-6">
          <button className="btn w-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30 transition-all font-semibold rounded-xl py-3">
            Request Custom Demo
          </button>
        </div>
      </form>

      {/* Bottom link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Already have access?{" "}
          <Link
            className="font-medium text-blue-600 underline hover:no-underline"
            href="/signin"
          >
            Launch Command Center
          </Link>
        </p>
      </div>
    </>
  );
}
