import React from 'react'
import { Link } from 'react-router-dom'


function Home() {
	return (<nav>
		<ul>
			<li><Link to='/cars'>Cars</Link></li>
		</ul>
	</nav>)
}

export default Home