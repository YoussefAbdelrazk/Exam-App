import { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

export default function StepsGroup() {
  const [step, setStep] = useState(1);
  const onReset = () => {
    setStep(1);
  };
  return (
    <div>
      <Step1 setStep={setStep} />
      <Step2 setStep={setStep} />
      <Step3 onReset={onReset} />
    </div>
  );
}
