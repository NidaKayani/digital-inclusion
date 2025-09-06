export default function OfferSection() {
  return (
    <section className="container mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
        What We Offer
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <div className="p-10 rounded-3xl text-center offer-card-hero flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-gray-200 mb-4"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-label="Learning Modules Icon"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <h3 className="font-bold text-3xl text-white">Learning Modules</h3>
          <p className="mt-4 text-gray-200 text-lg max-w-sm">
            Engaging, interactive lessons on core subjects designed for all
            skill levels, dynamically delivered to any device.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-1">
          <div className="p-8 rounded-3xl offer-card text-center flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-blue-500 mb-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-label="Progress Tracking Icon"
            >
              <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM12 12V3"></path>
              <path d="M12 20v-8"></path>
              <path d="M16 16L12 12"></path>
            </svg>
            <h3 className="font-bold text-xl text-gray-900">
              Progress Tracking
            </h3>
            <p className="mt-2 text-gray-600">
              Visualize student progress and mastery with simple, intuitive
              dashboards and charts.
            </p>
          </div>
          <div className="p-8 rounded-3xl offer-card-agentic text-center flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-cyan-500 mb-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-label="Agentic Feedback Icon"
            >
              <path d="M20.5 4.5c-.7 0-1.5.1-2.2.3-.6.2-1.2.4-1.8.7l-.4.2c-.3.1-.5.3-.8.4-.2.1-.5.2-.7.3-.3.1-.6.2-.9.2-.4 0-.8-.1-1.2-.2-.2-.1-.5-.2-.7-.3-.3-.1-.5-.3-.8-.4-.6-.3-1.2-.5-1.8-.7-.7-.2-1.5-.3-2.2-.3-1.1 0-2.1.2-3.1.5C3.3 5.4 2 6.6 2 8c0 1.4 1.3 2.6 3.1 3.5.7.3 1.5.5 2.2.7.6.2 1.2.4 1.8.7.3.1.5.3.8.4.2.1.5.2.7.3.3.1.6.2.9.2.4 0 .8-.1 1.2-.2.2-.1.5-.2.7-.3.3-.1.5-.3.8-.4.6-.3 1.2-.5 1.8-.7.7-.2 1.5-.3 2.2-.3 1.1 0 2.1.2 3.1.5 1.8.9 3.1 2.1 3.1 3.5 0-1.4-1.3-2.6-3.1-3.5-.7-.3-1.5-.5-2.2-.7-.6-.2-1.2-.4-1.8-.7-.3-.1-.5-.3-.8-.4-.2-.1-.5-.2-.7-.3-.3-.1-.6-.2-.9-.2-.4 0-.8.1-1.2.2-.2.1-.5.2-.7.3-.3.1-.5.3-.8.4-.6.3-1.2.5-1.8.7-.7.2-1.5.3-2.2.3-1.1 0-2.1-.2-3.1-.5C3.3 18.6 2 17.4 2 16c0 1.4 1.3 2.6 3.1 3.5.7.3 1.5.5 2.2.7.6.2 1.2.4 1.8.7.3.1.5.3.8.4.2.1.5.2.7.3.3.1.6.2.9.2.4 0 .8-.1 1.2-.2.2-.1.5-.2.7-.3.3-.1.5-.3.8-.4.6-.3 1.2-.5 1.8-.7.7-.2 1.5-.3 2.2-.3 1.1 0 2.1-.2 3.1-.5 1.8-.9 3.1-2.1 3.1-3.5s-1.3-2.6-3.1-3.5c-.7-.3-1.5-.5-2.2-.7-.6-.2-1.2-.4-1.8-.7-.3-.1-.5-.3-.8-.4-.2-.1-.5-.2-.7-.3-.3-.1-.6-.2-.9-.2-.4 0-.8.1-1.2.2-.2.1-.5.2-.7.3-.3.1-.5.3-.8.4-.6.3-1.2.5-1.8.7-.7.2-1.5.3-2.2.3-1.1 0-2.1-.2-3.1-.5C3.3 11.4 2 10.2 2 8.8"></path>
            </svg>
            <h3 className="font-bold text-xl text-gray-900">
              Agentic Feedback
            </h3>
            <p className="mt-2 text-gray-600">
              Receive personalized, AI-powered feedback on assignments and
              learning activities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
