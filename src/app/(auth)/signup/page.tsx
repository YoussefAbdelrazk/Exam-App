import AuthContent from '@/components/AuthContent';
import SignupForm from '@/components/forms/SignupForm';

export default function Signup() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 h-screen'>
      {/* content */}
      <AuthContent />

      {/* Form */}
      <div className='flex  items-center justify-center'>
        <SignupForm />
      </div>
    </div>
  );
}
