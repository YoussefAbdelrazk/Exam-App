import AuthContent from '@/components/AuthContent';
import ForgotForm from '@/components/forms/forgotpassword/ForgotForm';

export default function ForgetPassword() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 h-screen'>
      {/* content */}
      <AuthContent />

      {/* Form */}
      <div className='flex items-center justify-center p-8'>
        <ForgotForm />
      </div>
    </div>
  );
}
