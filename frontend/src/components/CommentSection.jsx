import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faUser, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import CommentCard from "./CommentCard";
import IconHeader from "./IconHeader";

const CommentSection = ({ comments: initialComments }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    
    const comment = {
      id: comments.length + 1,
      user: "CurrentUser",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      text: newComment,
      time: "Just now",
      likes: 0
    };
    
    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <IconHeader icon={faComment} color="blue" title={`Discussion (${comments.length})`} />
      
      {/* Add Comment */}
      <div className="mb-8">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <FontAwesomeIcon icon={faUser} className="text-blue-500" />
          </div>
          <div className="flex-1">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add your comment..."
              rows="3"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-2">
              <button
                onClick={handleAddComment}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;