import { ReactMediaRecorder } from "react-media-recorder";

export default function VoiceRecorder() {
    return (
        <div className="flex flex-col items-center space-y-4 mt-96">
            <ReactMediaRecorder
                audio
                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                    <div>
                        <p>{status}</p>
                        <button onClick={startRecording}>Start Recording</button>
                        <button onClick={stopRecording}>Stop Recording</button>
                        <audio src={mediaBlobUrl} controls autoPlay loop />
                    </div>
                )}
            />
        </div>
    )
};