
import style from '@styles/Alert.module.css';
import type { AlertProps } from '@/types';

export default function Alert({ message, type = 'info' }: AlertProps) {  

  return (
    <div className={style.alert + ' ' + style[type]} role="alert">
      {message}
    </div>
  );
}