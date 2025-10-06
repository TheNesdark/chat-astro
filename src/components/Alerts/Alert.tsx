
import '@/styles/components/alerts/Alert.css';
import type { AlertProps } from '@/types';

export default function Alert({ message, type = 'info' }: AlertProps) {  

  return (
    <div className={`alert alert-${type}`} role="alert">
      {message}
    </div>
  );
}