const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <div className="bg-transparent rounded w-auto h-auto">
        <div className="flex space-x-4">
          <p className="bg-white rounded-md text-3xl text-darkblueDarker">
            Loading
          </p>
          <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-75"></div>
          <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-150"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
