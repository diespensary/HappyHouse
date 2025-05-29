import React from 'react'
import styles from './Bg_block.module.css'

function Bg_block({header, children}) {
	return (
		// <div className='container bg-block'>
		<div className={`${styles.bg_block} container`}>
			<h2>{header}</h2>
			{children}
		</div>
	)
}

export default Bg_block
