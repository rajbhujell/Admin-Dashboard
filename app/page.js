import "./ui/homepage.css";

const Home = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="container">
        {/* Welcome Section */}
        <div className="welcome">
          <h1>Namaste!</h1>
          <p>Welcome to my app</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 mt-4">
          <a className="button dashboard" href="/">
            Dashboard
          </a>
          <a className="button" href="/login">
            Login
          </a>
        </div>

        {/* Footer */}
        <div className="connect mt-6">
          <p>Get connected:</p>
          <a href="mailto:work.brajbhujel@gmail.com" className="name">
            Bishawa Raj Bhujel
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
