import styles from "./RoudedImage.module.css";

const RoudedImage = ({ src, alt, width }) => {
  return (
    <img
      className={`${styles.rouded_image} ${styles[width]}`}
      src={src}
      alt={alt}
    />
  );
};

export default RoudedImage;
