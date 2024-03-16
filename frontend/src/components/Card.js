const Card = ({ id, title, description, onEdit, onDelete }) => {
  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex my-4 shadow-lg rounded-lg overflow-hidden bg-white">
      <div className="p-4 flex flex-col justify-between leading-normal">
        <div>
          <p className="text-sm text-red-600 flex items-center">ID: {id}</p>
          <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <button
            onClick={onEdit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default Card;
