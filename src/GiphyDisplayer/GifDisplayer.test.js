import React from "react"

import { configure, mount, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import GifDisplayer from "./GifDisplayer"
import LoadingIndicator from "../UI/LoadingIndicator"

configure({ adapter: new Adapter() })
let wrapper

describe("<GifDisplayer/>", () => {
  it("should render 1 LoadingIndicator if isLoading=true", () => {
    wrapper = shallow(<GifDisplayer isLoading={true} />)
    expect(wrapper.find(LoadingIndicator)).toHaveLength(1)
  })
})

describe("<GifDisplayer/>", () => {
  it("should render SHOW A MESSAGE found if foundGifs=false", () => {
    wrapper = shallow(<GifDisplayer foundGifs={false} />)
    expect(wrapper.find("h2").text()).toEqual(
      "No gifs found according to your search"
    )
  })
})

describe("<GifDisplayer/>", () => {
  it("should render ALL images in the gifArray if foundGifs=true", () => {
    const gifArrayExample = [
      { id: 0, url: "https://giphy.com/gifs/PhpAoE88BME6s" },
      { id: 1, url: "https://giphy.com/gifs/th-K8w1osY0O1Qpa" },
    ]
    wrapper = shallow(
      <GifDisplayer foundGifs={true} gifArray={gifArrayExample} />
    )
    expect(
      wrapper.find("div").children().find("div").children().find("img")
    ).toHaveLength(gifArrayExample.length)
  })
})
