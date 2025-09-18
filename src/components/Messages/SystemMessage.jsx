import style from "@styles/SystemMessage.module.css";

export default function SystemMessage({ message }) {
  return (
    <div className={style.message}>
      {message.message}
    </div>
  );
}