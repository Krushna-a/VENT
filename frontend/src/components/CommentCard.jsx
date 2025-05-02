import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const CommentCard = ({ comment }) => {
  return (
    <div className="flex gap-3">
      <img
        src={comment.avatar}
        alt={comment.user}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-gray-800">{comment.user}</h4>
              <p className="text-gray-500 text-sm">{comment.time}</p>
            </div>
            <button className="text-gray-400 hover:text-red-500">
              <FontAwesomeIcon icon={faHeart} />
              <span className="ml-1 text-xs">{comment.likes}</span>
            </button>
          </div>
          <p className="mt-2 text-gray-700">{comment.text}</p>
        </div>
        <div className="mt-2 flex gap-4">
          <button className="text-gray-500 text-sm hover:text-blue-600">Reply</button>
          <button className="text-gray-500 text-sm hover:text-blue-600">Share</button>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;