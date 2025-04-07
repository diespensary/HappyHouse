import React from 'react'
import './Bg_block.css'

function Bg_block({header, children}) {
	return (
		<div className='container bg-block'>
			<h2>{header}</h2>
			{children}
		</div>
	)
}

export default Bg_block
