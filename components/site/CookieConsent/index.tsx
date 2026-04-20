"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/shared/Button";

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookie_consent="));

    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    document.cookie = "cookie_consent=accepted; path=/; max-age=31536000";
    setShowConsent(false);
  };

  const rejectCookies = () => {
    document.cookie = "cookie_consent=rejected; path=/; max-age=31536000";
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-base text-gray-600">
              Bu site, size en iyi deneyimi sunmak için çerezleri kullanır.
              Siteyi kullanmaya devam ederek çerez kullanımını kabul etmiş
              olursunuz.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              size="medium"
              onClick={rejectCookies}
              className="whitespace-nowrap bg-transparent !text-red-400"
            >
              Reddet
            </Button>
            <Button
              size="medium"
              color="primary"
              onClick={acceptCookies}
              className="whitespace-nowrap"
            >
              Kabul Et
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
