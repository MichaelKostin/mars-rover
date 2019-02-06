import React, { Component } from 'react';
import WebSocketSignalingChannel from '../../../rwsClient/WebSocketSignalingChannel';
import './style.css';

export default class Video extends Component {
  constructor(props) {
    super(props);
    this.video = null;
    this.connect = null;
    this.disconnect = null;
    this.client = null;
  }

  componentDidMount() {
    this.client = new WebSocketSignalingChannel(this.connect, this.disconnect, this.video);
  }

  render() {
    return (
      <section>
      <video
        ref={(videoRef) => this.video = videoRef}
        autoPlay
        playsInline
        controls
        muted
        width="100%"
        height="384"
      />
        <div className="web-rtc-controls">
          <button ref={(connectRef) => this.connect = connectRef}>Connect</button>
          <button ref={(disconnectRef) => this.disconnect = disconnectRef}>Disconnect</button>
        </div>
      </section>
    )
  }
}
