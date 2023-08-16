import React, { ReactNode } from "react"
import "../../styles/devices.css"
import "./Iphone.css"

interface IphoneProps {
  children: ReactNode
}

const Iphone = ({ children }: IphoneProps) => {
  return (
    <div className="iphone">
      <div className="marvel-device iphone-x">
        <div className="notch">
          <div className="camera"></div>
          <div className="speaker"></div>
        </div>
        <div className="top-bar"></div>
        <div className="sleep"></div>
        <div className="bottom-bar"></div>
        <div className="volume"></div>
        <div className="overflow">
          <div className="shadow shadow--tr"></div>
          <div className="shadow shadow--tl"></div>
          <div className="shadow shadow--br"></div>
          <div className="shadow shadow--bl"></div>
        </div>
        <div className="inner-shadow"></div>
        <div className="screen">{children}</div>
      </div>

      {/* <div className="temp-wrapper">
        <div className="px">
          <div className="px__body">
            <div className="px__body__cut"></div>
            <div className="px__body__speaker"></div>
            <div className="px__body__sensor"></div>

            <div className="px__body__mute"></div>
            <div className="px__body__up"></div>
            <div className="px__body__down"></div>
            <div className="px__body__right"></div>
          </div>

          <div className="px__screen">
            <div className="px__screen__">
              <div
                className="px__screen__frame"
              >
                {children}
                <i className="fa fa-apple"></i>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="temp-wrapper temp-wrapper--wide">
        <div className="px px--ls">
          <div className="px__body">
            <div className="px__body__cut"></div>
            <div className="px__body__speaker"></div>
            <div className="px__body__sensor"></div>

            <div className="px__body__mute"></div>
            <div className="px__body__up"></div>
            <div className="px__body__down"></div>
            <div className="px__body__right"></div>
          </div>

          <div className="px__screen">
            <div className="px__screen__">
              <div
                className="px__screen__frame"
                // style="background-image: url('https://github.com/muhammederdem/vue-interactive-paycard/blob/master/src/assets/images/15.jpeg?raw=true')"
              >
                <i className="fa fa-apple"></i>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default Iphone
