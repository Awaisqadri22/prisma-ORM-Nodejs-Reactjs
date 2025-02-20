import { Link } from "react-router-dom";

interface BlogCardInterface {
  id: number;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardInterface) => {
  return (
    <Link to={`/blog/${id}`}>
      <div
        className="  cursor-pointer transition hover:-translate-y-1 hover:scale-100
      border-b w-screen max-w-screen-lg border-slate-200 p-4  hover:bg-slate    -100"
      >
        <div className="flex">
          <Avatar name={authorName} size="small" />
          <div className="font-extralight pl-2 text-sm  flex justify-center flex-col">
            {authorName}
          </div>
          <div className="font-extralight pl-2 text-sm  flex justify-center flex-col">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-slate-500">{publishedDate}</div>
        </div>
        <div className="text-xl font-semibold  pt-2">{title}</div>
        <div className="text-md font-thin">
          {content.slice(0, 100) + "...."}
        </div>
        <div className=" text-slate-500  text-sm font-thin pt-4">{`${Math.ceil(
          content.length / 100
        )} minute(s) read`}</div>
      </div>
    </Link>
  );
};

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size: "small" | "big";
}) {
  return (
    <div
      className={`relative ${
        size === "small" ? "w-6 h-6 " : "w-10 h-10"
      }  inline-flex items-center justify-center 
    overflow-hidden bg-green-500 rounded-full dark:bg-gray-600`}
    >
      <span
        className={` ${
          size === "small" ? " text-xs" : " text-md"
        } text-sm font-extralight  text-gray-600   dark:text-gray-300`}
      >
        {name[0].toLocaleUpperCase()}
      </span>
    </div>
  );
}
