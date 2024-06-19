
const Notes = ({
  createdAt,
  title,
  description,
  id,
  key,
  onDelete,
  onEdit,

}) => {
  return (
    <div className="w-full rounded-md bg-slate-200 text-black p-2">

        <h1 className="text-lg font-semibold ">{title}</h1>
        <p className="text-sm mt-1">{description}</p>
        <ul className="flex gap-2 text-sm mt-1">
          <li className="underline  cursor-pointer hover:text-blue-700 duration-200 transition-all"
          onClick={onEdit}>
            Edit
          </li>
          <li
            className="underline cursor-pointer hover:text-blue-700 duration-200 transition-all"
            onClick={onDelete}
          >
            Delete
          </li>
        </ul>

    </div>
  );
};

export default Notes;
