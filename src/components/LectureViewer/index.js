import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import "./style.css";
import FeedbackForm from "../FeedbackForm";
import { Tabs, Spin } from "antd";

const { TabPane } = Tabs;

export default function LectureViewer({ allVideoData }) {
  const id = useLocation().pathname.split("/").pop();
  const player = useRef(null);
  const [videoData, setVideoData] = useState(null);
  console.log(videoData);
  useEffect(() => {
    if (videoData === null) {
      const data = allVideoData.filter((obj) => obj.id === Number(id));
      setVideoData(data[0]);
    }
  }, [videoData]);

  function seekToTimestamp(seconds) {
    return player.current.seekTo(seconds);
  }

  if (!videoData) {
    return <Spin />;
  }

  return (
    <>
      <h1>
        {videoData.title} - {videoData.lecturer}
      </h1>
      <p>
        <strong>video id:</strong> {videoData.id}
      </p>
      <div id="display">
        <ReactPlayer ref={player} url={videoData.video_url} controls={true} />
        <div id="video-sidebar">
          <div id="video-timestamps">
            <h3>Timestamps</h3>
            {videoData.timestamps.map((value) => {
              return (
                <div>
                  <button
                    onClick={() => seekToTimestamp(value.timeSecondsValue)}
                  >
                    {`${value.timeString} - ${value.timeDesc}`}
                  </button>
                  <br />
                </div>
              );
            })}
          </div>

          <Tabs size="small" style={{ width: "500px" }} defaultActiveKey="1">
            <TabPane tab="Video Description" key="1">
              <p>{videoData.description}</p>
            </TabPane>
            <TabPane tab="Resources" key="2">
              {[
                ...videoData.github_links,
                ...videoData.slides,
                ...videoData.other_links,
              ].map((value) =>
                value.link ? (
                  <>
                    <a
                      href={value.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {value.type} - {value.desc}
                    </a>
                    <br />
                  </>
                ) : (
                  <li>{value.type} resources not available for this content</li>
                )
              )}
            </TabPane>
          </Tabs>
        </div>
      </div>
      <FeedbackForm />
    </>
  );
}
