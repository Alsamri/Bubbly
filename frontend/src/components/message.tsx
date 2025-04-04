const Message = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="chatpic" src={"https://fakeimg.pl/40x40"} />
        </div>
      </div>
      <div className="chat-bubble bg-amber-700 text-white rounded-2xl p-2">
        Heyy testing
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-start">
        12:22
      </div>
    </div>
  );
};

export default Message;
