import "./NoPoster.scss";

export const NoPoster = (props: { width: number, height: number, fontSize: number }) => {
  return (
    <div className="no-poster" style={{ width: props.width + "px", height: props.height + "px" }}>
      <span style={{ fontSize: props.fontSize + "em" }}>Without Poster</span>
    </div>
  )
}