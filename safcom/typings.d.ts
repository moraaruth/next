import { Author, Novel } from "@prisma/client";
import { StringifyOptions } from "querystring";

interface INovel extends Novel {
	id: string;
	image: string;
	title: string;
	authors: Author[];
}