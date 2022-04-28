import styles from './spinning.module.css';

function Spinning({ title, width, height }) {
  return (
    <div className="flex items-center justify-center uppercase">
      <span className={`${styles.load} ${width} ${height}`}></span>
      <span className="ml-2">{title}</span>
    </div>
  );
}

export default Spinning;
