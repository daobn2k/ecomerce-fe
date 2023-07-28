const { Player } = require('video-react');

const VideoReact = (props) => {
    const { src, poster } = props;
    return <Player playsInline poster={poster} src={src} />;
};

export default VideoReact;
