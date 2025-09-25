import style from '@styles/Alert.module.css';
export default function Alert({ message, type = 'info' }) {  

  return (
    <div className={style.alert + ' ' + style[type]} role="alert">
      {message}
    </div>
  );
}