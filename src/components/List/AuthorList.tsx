import React, { useState } from "react";
import Link from "next/link";
import type { LawAuthorData } from "@/types/List/Author";
import Pagination from "../Pagination/Pagination";
import Author from "./Author";

interface AuthorListProps {
	data: LawAuthorData[];
}

const AuthorList = ({ data }: AuthorListProps) => {
	const [currentPage, setCurrentPage] = useState(1);
	const authorsPerPage = 6;

	// 計算作者範圍
	const indexOfLastAuthor = currentPage * authorsPerPage;
	const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
	const currentAuthors = data.slice(indexOfFirstAuthor, indexOfLastAuthor);

	// 換頁 func
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	// 計算總頁數
	const pageCount = Math.ceil(data.length / authorsPerPage);

	return (
		<>
			{currentAuthors.map((author: LawAuthorData, index) => (
				<Link
					key={author.name}
					href={`/Author/${author.id}`}
				>
					<Author idx={index} {...author} />
				</Link>
			))}

			{/* 分頁按鈕 */}
			<div className="flex justify-center py-5">
				<Pagination
					page={currentPage}
					pageSize={pageCount}
					link={""}
					onClick={(pageNumber: number) => paginate(pageNumber)}
					className={""}
				/>
			</div>
		</>
	);
};

export default AuthorList;
