import AuthContent from '@/components/AuthContent';
import LoginForm from '@/components/forms/LoginForm';

export default function Login() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 h-screen'>
      {/* content */}
      <AuthContent />

      {/* Form */}
      <div className='flex  items-center justify-center'>
        <LoginForm />
      </div>
    </div>
  );
}
