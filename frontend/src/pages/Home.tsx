import { Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const { Title } = Typography

function Home() {
	return (
		<div>
			<Title>Welcome to Green Cars</Title>
			<Typography>
				Please click on the following link:
			</Typography>
			<nav>
				<ul>
					<li><Link to='/cars'>Cars</Link></li>
				</ul>
			</nav>
		</div>
	)
}

export default Home