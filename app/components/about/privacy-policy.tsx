'use client'

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="px-6 py-4">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-2">
        <strong className="font-semibold">Last updated:</strong> Aug 20, 2023
      </p>
      <p className="mb-4">
        This document outlines the privacy practices for mtsa-marketplace,
        inspired by OfferUp, Inc.
      </p>

      <h2 className="text-xl font-semibold mb-2">Updates:</h2>
      <p className="mb-4">
        Changes to this policy will be announced via our main webpage.
      </p>

      <h2 className="text-xl font-semibold mb-2">1. Data Collection:</h2>
      <div className="pl-5 mb-4">
        <p className="mb-1">
          <strong className="font-semibold">a.</strong> Directly from you:
          Registration, listing items, and other interactions.
        </p>
        <p className="mb-1">
          <strong className="font-semibold">b.</strong> From third parties: Data
          can be integrated from social media to enhance our services.
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-2">2. Usage of Information:</h2>
      <p className="mb-4">
        Purpose includes verification, connection, maintaining a safe
        environment, service improvement, research, promotions, etc.
      </p>

      <h2 className="text-xl font-semibold mb-2">3. Data Sharing:</h2>
      <p className="mb-4">
        Data is shared under various circumstances including public posts,
        third-party service providers, etc. De-identified data may also be
        shared.
      </p>

      <h2 className="text-xl font-semibold mb-2">4. Data Security:</h2>
      <p className="mb-4">
        Measures are taken to protect your information. No data is shared with
        third parties.
      </p>

      <h2 className="text-xl font-semibold mb-2">5. Your Choices:</h2>
      <div className="pl-5 mb-4">
        <p className="mb-1">
          <strong className="font-semibold">a.</strong> Account: You can modify
          your account. Some data may be retained as required.
        </p>
        <p className="mb-1">
          <strong className="font-semibold">b.</strong> Cookies: You can set
          your browser to refuse cookies, though this may affect some site
          functionalities.
        </p>
      </div>

      <p className="mb-4">
        This policy was drafted with reference to OfferUp, Inc. For inquiries,
        email
        <a
          href="mailto:liuyiche@umich.edu"
          className="text-blue-500 underline ml-1"
        >
          liuyiche@umich.edu
        </a>{' '}
        or
        <a
          href="mailto:whsjerryliu@gmail.com"
          className="text-blue-500 underline ml-1"
        >
          whsjerryliu@gmail.com
        </a>
        .
      </p>
    </div>
  )
}

export default PrivacyPolicy

