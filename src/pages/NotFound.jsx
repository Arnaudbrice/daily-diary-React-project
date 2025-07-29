import React from 'react'
import {Link} from "react-router"
import { FaArrowAltCircleLeft } from "react-icons/fa";
const NotFound = () => {
	return (
		<div className=" relative  font-bold bg-[#FAF7F4] bg-[url('https://transparenttextures.com/patterns/dark-dotted-2.png')]  text-black">
			<p className="text-amber-800 text-xl my-8 ml-4 link link-hover  ">
        <Link to="/">
          <FaArrowAltCircleLeft size={48} /> return to Home
        </Link>
      </p>


					<h1 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center text-black   ">
						<span className="text-6xl">404</span> <br/>Page Not Found
					</h1>



		</div>
	)
}

export default NotFound