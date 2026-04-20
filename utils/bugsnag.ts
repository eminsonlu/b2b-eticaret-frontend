"use client";

import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";
import React from "react";

Bugsnag.start({
  apiKey: process.env.NEXT_PUBLIC_BUGSNAG_API_KEY || "",
  plugins: [new BugsnagPluginReact(React)],
  releaseStage: process.env.NODE_ENV,
  enabledReleaseStages: ["production"],
});

export const ErrorBoundary =
  Bugsnag.getPlugin("react")?.createErrorBoundary(React) || React.Fragment;

export const notify = (error: Error, metadata?: Record<string, any>) => {
  return Bugsnag.notify(error, (event) => {
    if (metadata) {
      event.addMetadata("custom", metadata);
    }
  });
};

export default Bugsnag;
