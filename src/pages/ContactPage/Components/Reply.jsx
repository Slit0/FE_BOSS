

function Reply({ reply, onDelete }) {
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    // Check if it's today
    if (date.toDateString() === today.toDateString()) {
      return `오늘 ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
    }

    // Check if it's yesterday
    if (date.toDateString() === yesterday.toDateString()) {
      return `어제 ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
    }

    // Otherwise return the date
    return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 relative group">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center font-medium mr-2">
            {reply.userId ? reply.userId.charAt(0).toUpperCase() : "?"}
          </div>
          <div>
            <div className="font-medium text-gray-800">{reply.userId ? `User ${reply.userId}` : "익명"}</div>
            <div className="text-xs text-gray-500">
              {reply.writtenDate ? formatDate(reply.writtenDate) : "날짜 없음"}
            </div>
          </div>
        </div>

        <button
          onClick={() => onDelete(reply.replyId)}
          className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
          aria-label="댓글 삭제"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      <div className="mt-3 text-gray-700 whitespace-pre-line">{reply.replyArticle}</div>
    </div>
  )
}

export default Reply
