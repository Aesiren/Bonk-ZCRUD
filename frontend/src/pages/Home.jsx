import { ReactTyped } from "react-typed";

function Home() {
  const text = "#:Welcome Agent.<br/>#:Your primary mission is to ensure that our inventory is kept up to date.<br/>#:This is imperative in the daily operation of the system (aka The Matrix) to keep the humans complacent.<br/>#:Use the links on the sidebar to login, signup, or view items.<br/>#:We expect perfection.";

  return (
    <div className="home">
      <h1>/root</h1>
      <p align='left'>
        <ReactTyped
          startWhenVisible
          strings={[text]}
          typeSpeed={50}
          cursorChar=">"
          showCursor={true}
        />
      </p>


    </div>
  )
}

export default Home;