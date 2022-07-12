import { IoMdCloseCircle } from "react-icons/io";
import { useResultContext } from "../contexts/ResultContextProvider";

const Sidebar = ({imgDetails,close}) => {
  console.log(imgDetails)
  return (
    <aside className="sidebar">
      <div className="sidebar_dismiss" onClick={() => close()}>
        <IoMdCloseCircle color="#fff" size={30} />
      </div>
      <img
        className="sidebar_header"
        src={imgDetails[0]?.download_url}
        alt={imgDetails[0].author}
      />
      <div className="sidebar_body">
        <p className="sidebar_body_text">Shot By:{imgDetails[0].author}</p>
        <a href={imgDetails[0]?.url} target="_blank">
          <button className="btn btn_light">Visit</button>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
