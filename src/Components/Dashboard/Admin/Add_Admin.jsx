import { useState } from 'react';
import StepOneRegister from './StepOneRegister';
import StepTwoPassword from './StepTwoPassword';
// import StepThreeVerify from './StepThreeVerify';


export default function AddAdmin() {
  const [step, setStep] = useState(1);
  const [adminData, setAdminData] = useState({});

  return (
    <>
      {step === 1 && (
        <StepOneRegister
          onNext={(data) => {
            setAdminData((prev) => ({ ...prev, ...data }));
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <StepTwoPassword
          adminData={adminData}
          onNext={(data) => {
            setAdminData((prev) => ({ ...prev, ...data }));
            setStep(3);
          }}
        />
      )}

      {/* {step === 3 && (
        <StepThreeVerify
          adminData={adminData}
          onFinish={(data) => {
            setAdminData((prev) => ({ ...prev, ...data }));
          }}
        />
      )} */}
    </>
  );
}
