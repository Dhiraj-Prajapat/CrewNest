import { useMemo } from "react";
import Joyride, { Step } from "react-joyride";

const TourGuide = ({ run, onFinish }: { run: boolean; onFinish: () => void }) => {
  const steps: Step[] = useMemo(
    () => [
      {
        target: "#tour-toolbar",
        content: <p className="text-base font-bold">Here you can search for channels, members and workspaces</p>,
        placement: "right",
        disableBeacon: true,
      },
      {
        target: "#tour-main-sidebar",
        content: <p className="text-base font-bold">Here is your main sidebar.</p>,
        placement: "right",
        disableBeacon: true,
      },
      {
        target: "#tour-workspace-switcher",
        content: <p className="text-base font-bold">Here you can switch between workspaces</p>,
        placement: "right",
        disableBeacon: true,
      },
      {
        target: "#tour-workspace-sidebar",
        content: <p className="text-base font-bold">Here you can see your channels and Direct Messages user&apos;s</p>,
        placement: "right",
        disableBeacon: true,
      },
      {
        target: "#tour-content-area",
        content: <p className="text-base font-bold">This is your main Conversation area</p>,
        placement: "bottom",
        disableBeacon: true,
      },
      {
        target: "#tour-invite-people",
        content: <p className="text-base font-bold">Click here to to invite people to your workspace</p>,
        placement: "bottom",
        disableBeacon: true,
      },
    ],
    []
  );

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      disableOverlayClose
      callback={(data) => {
        const { status } = data;
        if (["finished", "skipped"].includes(status)) onFinish();
      }}
      styles={{
        options: {
          zIndex: 9999,
          primaryColor: "#6366f1", // custom color
          textColor: "#1f2937",
          backgroundColor: "#ffffff",
          arrowColor: "#ffffff",
        },
      }}
    />
  );
};

export default TourGuide;
