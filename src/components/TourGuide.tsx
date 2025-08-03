import { useMemo } from "react";
import Joyride, { Step } from "react-joyride";

const TourGuide = ({
  run,
  onFinish,
}: {
  run: boolean;
  onFinish: () => void;
}) => {
  const steps: Step[] = useMemo(
    () => [
      {
        target: "#tour-toolbar",
        content: (
          <p className="text-base font-bold">
            Locate what you need using the search bar — members, workspaces, or
            channels.
          </p>
        ),
        placement: "right",
        disableBeacon: true,
      },
      {
        target: "#tour-main-sidebar",
        content: (
          <p className="text-base font-bold">
            The main sidebar lets you explore and manage your workspace.
          </p>
        ),
        placement: "right",
        disableBeacon: true,
      },
      {
        target: "#tour-workspace-switcher",
        content: (
          <p className="text-base font-bold">
            Access all your workspaces in one place — right here.
          </p>
        ),
        placement: "right",
        disableBeacon: true,
      },
      {
        target: "#tour-workspace-sidebar",
        content: (
          <p className="text-base font-bold">
            All your conversations and groups are listed here.
          </p>
        ),
        placement: "right",
        disableBeacon: true,
      },
      {
        target: "#tour-content-area",
        content: (
          <p className="text-base font-bold">
            Your ongoing communication will be displayed in this space.
          </p>
        ),
        placement: "bottom",
        disableBeacon: true,
      },
      {
        target: "#tour-invite-people",
        content: (
          <p className="text-base font-bold">
            Build your workspace community — start by inviting users.
          </p>
        ),
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
      disableOverlayClose={true}
      hideCloseButton={true}
      callback={(data) => {
        const { status } = data;
        if (["finished", "skipped"].includes(status)) onFinish();
      }}
      styles={{
        options: {
          zIndex: 9999,
          primaryColor: "#004030",
          textColor: "#1f2937",
          backgroundColor: "#f2f0eb",
          arrowColor: "#f2f0eb",
          overlayColor: "rgba(0, 0, 0, 0.8)",
        },
      }}
      locale={{
        back: "Back",
        close: "Exit",
        last: "Exit", // 👈 this will label the final button as "Exit"
        next: "Next",
        skip: "Skip",
      }}
    />
  );
};

export default TourGuide;
