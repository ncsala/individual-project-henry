import React from 'react';
import defaultRecipeImg from '../../assets/cooking.png';
import styles from './PrintsImage.module.css';

function PrintsImage({ image, name }) {
	return (
        <div className={styles.img_container}>
			{!image ? (
				<img src={defaultRecipeImg} alt='Imagen predeterminada' className={styles.img} />
			) : (
				<img src={image} alt={'Imagen receta de ' + name} className={styles.img} />
			)}
		</div>
	);
}

export default PrintsImage;
