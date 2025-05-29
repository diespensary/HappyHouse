import React from 'react'
import styles from './present.module.css'

function Presentation() {
	return (
		// <section className='pres'>
			<section className={`${styles.block}`}>
				<div className={`${styles.presentation}`}>
					<span className={`${styles.span}`}>Товары для вашего дома</span>
					<p className={`${styles.p}`}>по низким ценам</p>
				</div>
			</section>
		
		// </section>

	)
}

export default Presentation
