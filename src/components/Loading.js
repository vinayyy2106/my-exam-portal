
const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 bg-blend-multiply">
      <video autoPlay loop muted className="w-24 h-24">
        <source src="/loading.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Loading;
