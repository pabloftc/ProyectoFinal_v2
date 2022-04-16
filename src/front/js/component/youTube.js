import React, { useContext } from "react";
import { Context } from "../store/appContext";
import ReactPlayer from "react-player/youtube";
import '../../styles/youtube.css'

const YouTube = () => {
  const { store, actions } = useContext(Context);
  return (
    <div className='player-wrapper'>
      <ReactPlayer
        className='react-player'
        url="https://www.youtube.com/watch?v=xV7S8BhIeBo"
        controls={true}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default YouTube;
