import React from 'react';
import './GroupInfo.css';

function GroupInfo() {
  return (
    <div className="cardinfo-container">
      <div className="card">
        <h3 className="card-title">Team Lead</h3>
        <div className="bar">
          <div className="github">github</div>
          <div className="linkedin">linkedin</div>
          <img
            src="https://soundspace-seeds.s3.amazonaws.com/public/Dev+Photos/headshot.png"
            alt="Matt Pierson"
          />
          <p>Matt Pierson</p>
        </div>
      </div>
      <div className="card">
        <h3 className="card-title">Back-End Lead</h3>
        <div className="bar">
          <div className="github">github</div>
          <div className="linkedin">linkedin</div>
          <img
            src="https://soundspace-seeds.s3.amazonaws.com/public/Dev+Photos/IMG_3804.jpg"
            alt="Tycan Cheng"
          />
          <p>Tycan Cheng</p>
        </div>
      </div>
      <div className="card">
        <h3 className="card-title">Front-End Lead</h3>
        <div className="bar">
          <div className="github">github</div>
          <div className="linkedin">linkedin</div>
          <img
            src="https://soundspace-seeds.s3.amazonaws.com/public/Dev+Photos/67718970277__5499A8D5-9415-4A5C-B412-192FACF4DD9D.jpg"
            alt="Vincent Minicozzi"
          />
          <p>Vincent Minicozzi</p>
        </div>
      </div>
      <div className="card">
        <h3 className="card-title">Flex</h3>
        <div className="bar">
          <div className="github">github</div>
          <div className="linkedin">linkedin</div>
          <img
            src="https://soundspace-seeds.s3.amazonaws.com/public/Dev+Photos/Discord_KIB7moK7b3+(2).png"
            alt="Jeremey Liang"
          />
          <p>Jeremey Liang</p>
        </div>
      </div>
    </div>
  );
}

export default GroupInfo;
