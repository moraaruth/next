import { Author, Novel } from "@prisma/client";

interface INovel extends Novel {
	id: string;
	authors: Author[];
}