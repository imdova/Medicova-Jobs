import React, { useState, useEffect } from "react";

type ResendEmailTimerProps = {
  initialTime?: number;
  onResend: () => void;
};

const ResendEmailTimer: React.FC<ResendEmailTimerProps> = ({
  initialTime = 30,
  onResend,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);
  const [isClickable, setIsClickable] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    } else {
      setIsClickable(true);
    }
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleResend = () => {
    if (isClickable) {
      onResend(); // Callback function when resend is triggered
      setTimeLeft(initialTime); // Reset timer
      setIsClickable(false);
    }
  };

  return (
    <div>
      <p className="mt-2 text-center  text-secondary">
        {isClickable ? (
          <span
            className="text-light-primary underline hover:no-underline cursor-pointer"
            onClick={handleResend}
          >
            Don&apos;t receive the email? Click here to send again.
          </span>
        ) : (
          <span>
            Don&apos;t receive the email? Resend available in {timeLeft} second
            {timeLeft !== 1 && "s"}.
          </span>
        )}
      </p>
    </div>
  );
};

export default ResendEmailTimer;

// Example usage:
// import ResendEmailTimer from './ResendEmailTimer';
// const App: React.FC = () => {
//   const resendEmail = () => {
//     console.log('Resend email triggered!');
//   };
//   return <ResendEmailTimer initialTime={30} onResend={resendEmail} />;
// };
